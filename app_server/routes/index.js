var express = require('express');
var router = express.Router();

var ctrProjects = require('../controllers/projects');

router.get('/', ctrProjects.homelist);

module.exports = router;
