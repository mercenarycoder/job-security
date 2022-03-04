require('dotenv').config();
require('express-async-errors');
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');
const connectDB = require('./db/connect');
const express = require('express');
const authentication = require('./middleware/authentication');
const app = express();

// extra security packages
const helmet = require('helmet');
const cors=require('cors'); //cors:- cross origin resource sharing
const xss=require('xss-clean');
const rateLimit=require('express-rate-limit');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy',1);
app.use(rateLimit({ 
  windowMs:15*60*1000, // 15 minutes
  max:100 // Each Ip address can make only 100 requests in 15 mins
}));
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());
// extra packages

app.get('/',(req,res)=>{
  res.send('Yeah deployment successfull');
})
// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authentication, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
