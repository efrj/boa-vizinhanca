FROM nginx:alpine

# Install Node.js and npm so the package manager runs inside Docker
RUN apk add --no-cache nodejs npm

WORKDIR /usr/share/nginx/html

# Copy custom entrypoint script
COPY docker-entrypoint.sh /docker-entrypoint.sh
RUN chmod +x /docker-entrypoint.sh

# Copy frontend source files
COPY . /usr/share/nginx/html/

EXPOSE 80

ENTRYPOINT ["/docker-entrypoint.sh"]
