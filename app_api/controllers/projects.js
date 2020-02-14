var mongoose = require('mongoose');
var Pr = mongoose.model('Project');
//var Pr = mongoose.model('Task');

/* Output query status and message */
var sendJsonResponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

/* Add new project 
 * post api/project
 */
module.exports.ProjectCreate = function (req, res) {
    console.log(req.body);
    Pr.find({}, null, function (err, projects) {
        if (err) return handleError(err);
        var id = 0;
        projects.forEach(item => { 
          if (item.id > id) {
                id = item.id;
            } 
        });
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
 * put api/task/:id
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
        
        projects.tasks.forEach(item => { 
           if (item.id > tid) {
               tid = item.id;
            } 
        });
        
        Pr.update({id: req.params.id}, { $push: {tasks: {id: tid + 1, name: req.body.name, status: 'A', project_id: req.body.id}}}, { returnOriginal: false },function(err, result){
            if (err) {
                sendJsonResponse(res, 404, err);
            } else {
                sendJsonResponse(res, 200, result);
            }  
        });
    });
}

/* Checked task 
 * put api/taskStatus/:pid/:tid
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
 * put api/project/:id
 */
module.exports.UpdateProject = function (req, res) {
    req.body.name = "Second";    
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
 * put api/taskStatus/:pid/:tid
 */
module.exports.UpdateTask = function (req, res) {    
    if (!req.params.pid || !req.params.tid) {
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

/* Delete project 
 * delete api/project_d/:id
 */
/*module.exports.DeleteProject = function (req, res) {
    if (req.params.id) {
        /*Pr.findOne({id: req.params.id}, null, function (err, project) {
            if (err) {
                sendJsonResponse(res, 400, err);
                return;
            }
            project.remove();
        });
        Pr.findOneAndRemove({id: req.params.id}, function (err, project) {
            if (err) {
                //console.log(err);
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 200, project);
        });
    } else {
        sendJsonResponse(res, 404, {
            "message": "No Prationid"
        });
    }
};*/

/* Delete project 
 * delete api/project_d/:id
 */
module.exports.UpdateProject = function (req, res) {
    req.body.name = "Second";    
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
 * delete api/task_d/:pid/:tid
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

/* Output project and Task
 * get api/
 */
module.exports.OutputProjectAndTask = function (req, res) {
    Pr.find({status: { $ne: 'F' }}, null, function (err, project) {
        if (err) return handleError(err);
        sendJsonResponse(res, 200, project);
    });
};
