## This makefile is for building and running a docker container (swarm including)
## Last Update at 2025-11-12

IMAGE_NAME = frontend
APP_VERSION ?= v1
CONTAINER_NAME = frontend
STACK_NAME = frontend_app

setup: ## builds the docker container image if it doesn't exist and then runs the docker container
	make check
	make run
	docker update $(CONTAINER_NAME) --restart=always

build: ## builds the docker container image even if one already exists
	docker build --no-cache -t $(IMAGE_NAME):$(APP_VERSION) .

check: ## Checks if the image already exists and builds the docker container image if it doesn't exist
	@if [ "$(shell docker images -q $(IMAGE_NAME):$(APP_VERSION))" = "" ]; then \
		make build; \
	else \
		echo "Image '$(IMAGE_NAME:$(APP_VERSION))' already exists, skipping build"; \
	fi

run: ## runs the docker container
	docker run --name $(CONTAINER_NAME) -dp 3000:3000 $(IMAGE_NAME):$(APP_VERSION)

start: ## starts the docker container
	docker start $(CONTAINER_NAME)

stop: ## stops the docker container from the list
	docker stop $(CONTAINER_NAME)

rm: ## removes the docker container from the list
	docker rm $(CONTAINER_NAME)

rmi: ## removes the image from the images
	docker rmi $(IMAGE_NAME):$(APP_VERSION)

clean: ## stops and removes the docker container from the list
	make stop
	make rm

fullclean: ## stops and removes the docker container from the list and removes the image from the images
	make clean
	make rmi

reset: ## stops and removes the docker container from the list and removes the image from the images. The image is then also recreated and started
	make fullclean
	make setup

deploy: ## Deploy the application to Docker Swarm using the specified image version
	APP_VERSION=$(APP_VERSION) docker stack deploy -c docker-compose.yml $(IMAGE_NAME)

undeploy: ## Remove the Docker Swarm stack
	docker service rm $(STACK_NAME)

update: ## Update the application at Docker Swarm
	docker service update \
	--image $(IMAGE_NAME):$(APP_VERSION) \
	--update-parallelism 1 \
	--update-delay 10s \
	$(STACK_NAME)
