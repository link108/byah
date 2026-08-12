# No `set shell` override, deliberately: matches the shared dev-platform
# convention (see link108/cutty-bangerz's justfile for the incident that
# motivated it) - `just`'s own default, plain POSIX `sh -cu`, is the one
# thing guaranteed present in every environment this might run in, so
# every recipe here is POSIX `sh`-compatible.

image_name := "byah-site"
container_name := "byah-site"
port := "8080"

default:
    @just --list

# --- Run ----------------------------------------------------------------------

# Install exact JavaScript dependencies.
install:
    npm install

# First-time setup inside a freshly created Dev Container.
setup: install
    @echo "Ready. Run: just dev"

# Start the development server with hot reload.
dev:
    npm run dev

# Build the static site.
build:
    npm run build

# --- Quality ------------------------------------------------------------------

lint:
    npm run lint

typecheck:
    npm run typecheck

# Canonical local validation.
alias ci := check

check: lint typecheck build

# --- Docker ---------------------------------------------------------------

docker-build:
    docker build -t {{ image_name }} .

docker-stop:
    docker stop {{ container_name }} || true

docker-start:
    docker run -d --rm --name {{ container_name }} -p {{ port }}:80 {{ image_name }}

docker-logs:
    docker logs -f {{ container_name }}
