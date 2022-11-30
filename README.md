# 2103 Project MyLibList

This is our project for **ICT2103 Information Management**. It includes a REST API (Client-Server Architecture) using various `GET`, `POST`, `PUT` and `DELETE` routes.  It also includes a Frontend Application using `Next.js`. The project is also Dockerized to be run in any environment.

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

## Installing the project

- You should have an `.env` file created in the `server` directory of this project. Details of `.env` file will be provided below.
- Make sure you have Docker on your machine. Use the command `docker ps` to check.
- Ensure you have Node.js on your machine.  Use the command `node -v` to check.
- Clone the github repo

```
git clone https://github.com/rawsashimi1604/MyLibList.git
cd MyLibList
```

- Start Docker Desktop / daemon
- Open 2 terminals
- Use `py startBackend.py` to start the backend on 1 terminal
- Use `py startFrontend.py` to start the frontend on 1 terminal

### Environment File Contents

Create `.env` file, put in `server` directory. Contents:

```
BACKEND_PORT=8085
FRONTEND_PORT=3000

# Change this if you want to change database used
# DATABASE=POSTGRES
DATABASE=MONGO

MONGO_PORT=27017
MONGO_USER=root
MONGO_PASSWORD=rootpassword

POSTGRES_USER=postgres
POSTGRES_PASSWORD=password123
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=defaultdb

FRONTEND_APP_URL_LOCAL=http://localhost:3000/

ACCESS_TOKEN_SECRET=ab160c0c2d797410e67f741a6c7710559a7818ff8a90e3300d723614b7dba322b5ce3e516df9e2065afd9f40439d637a09469e543e88326bc5e43af003611a10
REFRESH_TOKEN_SECRET=3b4afa89360cdd66701f1aa510ce2c5f691092eb14166a29483fc918e0cec2d2f85cf2f25144c9df87221a75d44013ee045639cf6385bf80170bb89c5ee20dfa
```

### Changing database instance between MONGO and POSTGRES
- To change the database instance that is currently being run, simply change the `DATABASE` variable in the `.env` file to `POSTGRES` or `MONGO`. After, stop the docker containers and run a `docker system prune` to ensure all containers are stopped. Then rerun the app, and the application will restart using the specified database instance.