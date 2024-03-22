
<h1 align="center">
  <br>
  <img src="https://imgur.com/Dv30OA6.png" alt="vgs" width="200">
  <br>
  Video Games Shop
  <br>
</h1>

<h4 align="center">A simple and minimalistic web app inspirated by popular game shops such as Steam or Epic Games. It is a project made as my university assignment.</h4>

<h4 align="center">You can find frontend <a href="https://github.com/olszewskista/video-games-shop-frontend">here</a></h4>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#software-used">Software used</a> •
  <a href="#my-other-projects">My other projects</a>
</p>

![screenshot](https://imgur.com/CnXWGQg.png)

## Key Features

* Access the app only when logged in
* Buy games and add them to your library
* Choose payment method and apply discount codes
* Return already bought games
* Read and create reviews based on 1-5 star rating
* Create a ticket to get help from support
* Manage user and games data using admin tools

## How To Use

To clone and run this application, you'll need [Git](https://git-scm.com), [Node.js](https://nodejs.org/en/download/) and [Docker](https://www.docker.com/products/docker-desktop/) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/olszewskista/video-games-shop-backend.git

# Run docker container with mongodb
$ docker run --name vgs-mongo -p 27017:27017 -d mongo

# Go into the repository
$ cd video-games-shop-backend

# Install dependencies
$ npm install

# Fill database with example games
$ node games.js

# Run the app
$ npm run dev
```


> **Note**
> This is only backend. You should probably run also frontend from [here](https://github.com/olszewskista/video-games-shop-backend)


## Software used

- Javascript
- Express.js
- Mongoose
- JSON Web Token
- Bcrypt
- and a few smaller packages

## My other projects

- [video-games-shop-frontend](https://github.com/olszewskista/video-games-shop-frontend) - Frontend repository of this app
- [the-smartest-home](https://github.com/olszewskista/the-smartest-home) - A smart home management app which uses various web protocols
