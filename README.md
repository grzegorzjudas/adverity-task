# adverity-task

## Installation
Just install the dependencies with:
> $ npm install

## Running
Running dev server is as simple as:
> $ npm run dev

## Bulding and packaging
Build the app (creates static app files in `dist/` folder):
> $ npm run build
To maximize efficiency, for releasing, it's strongly recommended to build for production environment:
> $ NODE_ENV=production npm run build

## Docker
Application can be ran using a docker container as well (most performant). First you need to build and package it (see above), and then build the image:
> $ docker image built -t \[your_docker_image_name\] .

Once this is done, you can run it:
> $ docker container run --publish 80:80 \[your_docker_image_name\]
