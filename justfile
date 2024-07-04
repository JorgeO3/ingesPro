# Shell configuration
set shell := ["fish", "-c"]

# Enable .env file
set dotenv-load

# Root directory
root := justfile_directory()

# Directories
deployments_dir := root / "deployments"
data_dir := deployments_dir / "data"

# Files
compose_file := deployments_dir / "docker-compose.yml"

# Postgres service configuration
postgres_port := "5432"
postgres_user := "jorge123"
postgres_host := "localhost"
postgres_password := "jorge123"
postgres_db_name := "auth_ingespro"

# Adminer service configuration
adminer_port := "8080"

# Common environment variables
env_vars := "POSTGRES_USER=" + postgres_user + " " + \
            "POSTGRES_PORT=" + postgres_port + " " + \
            "POSTGRES_PASSWORD=" + postgres_password + " " + \
            "POSTGRES_DB=" + postgres_db_name + " " + \
            "ADMINER_PORT=" + adminer_port

postgres_uri := "postgresql://" + postgres_user + ":" + \
                postgres_password + "@" + postgres_host + ":" + \
                postgres_port + "/" + postgres_db_name

# Commands
compose := "docker-compose -f " + compose_file

# Tasks
up:
  {{ env_vars }} {{ compose }} up -d

down:
  {{ env_vars }} {{ compose }} down

build:
  {{ env_vars }} {{ compose }} build --pull --no-cache

rebuild: down
  sudo rm {{ data_dir }} -rf
  just build
  just up

migrate:
  DATABASE_URL={{ postgres_uri }} \
  yarn prisma migrate dev

dev:
  DATABASE_URL={{ postgres_uri }} \
  AUTH_SECRET=$AUTH_SECRET \
  AUTH0_CLIENT_ID=$AUTH0_CLIENT_ID \
  AUTH0_CLIENT_SECRET=$AUTH0_CLIENT_SECRET \
  AUTH0_ISSUER=$AUTH0_ISSUER \
  yarn dev