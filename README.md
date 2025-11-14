# Portfolio

This website was developed to showcase my projects, skills, and experience in the field of software development. It allows interested parties to learn about the technologies I work with, how I implement projects, and what I focus on in the process. This project itself was developed using `React`, `Next.js`, and `TypeScript`. These technologies enable faster and clearer optimization of the site for all end devices.

## 🚀 Launch Guide

### Getting Started

**Install dependencies**
Install all required packages for the project to run.
```bash
npm install
```

**Start developer mode**
Launches the app with hot-reload for active development.
```bash
npm run dev
```
Next.js started in developer mode.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

**Create production mode**
Builds an optimized production version of the application.
```bash
npm build
```

**Start production mode**
Runs the already built production bundle.
```bash
npm start
```
It then runs as an optimized build.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🐳 Launch over Docker

Use Docker to `build`, `run`, and `manage` your application in isolated, reproducible environments. This section provides simple `Makefile` commands and `Compose/Swarm` options to streamline your entire container workflow.

### Makefile

In the Makefile you can define the `IMAGE_NAME`, `CONTAINER_NAME`, and `STACK_NAME` for your project. The `APP_VERSION` can be specified directly via the command line when running the Makefile commands.

### Single Container

**Build and Run**
Automatically builds the image and starts the container.
```bash
make
# or
make setup
```

**Build Docker Image**
Creates a versioned Docker image using the specified APP_VERSION tag.
```bash
make build APP_VERSION=v1
```

**Launch Docker Container**
Starts the container using the previously built image.
```bash
make run
```

**Stop Container**
Gracefully stops the running container.
```bash
make stop
```

**Remove Container**
Deletes the stopped container from the system.
```bash
make rm
```

**Remove Image**
Removes the versioned image from your local Docker registry.
```bash
make rmi APP_VERSION=v1
```

**Stop and Remove a Docker Container**
Stops and removes the docker container from the list
```bash
make clean
```

**Stop and Removes a Docker Container/Image**
Stops and removes the docker container from the list and removes the image from the images
```bash
make fullclean
```

**Rebuild and run a Docker Image/Container**
Stops and removes the docker container from the list and removes the image from the images. The image is then also recreated and started
```bash
make reset
```

### Docker Compose

**Build services**
Builds all defined Docker images for the Compose stack.
```bash
docker compose build
```

**Start services**
Runs the stack in detached mode.
```bash
docker compose up -d
```

**Stop / remove services**
Stops and removes the running Compose stack.
```bash
docker compose down
```

### Docker Swarm

**Deploy Stack**
Deploys the service stack to the Swarm using the specified APP_VERSION tag.
```bash
make deploy APP_VERSION=v1
```

**Undeploy Stack**
Removes the deployed Swarm services.
```bash
make undeploy
```

**Update Service Version**
Rolls out an update to a new APP_VERSION image.
```bash
make update APP_VERSION=v2
```


## 📦 Change storage location

Use a JSON configuration file. This is the preferred option, since it keeps all configurations in a single place. 
By default this directory is:

- `/var/lib/docker` on Linux.
- `C:\ProgramData\docker` on Windows.

```bash
sudo systemctl stop docker
```

You need to create a JSON file `/etc/docker/daemon.json` with the content pointing to the new storage location:

```bash
{
    "data-root": "/mnt/newlocation/docker"
}
```

Now you can move or copy `/var/lib/docker` to `/mnt/newlocation`.
You can read more about daemon.json in [Docker docs](https://docs.docker.com/engine/daemon/#docker-daemon-directory).

Then, **restart** Docker or **reboot** the system:

```bash
sudo systemctl restart docker
or
sudo shutdown -r now
```