# Emirates FlightScanner

## Project Stack

Below are references to aspects of the stack used:

- [**Nx**](https://nx.dev) - Workspace Management for MonoRepo approach to project that has interdepencies, as well as useful tools to focus on development
- [**React**](https://reactjs.org) - A JavaScript library for building user interfaces
- [**Nest**](https://nestjs.com) - A progressive Node.js framework for building efficient, reliable and scalable server-side applications.
- [**Express**](https://expressjs.com) - Built-In Webserver which is used by NestJS
- [**Node**](https://nodejs.org) - A JavaScript runtime which underpins the Nest + Express

## Sample Data

Mock data was sourced online from [Open**Flights**.org](https://openflights.org/data.html), Data used was as follows:

- Airports
- Airlines
- Routes

## System requirements

- [**Node.js** v12.18+](https://nodejs.org/en/)
- [**yarn** v1.22+](https://classic.yarnpkg.com/en/)

## Installation

```bash
# 1. Clone the repository
git clone git@github.com:sharife3/emirates.git

# 2. Navigate into the emirates directory
cd emirates

# 3. Install Dependencies
yarn
```
## Linting
Linting can be run using the following commands:
```bash
# Run for all projects (Recommended)
npx nx run-many --target=lint --all=true

# Or

# Run linting for just the UI
npx nx run flights-ui:lint 
```

## Building
Applications can be built using the following command:
```bash
# Run build for all projects
npx nx run-many --target=build --all=true 
```

## Testing
Tests can be run using the following commands:
```bash
# Run tests for all projects
npx nx run-many --target=test --all=true

# Or

# Run tests for just the UI (with Coverage enabled) (Recommended)
npx nx run flights-ui:test --codeCoverage=true 
```
> Note: Testing was mainly focussed on the UI as per the requirements - therefore coverage lacks in the backend.
> 
> Note: Coverage can be found in the ./coverage folder for each respective project that is built with it enabled - refer to the example above for ui 


## Running the stack
The stack can be run using the following commands:
```bash
# Running each process seperatly in 3 different terminals
# Terminal 1:
npx nx serve flights-gateway
# Terminal 2:
npx nx serve flights-service
# Terminal 3:
npx nx serve flights-ui

# Or 

# Running with a single command as follows (Recommended)
npx nx run-many --target=serve --all=true --parallel=true
```
> Note: When running using the second option - it is important to run them using the --parallel=true otherwise, it will not progress forward to running all applications - as its blocked until a process has exited - which is not the desired behaviour.


## Improvements to be made

- [ ] Pagination - Currently results are capped at 100 and will return random 100 flights
- [ ] GraphQL - for flexibility of the depth of data that is returned
- [ ] Coverage on the backend code base
- [ ] UI Shared components could potentially move into a seperate library to be used with other projects
- [ ] Switch Enzyme out for testing-library - Preferred alternative
