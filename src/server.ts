require('dotenv').config();
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';

import logging from './configs/logging';
import authRoutes from './routes/authRoutes/AuthRoutes';
import userRoutes from './routes/userRoutes/UserRoutes';
import requirementRoutes from './routes/requirementRoutes/RequirementRoutes';

import authMiddleware from './middlewares/auth';

const NAMESPACE = 'Server';
const app = express();

// init body parser
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

/** Log the request */
app.use((req, res, next) => {
  /** Log the req */
  logging.info(
    NAMESPACE,
    `METHOD: [${req.method}] - URL: [${req.url}] - IP: [${req.socket.remoteAddress}]`
  );

  res.on('finish', () => {
    /** Log the res */
    logging.info(
      NAMESPACE,
      `METHOD: [${req.method}] - URL: [${req.url}] - STATUS: [${res.statusCode}] - IP: [${req.socket.remoteAddress}]`
    );
  });

  next();
});

app.use('/api', authRoutes);
app.use('/api', authMiddleware, userRoutes);
app.use('/api', requirementRoutes);

app.listen(3333);
