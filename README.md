# Stock Discussion Platform Backend

The Stock Discussion Platform Backend is a RESTful API designed to facilitate a stock market discussion platform. It supports user authentication, post creation and management, commenting, and liking functionality. Users can create, view, update, and delete posts related to stock trends, while also interacting through comments and likes. The API includes features for filtering and sorting posts, as well as pagination for efficient data handling.


## Acknowledgements

- Express.js: For providing a robust framework for building the API.
- Mongoose: For simplifying MongoDB interactions and schema modeling.
- dotenv: For managing environment variables securely.
- jsonwebtoken: For implementing JWT-based authentication.
- Nodemon: For automatic server reloading during development.
- Jest: For providing a framework to write and run tests.
- bcrypt: For enabling secure password hashing and encryption.

## Features

- User Authentication and Authorization: Secure user registration, login, and token-based authentication using JWT.
- Post Management: Create, update, delete, and retrieve posts related to stock discussions.
- Commenting System: Add and delete comments on posts to facilitate discussion.
- Like System: Like and unlike posts to show engagement.
- Pagination: Retrieve posts with pagination to handle large datasets efficiently.
- Filtering and Sorting: Search, filter, and sort posts based on various criteria such as stock symbol, tags, and date.
- Real-Time Updates (Optional): WebSocket support for real-time updates on new comments or likes.
- Error Handling: Comprehensive error handling for different scenarios and invalid requests.
- Data Validation: Input validation and sanitization to ensure data integrity and security.


## 📚 Documentation

### Environment Setup

#### Dependencies
- **bcrypt:** For hashing passwords.
- **dotenv:** For environment variable management.
- **express:** Web framework for Node.js.
- **jsonwebtoken:** For generating and verifying JWT tokens.
- **mongoose:** MongoDB object modeling tool.
- **nodemon:** For auto-reloading during development.

#### Development Dependencies
- **jest:** For testing.
- **supertest:** For HTTP assertions in tests.

### Models

#### User Model (models/user.model.js)
- `username:` String, required, minimum length 2.
- `email:` String, required, unique.
- `password:` String, required.
- `bio:` String, default empty.
- `profilePicture:` String, default empty.

#### Post Model (models/post.model.js)
- `stockSymbol:` String, required.
- `title:` String, required.
- `description:` String, required.
- `tags:` Array of strings.
- `createdAt:` Date, default to current date.
- `user:` ObjectId (references User), required.
- `likesCount:` Number, default 0.

#### Comment Model (models/comment.model.js)
- `post:` ObjectId (references Post), required.
- `user:` ObjectId (references User), required.
- `comment:` String, required.
- `createdAt:` Date, default to current date.

#### Like Model (models/like.model.js)
- `post:` ObjectId (references Post), required.
- `user:` ObjectId (references User), required.

### Middleware

#### Authentication (middleware/AuthMiddleware.js)
- Verifies JWT tokens and attaches the user object to the request.

#### AuthPosts (middleware/AuthMiddleware.js)
- Verifies if the user making the request is the creator of the post.

#### AuthComment (middleware/AuthMiddleware.js)
- Verifies if the user making the request is the creator of the comment.

### Routes

#### User Routes (routes/user.routes.js)
- **POST** `/api/auth/register`: Register a new user.
- **POST** `/api/auth/login`: Login a user and get a token.
- **GET** `/api/user/profile/:userId`: Get user profile data.
- **PUT** `/api/user/profile`: Update user profile data (authenticated).

#### Post Routes (routes/post.routes.js)
- **POST** `/api/posts`: Create a new post (authenticated).
- **GET** `/api/posts`: Get all posts (authenticated).
- **GET** `/api/posts/:postId`: Get a single post by ID (authenticated).
- **DELETE** `/api/posts/:postId`: Delete a post by ID (authenticated, authorized).

#### Comment Routes (routes/comment.routes.js)
- **POST** `/api/posts/:postId/comments`: Add a comment to a post (authenticated).
- **DELETE** `/api/posts/:postId/comments/:commentId`: Delete a comment by ID (authenticated, authorized).

#### Like Routes (routes/likePost.route.js)
- **POST** `/api/posts/:postId/like`: Like a post (authenticated).
- **DELETE** `/api/posts/:postId/like`: Unlike a post (authenticated).

### Utils(.env)
- 🔑 **PORT**      : `3000`
- 🔑 **MONGO_URL** : `mongodb+srv://sharmaharshit295:harshit225044@cluster0.rs4eabk.mongodb.net/StockDiscussion?retryWrites=true&w=majority&appName=Cluster0`
- 🔑 **TOKEN_KEY** : `masai`

### Server Setup (index.js)

Initialize the server with:

  ``` javascript
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 3000;
const connection = require("./config/db");
const UserRoutes = require("./routes/user.routes");
const PostRoutes = require("./routes/post.routes");
const CommentRoutes = require("./routes/comment.routes");
const LikePostRoutes = require("./routes/likePost.route");

const server = express();

// Middleware
server.use(express.json());
server.use("/user", UserRoutes);
server.use("/post", PostRoutes);
server.use("/comment", CommentRoutes);
server.use("/like", LikePostRoutes);

// Home route
server.get('/', (req, res) => {
    res.send('Welcome to the home page');
});

// Server listening
server.listen(PORT, async () => {
    await connection;
    console.log(`Server is running at port ${PORT} and DB is also connected`);
});





```
- Configuration
- Environment Variables
The project uses environment variables stored in a .env file for sensitive information, such as the JWT secret key. Ensure to create a .env file in the root directory with the following variables:

makefile
Copy code
TOKEN_KEY=your_jwt_secret_key
Testing
The project uses Jest for testing. To run tests, use:

bash
Copy code
npm test

## Screenshots

### Home Page

![Home Page](./public/index.js.png)

### postman

![Create Post](./public//postman.png)

### Create Post

![Create Post](./public//createPosts.png)

### View Post

![View Post](./public/getAllPosts.png)


## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- Bcrypt
- Jest
- Supertest

