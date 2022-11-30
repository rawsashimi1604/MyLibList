# 2103 Project MyLibList, Server

This is our server component for our project for module **ICT2103 Information Management** . It includes a REST API (Client-Server Architecture) using various `GET`, `POST`, `PUT` and `DELETE` routes. The project is also Dockerized to be run in any environment.

| StudentID | GithubHandle   | Name              |
| --------- | -------------- | ----------------- |
| 2101927   | rawsashimi1604 | Gavin Loo Wei Ren |
| 2101391   | jianweiiii     | Lim Jian Wei      |
| 2100701   | irfaan96       | Irfaan            |
| 2100614   | junweilam      | Jun Wei           |
| 2100711   | 2100711        | Lee Yong Chong    |
| 2100764   | ZafrullaKamil  | Zafrulla          |

## Requirements

- You should have Docker Desktop installed on your local machine.
- You should create a Docker volume: `postgres-data` to persist database data.
  - To create docker volume, run the command `docker volume create postgres-data`, when using `docker volume ls`, postgres-data should be listed.
- You should have Node and npm installed on your machine to run the npm scripts.
- You should run the docker container in a Linux/MacOS environment to enable hot reloading (Nodemon) in the container.
- You should have an `.env` file created in the root directory of this project. Details of `.env` file will be provided below.
- You should have Postman to simulate/run API requests to the server.

### Environment File Contents

Create `.env` file, put in root directory. Contents:

```
BACKEND_PORT=8085
FRONTEND_PORT=5000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=<choose any password>
POSTGRES_HOST=db
POSTGRES_PORT=5432
POSTGRES_DB=defaultdb

FRONTEND_APP_URL=<For deployment, not needed for local development.>

ACCESS_TOKEN_SECRET=<your access token secret>
REFRESH_TOKEN_SECRET=<your refresh token secret>
```

#### Generating access token and refresh token secrets

To generate these secrets, navigate to `secret.js` and run the file using `node secret.js`, a secret will be generated using the `generateSecret()` algorithm and you can put it into your `.env` environment variables.

## Scripts

- `npm run start` to start project using Node
- `npm run dev` to start project using Nodemon (Auto Refresh on change)
- `npm run beautify` to run Prettier on project (CI/CD code beautification tool)
- `npm run docker-compose-down` to stop running Dockerized containers built by `docker-compose.yml` and removes the stopped containers.
- `npm run docker-compose-up:dev` to create and start containers built by `docker-compose.yml`.
- `npm run docker:dev` to automate building of containers, running `docker-compose up` and `docker-compose down` as well as real time logging including `docker-compose logs`.

You should be able to start the application using `npm run docker:dev`

## Coding standards

To achieve a similar standard of coding standards throughout the codebase, run `npm run beautify` before every code commit.

Some standards:

- functions : `function camelCase() {}`
- classes/modules: `import UpperCamelCase from "../database.js"`
- constants/env vars: `POSTGRES_PORT=5000`
- database tables/fields: `SELECT * FROM "snake_case"`

Verbose function names, be descriptive with function names

- `add()` :disappointed_relieved: This is bad.
- `addUserIntoDatabase()` :heart_eyes: This is good.

## CI/CD flow

### CD (Continuous Development)

- Run `npm run docker:dev`
- Docker seeds PSQL database using `init.sql` and ~~`database scripts found in the seedDB folder`~~ (current not setup yet).
- Docker starts PSQL app
- Docker starts Node.js appp
- Application has successfully started with all predefined data

### CI (Continuous Integration)

- After adding some code
- Use `npm run beautify` to achieve similar coding formatting standards
- Add/pull to git repo using git commands
  - `git add .`
  - `git commit -m ""`
  - `git push`

## General development guide

### Setup

- Make sure you have Docker on your machine. Use the command `docker ps` to check.
- Create the postgres volume.

```
// Creating the docker volume
docker volume create postgres-data

// Check if volume was created
docker volume ls
```

- Clone the github repo

```
git clone https://github.com/rawsashimi1604/MyLibList_server.git
cd MyLibList_server
```

- Create the `.env` file and put it in the root directory.
- Run the command `npm run docker:dev` to start the docker container.
- You should see this if the container was run correctly, backend app should be functioning.

```
Server has successfully started on port: 8085
```

### Database Seeding

To seed/inject data into the database, navigate to the `seedDb` folder and run the javascript files.

### Running API Calls

The ideal way to run API calls would be to use Postman. A Postman Collection of requests will be provided here soon...

### Authentication

To enable authenication for a specific route or router, use the `authenticateToken` middleware.

```
...
// Authenticate user before they are able to get vehicle data...
router.use(authenticateToken);

// Routes
router.get("/", VehicleController.handleIndex);
...
```

### Structure of the project

The project is divided into 2 main sections:

- `src`: all source code pertaining to the REST API server.
- `db`: all databases configuration and code.

#### src

```
├── src (source code directory)
|   ├── controller (contains all business logic)
|   |   ├── authentication.js (Auth Controller)
|   |   ├── vehicle.js (Vehicle Controller)
|   |   ├── ...
|   ├── lib (contains a library of other functions used throughout the project)
|   |   ├── utils (utility functions)
|   |   ├── authentication (Auth functions)
|   |   ├── vehicle (Vehicle functions)
|   |   ├── ...
|   ├── middleware (Express middleware)
|   ├── routes (Routers used throughout the project)
|   ├── app.js (main application builder)
|   ├── server.js (Build app and server to ports)
```

- `controller` contains all business logic in the project. For example, logic needed to complete certain features (getting vehicles, deleting vehicles, etc...)
- `lib` contains all other functions needed in the project. It can be further subdivided into `utils` (which contains utility functions used throughout all modules) and `<controller based functions>` which contains functions used in the specific controller/service subdomain only.
- `middleware` contains all Express middleware used thorughout the project
- `routes` contains all the API routes used in the project. They are linked to the controller
- `app.js` is the application builder based on a Database object `(Depedency Injection)`
- `server.js` is the main entrypoint of the application. It builds an app and serves to it to ports.
  - CORS (Cross origin resoure sharing) is also enabled for the frontend. It is controlled using the `FRONTEND_PORT` (local) and `FRONTEND_APP_URL` (production) environment variables.

#### db

```
├── db (database directory)
|   ├── psql (PostgreSQL database Object)
|   |   ├── relations
|   |   |   ├── index (entrypoint to database.js)
|   |   |   ├── vehicle (Vehicle Table relation)
|   |   |   ├── ...
|   ├── config.js (config file)
|   ├── database.js (helps map database relations)
|   ├── index.js (Main entrypoint to server.js.)
```

- More info on JWT and authentication: https://www.youtube.com/watch?v=7Q17ubqLfaM
- More info on dependency injection: https://www.youtube.com/watch?v=yOC0e0NMZ-E&ab_channel=SamMeech-Ward
- The database is injected into the express app.
- Each relation is accessed through its own file and has their own functions to query the database.
- A config file helps build the database using `.env` variables set.
