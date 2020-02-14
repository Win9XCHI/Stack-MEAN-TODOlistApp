var express = require('express');
var router = express.Router();

var ctrProject = require('../controllers/projects');

router.post('/project', ctrProject.ProjectCreate);
//router.put('/task', ctrProject.TaskCreate);
router.put('/task/:id', ctrProject.TaskCreate);

router.put('/task_status/:pid/:tid', ctrProject.TaskChecked);
router.put('/project_update/:id', ctrProject.UpdateProject);
router.put('/task_update/:pid/:tid', ctrProject.UpdateTask);
//router.delete('/project_d/:id', ctrProject.UpdateProject);
router.put('/project_d/:id', ctrProject.UpdateProject);
router.delete('/task_d/:pid/:tid', ctrProject.DeleteTask);
router.get('/', ctrProject.OutputProjectAndTask);

module.exports = router;
