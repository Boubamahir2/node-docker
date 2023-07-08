const express = require('express');
const {
  MONGO_USER,
  MONGO_PASSWORD,
  MONGO_IP,
  MONGO_PORT,
  REDIS_URL,
  SESSION_SECRET,
  REDIS_PORT,
} = require('./config/config');

const mongoose = require('mongoose');
const postRouter = require('./routes/index.js');
const userRouter = require('./routes/userRoutes');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');

// Configure redis client
let redisClient = redis.createClient({
  url: REDIS_URL,
  legacyMode: true,
});


const RedisStore = connectRedis(session);
//Configure redis client
redisClient.connect().catch(console.error);

redisClient.on('error', function (err) {
  console.log('Could not establish a connection with redis on node-docker. ' + err);
});

redisClient.on('connect', function () {
  console.log('Connected to redis successfully');
});

// Configure session middleware
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  
}))
app.set('trust proxy', 1); // enable this if you run behind a proxy (e.g. nginx)
// app.enable('trust proxy');

// Create Redis store using redisClient
const store = new RedisStore({ client: redisClient });

app.use(
  session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false, // if true only transmit cookie over https
      httpOnly: true, // if true prevent client-side JS from reading the cookie
      maxAge: 1000 * 60 * 10, // session max age in milliseconds
    },
  })
);



const port = process.env.PORT || 3000;
const mongoUrl = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_IP}:${MONGO_PORT}/?authSource=admin `;

const connectWithRetry = () => {
  mongoose
    .connect(mongoUrl, {
      useNewUrlParser: true,
    })
    .then(() => {
      console.log('Successfully Connected to db');
    })
    .catch((e) => {
      console.log(e, 'error');
      setTimeout(connectWithRetry, 5000);
    });
};

connectWithRetry();
app.use('/api/v1/posts', postRouter);
app.use('/api/v1/users', userRouter);

app.get('/api/v1', (req, res) => {
  res.send('<h2>hello world!!!lkhjkhj</h2>');
  console.log("yeah its working")
});

app.listen(port, () => {
  console.log('app is listening on port ' + port);
});
