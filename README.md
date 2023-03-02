# Interview Scheduler

Interview Scheduler app is a single-page app that uses Redux, web socket, and various custom hooks to manage state and database.

This app allows users to select the day they want to book their interview.
They can then enter their name and select the interviewer.
Once the interview is booked, the number of spots displayed changes.
Also, with the use of web socket, any other user using this app will see the appointments updated in real-time without having to refresh the page.

This website was built using ReactJS, Axios, Redux, and Web Socket.
The database was cloned from https://github.com/lighthouse-labs/scheduler-api.

This app was thoroughly tested with Storybook, Jest, and Cypress with a coverage of >97%

Visit the website here: http://bit.ly/3KPvoiO
Deployment platforms: Railway, Netlify, CircleCI

## Table of Content

- [Description](https://github.com/esther-sh-choi/interview-scheduler#interview-scheduler)
- [Screenshots](https://github.com/esther-sh-choi/interview-scheduler#screenshots)
  - [Websocket: See Changes Real-Time](https://github.com/esther-sh-choi/interview-scheduler#websocket-see-changes-real-time)
  - [Form Submition, Edit, and Delete](https://github.com/esther-sh-choi/interview-scheduler#form-submition-edit-and-delete)
  - [Views](https://github.com/esther-sh-choi/interview-scheduler#views)
- [Getting Started](https://github.com/esther-sh-choi/interview-scheduler#getting-started)
- [Testing](https://github.com/esther-sh-choi/interview-scheduler#testing)
- [Dependencies](https://github.com/esther-sh-choi/interview-scheduler#dependencies)

## Screenshots

#### Websocket: See Changes Real-Time

![websocket](https://github.com/esther-sh-choi/interview-scheduler/blob/master/docs/scheduler1.gif)

#### Form Submition, Edit, and Delete

![form handling](https://github.com/esther-sh-choi/interview-scheduler/blob/master/docs/scheduler2.gif)

#### Views

![form](https://github.com/esther-sh-choi/interview-scheduler/blob/master/docs/form-screen.png)
![show appointment](https://github.com/esther-sh-choi/interview-scheduler/blob/master/docs/show-screen.png)
![confirm](https://github.com/esther-sh-choi/interview-scheduler/blob/master/docs/confirm-screen.png)

## Getting Started

1. Clone this repository onto your local device.
2. Install dependencies using the `npm install` command.
3. Clone https://github.com/lighthouse-labs/scheduler-api and follow the instructions in the README.md.
4. When the psql is ready, run `npm start` in the scheduler-api directory.
5. Start the webpack development server using the `npm start` in the interview-scheduler directory. The app will be served at <http://localhost:8000/>.

_Or to simply view the website by visiting the website here: http://bit.ly/3KPvoiO_

## Testing

1. Jest tesing command: npm run test
2. Cypress testing command: npm run cypress (warning: You must have Cypress v.9 installed on your local machine)

## Dependencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
