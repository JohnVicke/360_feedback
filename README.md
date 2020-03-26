# 360_feedback
Feedback system for employees at Paradox Arctic developed for the course Design-Build-Test at Umeå University.

## Group members
FirstName  | LastName | Role
------------- | ------------- | -------------
Viktor  | Malmedal | Techlead
Pontus  | Sundgren | Head of Design
Vidar | Häggström | Project Manager
Staffan | Westerlund | Document Manager
Isak | Larsson | Developer

## Setup
```bash
# Clone repository
git clone git@github.com:JohnVicke/360_feedback.git

# install dependencies for server
npm install

# install dependencies for client
npm run client-install
```

### How to run
#### Server
How to start the backend (server). This command will run the server with nodemon for live updating: 
```bash
npm run server
```
Make sure that it work by visiting localhost:8000/api/test

#### Client
How to start the frontend (client). This command will start the reactapp:
```bash
npm run client
```

#### Concurrently
How to start the client and server concurrently:
```bash
npm run dev
```
This command will start the server with nodemon and reactapp concurrently in the same terminal (shell).

### Install packages:
If you wish to save the package as a dev-dependencie use --save-dev at the end of the npm command.
#### Server
To install server packages. Simply run 
```bash
npm i 'packagename'
``` 
in the root directory

#### Client
To install client packages. Run:
```bash
npm i 'packagename'
```
in the client directory.

### Notes
If you want to change dev-port for the backend, it is located in ./config.env. If you change the port for the backend you also need to change the proxy for the reactapp in ./client/package_json "proxy": 

# License
Unlicensed
