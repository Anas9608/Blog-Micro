require('dotenv').config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const path = require("path");
const apiRoutes = require("./routes/api.js");
const postRoutes = require("./routes/post-routes.js");
const authRoutes = require("./routes/auth-routes.js");
const mongoose = require('mongoose');
const { MONGO_IP, MONGO_PORT, MONGO_USER, MONGO_PASSWORD, REDIS_SECRET, REDIS_URL, REDIS_PORT } = require('./config/config.js');
const session = require("express-session");
const redis = require("redis");
const { RedisStore } = require("connect-redis");
let redisStore;
const app = express();
const PORT = process.env.PORT || 3000;


// Initialize client. 
let redisClient = redis.createClient({ url: `redis://${REDIS_URL}:${REDIS_PORT}` });
// Initialize store.
redisStore = new RedisStore({
  client: redisClient
});

redisClient.connect().then(() => {
  console.log("Redis client connected");
}).catch(console.error);

app.use(
  session({
    store: redisStore,
    secret: REDIS_SECRET,
    resave: false, // required: force lightweight session keep alive (touch)
    saveUninitialized: false,
    cookie: {
      maxAge: 600000,
      secure: false, // Set to true if using HTTPS
      httpOnly: true, // Set to true to prevent client-side JavaScript from accessing the cookie
    }
  }),
);


//Connect to MongoDB
const mongoURL = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}?authSource=admin`;
console.log(mongoURL);
const retryDbConnection = function () {
  mongoose.connect(mongoURL)
    .then(() => console.log('Connected to mongo!'))
    .catch((err) => {
      console.error('Error connecting to mongo', err);
      setTimeout(() => {
        console.log('Retrying to connect to mongo');
        retryDbConnection();
      }, 5000)
    });
}

retryDbConnection();

app.set("trust proxy"); // trust the proxy 
app.use(cors({
  origin: "http://localhost:3000", // Your frontend's origin
  credentials: true               // VERY IMPORTANT for cookies to work
}));

app.use(express.static(path.join(__dirname, './public')));
app.use(express.json());

//api routes
app.use("/api/v1/post", postRoutes);
app.use("/api/v1/user", authRoutes);

app.get("/api", (req, res) => {
  console.log("Hello there!");
  res.send('Hello slash route');
});

app.listen(PORT, () => {
  console.log(`Server is runnning at port ${PORT}`);
});