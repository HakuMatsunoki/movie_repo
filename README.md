# Movies Repo node server

This is a backend part of the "Movies Repo" app.
You can register user, create, edit, delete, and view your own movies notes and save data on the server.
Also it is possible to upload movies list in txt file.

### Preparations

1. Please, rename `config.env.example` file to `config.env`.
2. Please, create account on the [logz.io](https://logz.io/) in case you want to save logs in the cloud.
3. Change values of your environment variables:

- `LOGZIO_HOST` _logzio logger host_
- `LOGZIO_TOKEN` _logzio logger secret token_
- `JWT_SECRET` _jwt auth secret phrase_
- `JWT_EXPIRES_IN` _jwt lifetime (ex. 20d)_

4. Please, move to the project directory and run next commands:

- `npm i` _to install all node modules_
- `npx sequelize-cli db:migrate` _to create sqlite DB_

### Start

Please, run next command to start the server:

- `npm start`

Your app is up and running!
Please, try to configure and connect frontend part of the app or use the Postman tool to test the API.
Endpoints documentation available [here](https://documenter.getpostman.com/view/356840/TzkyLeVK#0839c3b0-b2e9-45d2-8868-7685c29995fc)..
