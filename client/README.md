# 2103 Project MyLibList, Client

This is our client component for our project for module **ICT2103 Information Management** . It includes a Frontend Application using various `Next.js` routes. The project is also Dockerized to be run in any environment.

| StudentID | GithubHandle   | Name              |
| --------- | -------------- | ----------------- |
| 2101927   | rawsashimi1604 | Gavin Loo Wei Ren |
| 2101391   | jianweiiii     | Lim Jian Wei      |
| 2100701   | irfaan96       | Irfaan            |
| 2100614   | junweilam      | Jun Wei           |
| 2100711   | 2100711        | Lee Yong Chong    |
| 2100764   | ZafrullaKamil  | Zafrulla          |

## Technologies used

- Docker
- Node.js
- Next.js
- TailwindCSS
- Prettier
- REST API

## Requirements

- You should have Docker Desktop installed on your local machine.
- You should have Node and npm installed on your machine to run the npm scripts.

## Setup

- Make sure you have Docker on your machine. Use the command `docker ps` to check.
- Clone the github repo

```
git clone https://github.com/rawsashimi1604/MyLibList_Client.git
cd MyLibList_Client
```

- Build the docker container

```
docker build -t docker_nextjs:developement .
```

- Run the docker container

```
docker run --publish 3000:3000 docker_nextjs:developement
```

- You should see this if the container was run correctly, frontend app should be functioning.
