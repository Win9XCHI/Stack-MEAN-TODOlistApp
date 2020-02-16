//Controller file for app_api folder
var mongoose = require('mongoose');
var Pr = mongoose.model('Project');

/* Output query status and message 
 * INPUT: Object "response", status query, content query
 * OUTPUT: status query, content query
 */
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

/* Add new project 
 * METHOD: post, URL: api/project
 * INPUT: Name (string in body request)
 * OUTPUT: New object "Project" (as mongoose model)
 */
module.exports.ProjectCreate = function (req, res) {
    Pr.find({}, null, function (err, projects) {
        if (err) return handleError(err);
        var id = 0;
        if (projects) {
            projects.forEach(item => { 
              if (item.id > id) {
                    id = item.id;
                } 
            });
        }
        Pr.create({
            id: id + 1,
            name: req.body.name,
            status: "A"
        }, function (err, project) {
            if (err) {
                sendJsonResponse(res, 400, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Add new task 
 * METHOD: put, URL: api/task/:id
 * INPUT: Name (string in body request), id project (in URL)
 * OUTPUT: New object "Task" (as mongoose model)
 */
module.exports.TaskCreate = function (req, res) {
    if (!req.params.id) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
        //req.body.id
    Pr.findOne({id: req.params.id}, null, function (err, projects) {
        if (err) return handleError(err);
        var tid = 0;
        
        if (projects.tasks) {
            projects.tasks.forEach(item => { 
               if (item.id > tid) {
                   tid = item.id;
                } 
            });
        }
        
        Pr.update({id: req.params.id}, { $push: {tasks: {id: tid + 1, name: req.body.name, status: 'A', project_id: req.params.id}}}, { returnOriginal: false },function(err, result){
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, {id: tid + 1, name: req.body.name, status: 'A', project_id: req.params.id});
            }  
        });
    });
}

/* Mark task as completed
 * METHOD: put, URL: api/task_status/:pid/:tid
 * INPUT: Id project (in URL), id task (in URL)
 * OUTPUT: Modified object "Project" (as mongoose model)
 */
module.exports.TaskChecked = function (req, res) {    
    if (!req.params.pid || !req.params.tid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
    Pr.findOne({id: req.params.pid}, 'tasks', function (err, project) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        project.tasks.forEach(item => { 
            if (item.id == req.params.tid) {
               item.status = 'F';
            }
        });
        
        project.save(function (err, project) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Update project
 * METHOD: put, URL: api/project_update/:id
 * INPUT: Name (string in body request), id project (in URL)
 * OUTPUT: Modified object "Project" (as mongoose model)
 */
module.exports.UpdateProject = function (req, res) {   
    if (!req.params.id) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
    Pr.findOne({id: req.params.id}, null, function (err, project) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        project.name = req.body.name;
        project.save(function (err, project) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Update task
 * METHOD: put, URL: api/task_update/:pid/:tid
 * INPUT: Name (string in body request), id project (in URL), id task (in URL)
 * OUTPUT: Object "Project" with modified a field "tasks" (as mongoose model)
 */
module.exports.UpdateTask = function (req, res) {    
    if (!req.params.pid || !req.params.tid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
    Pr.findOne({id: req.params.pid}, null, function (err, project) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        project.tasks.forEach(item => { 
            if (item.id == req.params.tid) {
                item.name = req.body.name;
            }
        });
        project.save(function (err, project) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Delete project (change status project)
 * METHOD: put, URL: api/project_d/:pid
 * INPUT: id project (in URL)
 * OUTPUT: Deleted object "Project" (as mongoose model)
 */
module.exports.DeleteProject = function (req, res) {   
    if (!req.params.id) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
    Pr.findOne({id: req.params.id}, null, function (err, project) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        project.tasks.forEach(item => { 
            item.remove();
        });
        project.status = "F";
        project.save(function (err, project) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Delete task 
 * METHOD: put, URL: api/task_d/:pid/:tid
 * INPUT: Id project (in URL), id task (in URL)
 * OUTPUT: Object "Project" with deleted a field "tasks" (as mongoose model)
 */
module.exports.DeleteTask = function (req, res) {    
    if (!req.params.pid || !req.params.tid) {
        sendJsonResponse(res, 404, {
            "message": "Not found, id is required"
        });
    }
    
    Pr.findOne({id: req.params.pid}, null, function (err, project) {
        if (err) {
            sendJsonResponse(res, 400, err);
            return;
        }
        
        project.tasks.forEach(item => { 
            if (item.id == req.params.tid) {
                item.remove();
            }
        });
        
        project.save(function (err, project) {
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, project);
            }
        });
    });
};

/* Output project and task on page
 * METHOD: get, URL: api/
 * INPUT: -
 * OUTPUT: Objects "Project" without projects with status='F' (as mongoose model)
 */
module.exports.OutputProjectAndTask = function (req, res) {
    Pr.find({status: { $ne: 'F' }}, null, function (err, project) {
        if (err) return handleError(err);
        sendJsonResponse(res, 200, project);
    });
};
