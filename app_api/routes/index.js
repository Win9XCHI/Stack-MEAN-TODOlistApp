//Router file for controllers in app_api folder
var express = require('express');
var router = express.Router();

var ctrProject = require('../controllers/projects');

/* Add new project 
 * METHOD: post, URL: api/project
 * INPUT: Name (string in body request)
 * OUTPUT: New object "Project" (as mongoose model)
 */
router.post('/project', ctrProject.ProjectCreate);

/* Add new task 
 * METHOD: put, URL: api/task/:id
 * INPUT: Name (string in body request), id project (in URL)
 * OUTPUT: New object "Task" (as mongoose model)
 */
router.put('/task/:id', ctrProject.TaskCreate);

/* Mark task as completed
 * METHOD: put, URL: api/task_status/:pid/:tid
 * INPUT: Id project (in URL), id task (in URL)
 * OUTPUT: Modified object "Project" (as mongoose model)
 */
router.put('/task_status/:pid/:tid', ctrProject.TaskChecked);

/* Update project
 * METHOD: put, URL: api/project_update/:id
 * INPUT: Name (string in body request), id project (in URL)
 * OUTPUT: Modified object "Project" (as mongoose model)
 */
router.put('/project_update/:id', ctrProject.UpdateProject); 

/* Update task
 * METHOD: put, URL: api/task_update/:pid/:tid
 * INPUT: Name (string in body request), id project (in URL), id task (in URL)
 * OUTPUT: Object "Project" with modified a field "tasks" (as mongoose model)
 */
router.put('/task_update/:pid/:tid', ctrProject.UpdateTask);

/* Delete project (change status project)
 * METHOD: put, URL: api/project_d/:pid
 * INPUT: id project (in URL)
 * OUTPUT: Deleted object "Project" (as mongoose model)
 */
router.put('/project_d/:id', ctrProject.DeleteProject);

/* Delete task 
 * METHOD: put, URL: api/task_d/:pid/:tid
 * INPUT: Id project (in URL), id task (in URL)
 * OUTPUT: Object "Project" with deleted a field "tasks" (as mongoose model)
 */
router.delete('/task_d/:pid/:tid', ctrProject.DeleteTask);

/* Output project and task on page
 * METHOD: get, URL: api/
 * INPUT: -
 * OUTPUT: Objects "Project" without projects with status='F' (as mongoose model)
 */
router.get('/', ctrProject.OutputProjectAndTask);

module.exports = router;
