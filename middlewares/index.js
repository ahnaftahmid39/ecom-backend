const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');

module.exports = (app) => {
  app.use(express.json());
  app.use(cors());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__baseDir + 'public/')));

  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  }
};
