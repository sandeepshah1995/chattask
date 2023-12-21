# Real-Time Chat Website with MERN Stack, Socket.io, Redux Toolkit, and Tailwind CSS

This is a real-time chat website that allows users to connect with each other and chat in real-time. It was built using the MERN stack (MongoDB, Express.js, React.js, and Node.js), Socket.io, Redux Toolkit, and Tailwind CSS. 


## Technologies Used

- MERN stack (MongoDB, Express.js, React.js, and Node.js)
- Socket.io
- Redux Toolkit
- Tailwind CSS

## Features

- Real-time chat: users can send and receive messages in real-time
- User authentication: users can sign up, log in, and log out using JWT 
- Group creation: users can create chat rooms and invite others to join
- Notifications: users can receive notifications on new messages
- Profile page where users can update their avatar and display name.
- Users can create a room to chat with others.
- Search functionality.
- Responsive design: the website is optimized for different screen sizes and devices

## Configuration and Setup
Before running the project make

<b>.env</b> file in frontend folder 
```
REACT_APP_SERVER_URL = 'http://localhost:80' 
```
<b>.env</b> file in backend folder
```
SECRET = 'variationsofloremipsumavailable'
URL = 'mongodb://mongodb:27017/chat'
BASE_URL='http://localhost:3000' 
```
In order to run this project with docker just run the following command

```
$ docker-compose up
```

and then type http://localhost:3000 in browser to run it