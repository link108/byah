set shell := ["zsh", "-cu"]

image_name := "byah-site"
container_name := "byah-site"
port := "8080"

default:
  just --list

build:
  npm run build

lint:
  npm run lint

typecheck:
  npm run typecheck

docker-build:
  docker build -t {{image_name}} .

docker-stop:
  docker stop {{container_name}} || true

docker-start:
  docker run -d --rm --name {{container_name}} -p {{port}}:80 {{image_name}}

docker-logs:
  docker logs -f {{container_name}}
