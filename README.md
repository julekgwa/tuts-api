# Quick Tuts API

This is a simple and practical example of how to deploy a Node.js API to various environments like production, staging, QA, and development using Docker Compose and NGINX.

## Running the Application

1. Clone the repository:
    ```sh
    git clone https://github.com/julekgwa/tuts-api.git
    cd tuts-api
    ```

2. Create a `.env` file in the root directory and add the necessary environment variables:
    ```env
    PORT=3000
    DB_USER=your_mongo_user
    DB_PASS=your_mongo_password
    DATABASE=your_database_name
    DB_HOST=your_db_host
    NODE_ENV=development
    DOMAIN=your_domain
    APP_PORT=3000 # docker container port
    ```

3. Build and run the application using Docker Compose:
    ```sh
    docker-compose --env-file .env.dev up -d --build --force-recreate
    ```

    Deploy to other environments:
    ```sh
    docker-compose --env-file .env.staging up -d --build --force-recreate
    docker-compose --env-file .env.qa up -d --build --force-recreate
    docker-compose --env-file .env.production up -d --build --force-recreate
    ```

4. Access the API documentation at `http://${NODE_ENV}.localhost/api/v1/api-docs`. # Replace `${NODE_ENV}` with the value of the `NODE_ENV` environment variable.

## API Documentation

The API documentation is available in the [app/swagger/swagger.yml](app/swagger/swagger.yml) file. It uses OpenAPI 3.0.0 specification.

## Nginx Configuration template and explanation

The NGINX configuration template is available in the [nginx/nginx.template.conf](nginx/nginx.template.conf) file. It is a simple configuration that listens on port 80 and proxies requests to the Node.js application.

```nginx
worker_processes auto;

events {
    worker_connections 1024;
}

http {
    upstream app_cluster {
        server ${NODE_ENV}_app:${APP_PORT};
    }

    server {
        listen 80;
         server_name ${NODE_ENV}.${DOMAIN};

        location / {
            proxy_pass http://app_cluster;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }
    }
}
```

- **worker_processes**: The number of worker processes that NGINX should use.
- **events**: The events block defines how NGINX should handle connections.
- **http**: The http block defines the configuration for the HTTP server.
- **upstream**: The upstream block defines the backend servers that NGINX should proxy requests to.
- **server**: The server block defines the configuration for the server.
- **listen**: The port that NGINX should listen on.
- **server_name**: The domain name that NGINX should respond to. It uses the `DOMAIN` and `NODE_ENV` environment variables. example `development.localhost`.
  Note: if you're running this locally, you need to add the domain to your hosts file. For example, `127.0.0.1 development.localhost`. then you can access the application at `http://development.localhost`.
- **location**: The location block defines how NGINX should handle requests to a specific URL.
- **proxy_pass**: The URL that NGINX should proxy requests to.
- **proxy_set_header**: Sets the headers that NGINX should pass to the backend server.

## Update hosts file (Only if you're running this locally)

Add the following entries to your hosts file:

```sh
sudo nano /etc/hosts
```

Add the following entries:

```sh
127.0.0.1 development.localhost
127.0.0.1 staging.localhost
127.0.0.1 qa.localhost
127.0.0.1 production.localhost
```

## Project Components

- **Express**: Web framework for Node.js.
- **Swagger**: API documentation and validation.
- **Docker**: Containerization.
- **NGINX**: Reverse proxy server.

## License

This project is licensed under the MIT License.