const express = require('express');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/',
    route: require('./form.routes'),
  }
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;