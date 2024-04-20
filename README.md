# Course Platform

Project uses `lerna` which allows parallel running/linting/building etc. within the packages(frontend, backend).

Tech.stack: Nest, Next, PrismaORM.

## Steps for development

Clone repo or Pull repo changes. Create new branch and make changes. Create pull-request: after you fix issue or make new feature.

#### `yarn install`

Installs necessary dependencies, after clonning

#### `yarn start`

Frontend runs on [http://localhost:3000](http://localhost:3000)
Backend runs on [http://localhost:3001](http://localhost:3001)

You may also see any lint errors in the console.

#### `yarn lint`

Makes linting over backend and frontend

#### `yarn build`

Builds the app for production to the `build`, `dist` folders.
Need for deploying

### To run apps seperately:

`yarn start:forntend` & `yarn start:frontend`

or go to package directory and make `yarn start` or `yarn dev`
