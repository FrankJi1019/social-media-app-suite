# IncognitoNet

## Introduction

Welcome to IncognitoNet, a social media platform that provides a safe space for users to express their thoughts and feelings without fear of judgment or scrutiny from real-life acquaintances. This platform is designed to foster authentic communication, facilitate meaningful connections, and create a community where users can feel free to be themselves.

One of the unique features of IncognitoNet is the random nickname assigned to each user when they share a post. This feature ensures that users can share their posts anonymously and without the fear of being identified by their friends or families in real life. By giving users the ability to post without revealing their identities, IncognitoNet provides a safe and secure platform for users to share their thoughts and feelings, and create meaningful connections with others.

## Environment Setup

* Please make sure you have [node](https://nodejs.org/en) installed on your device.
* You also need to have a relational database, either on your local machine or on the cloud.
* Authentication of this project is based on AWS Cognito, therefore you will also need to create a Cognito User Pool

### Moment Share Service

* Open a terminal and direct into `moment-share-service`
* Run `npm i` or `yarn`
* Change the name of file `.env.example` to `.env`, and add the configuration of your Cognito User Pool and database
* Run `npm run migration:generate` or `yarn run migration:generate`
* Run `npm run migration:run` or `yarn run migration:run`
* Once finished, run `npm run start:dev` or `yarn run start:dev` to start the service
* Useful links:
  * GraphQL Playground: [http://localhost:8000/graphql](http://localhost:8000/graphql)
  * Swagger API Doc: [http://localhost:8000/api](http://localhost:8000/api)


### Social Media App

* Open a terminal and direct into `social-media-app`
* Run `npm i` or `yarn`
* Change the name of file `.env.example` to `.env`, and add the configuration of your Cognito User Pool. You can ignore `REACT_APP_PRISMIC_REPO_NAME` as it is not used
* Once finished, run `npm run start` or `yarn run start` to start the service. The application is on [http://localhost:3000](http://localhost:3000)
* Alternatively, run `npm run storybook` or `yarn run storybook` to start the story book. The storybook is on [http://localhost:6006](http://localhost:6006)


## Tech Stacks

IncognitoNet is a social media platform that uses cutting-edge technologies to provide users with a fast, reliable, and secure experience. The app is built using **React** and **TypeScript** on the front end, **Nest** and **TypeScript** on the back end, **GraphQL** for seamless communication between the client and server, **AWS S3** for image storage, **AWS Cognito** for user authentication, and **TypeORM** for (PostgreSQL) database integration.