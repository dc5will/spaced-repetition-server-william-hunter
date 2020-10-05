<<<<<<< HEAD
'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV, CLIENT_ORIGIN } = require('./config');
const errorHandler = require('./middleware/error-handler');
const authRouter = require('./auth/auth-router');
const languageRouter = require('./language/language-router');
const userRouter = require('./user/user-router');

const app = express();

app.use(
  morgan(NODE_ENV === 'production' ? 'tiny' : 'common', {
    skip: () => NODE_ENV === 'test'
  })
);
app.use(helmet());
app.use(
  cors({
    origin: CLIENT_ORIGIN
  })
);

app.use('/api/auth', authRouter);
app.use('/api/language', languageRouter);
app.use('/api/user', userRouter);

app.use(errorHandler);

=======
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require("./config");
const errorHandler = require("./middleware/error-handler");
const authRouter = require("./auth/auth-router");
const languageRouter = require("./language/language-router");
const userRouter = require("./user/user-router");

const app = express();

app.use(
  morgan(NODE_ENV === "production" ? "tiny" : "common", {
    skip: () => NODE_ENV === "test"
  })
);
app.use(helmet());
app.use(
  cors()
);

app.use("/api/auth", authRouter);
app.use("/api/language", languageRouter);
app.use("/api/user", userRouter);

app.use(errorHandler);

>>>>>>> 70ec6f706a4aa40032d020002a59a2475d3f1bda
module.exports = app;
