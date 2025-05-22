## **Frontend setup**

### **navigate to `frontend/` directory**

```
$ cd frontend
$ npm install
$ ng serve
(to topen automatically use ng serve -o)
```
You can now view the app on http://localhost:4200/

### setup server and databse

 - in XAMPP start the MySQL and Apache server
 - navigate to `127.0.0.1/phpmyadmin/`
 - create a database with the name recept-pwa
 (you can use a different name but be sure to update the config in `backend/config/db.config.js`)
 - navigate to the SQL tab and paste the SQL code found in the `backend/config/db.sql`

### **navigate to `backend/` directory**

```
$ cd ..
$ cd backend
$ npm install
$ npm start
```

#### Now the application should be ready to roll


## ReceptPwa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.2.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
