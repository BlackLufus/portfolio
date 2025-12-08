## This makefile is for building and running a docker container
## Last Update at 2023-05-24

IMAGE_NAME = frontend-image
CONTAINER_NAME = frontend

setup: ## builds the docker container image if it doesn't exist and then runs the docker container
        make check
        make run

build: ## builds the docker container image even if one already exists
        docker build --no-cache -t $(IMAGE_NAME) .

check: ## Checks if the image already exists and builds the docker container image if it doesn't exist
        @if [ "$(shell docker images -q $(IMAGE_NAME))" = "" ]; then \
                make build; \
        else \
                echo "Image '$(IMAGE_NAME)' already exists, skipping build"; \
        fi

run: ## runs the docker container
        docker run --name $(CONTAINER_NAME) -dp 80:80 $(IMAGE_NAME)

start: ## starts the docker container
        docker start $(CONTAINER_NAME)

stop: ## stops the docker container from the list
        docker stop $(CONTAINER_NAME)

rm: ## removes the docker container from the list
        docker rm $(CONTAINER_NAME)

rmi: ## removes the image from the images
        docker rmi $(IMAGE_NAME)

clean: ## stops and removes the docker container from the list
        make stop
        make rm

fullclean: ## stops and removes the docker container from the list and removes the image from the images
        make clean
        make rmi

reset: ## stops and removes the docker container from the list and removes the image from the images. The image is then also recreated and started
        make fullclean
        make setup