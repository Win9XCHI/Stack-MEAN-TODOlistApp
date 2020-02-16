//File with front-end part
var mainDiv = document.getElementById("main"); //Main container in document
var idProject = -1;
var idTask = -1;

//Block functions "Add project"
$('#myModal').on('shown.bs.modal', function () {
    $('#NameProject').focus();
});

$('#AddProject').click(function (e) {
    let NameProject = $('input#NameProject').val();

    if (!NameProject) {
        $('.alert').alert();
        //$('#infoBlockAdd').val('Please try again');
    } else {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/project",
            type: "POST",
            cache: false,
            data: ({
                'name': NameProject
            }),
            dataType: "json",
            beforeSend: WaitProject,
            success: SuccessfulProject
        });
    }
});

function WaitProject() {
    $('#AddProject').attr("disabled", "disabled");
}

//Create new DOM element for project
function SuccessfulProject(data) {
    if (data) {

        let div = document.createElement('div');
        div.setAttribute('id', data.id);
        div.className = "container SubMain";
        div.innerHTML = '<div class="navbar navbar-dark bg-info shadow-sm" data-id="' + data.id + '"><div class="container d-flex justify-content-between"><a href="#" class="navbar-brand d-flex align-items-center"><i class="fas fa-calendar-week"><strong class="strong text-truncate" data-id="' + data.id + '">&nbsp; ' + data.name + ' </strong></i></a><div><button class="navbar-toggler v1 editProject" type="button" data-toggle="modal" data-target="#ModalEditProject" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-pen"></i></button><button class="navbar-toggler v1 deleteProject" type="button" data-toggle="modal" data-target="#ModalDeleteProject" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-dumpster"></i></button></div></div></div><nav class="navbar navbar-light bg-light"><i class="fas fa-plus col-xs-2"></i><div class="col-xs-4 justify-content-end"><input class="form-control inpAddTask" data-id="' + data.id + '" type="text" data-id="' + data.id + '", placeholder="Start typing here to create a task"></div><button class="btn btn-outline-success my-2 my-sm-0 col-xs-4 AddTask" type="submit" data-id="' + data.id + '">Add task</button></nav><ul class="list-group mb-5" data-id="' + data.id + '"></ul>';
        mainDiv.appendChild(div);

        $('#myModal').modal('hide');
    }
    $('input#NameProject').val("");
    $('#AddProject').removeAttr("disabled");
}

//Block functions "Add task"
$("#main").on("click", ".AddTask", function () {
    idProject = $(this).attr("data-id");
    let NameTask = document.getElementsByClassName('inpAddTask');
    let val = -1;

    Array.from(NameTask).forEach(function (item) {
        if (idProject == $(item).attr("data-id")) {
            val = $(item).val();
        }
    });
    if (val != -1 && val != "") {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/task/" + idProject,
            type: "PUT",
            cache: false,
            data: ({
                'name': val
            }),
            dataType: "json",
            beforeSend: function () {
                $(this).attr("disabled", "disabled");
            },
            success: function (data) {
                // create new DOM element for Task
                if (data) {

                    let li = document.createElement('li');
                    li.setAttribute('data-id', data.id);
                    li.setAttribute('data-project-id', data.project_id);
                    li.className = "list-group-item";
                    li.innerHTML = '<div class="row"><div class="col-1"><i class="fas fa-calendar"></i></div><div class="col-10 col-sm-8 .text-truncate" data-id="' + data.id + '" data-project-id="' + data.project_id + '"> ' + data.name + '</div><div class="col-2 col-sm-1 justify-content-end"><button class="navbar-toggler v2 checkTask" data-id="' + data.id + '" data-project-id="' + data.project_id + '" type="button" data-toggle="modal" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"> <i class="fas fa-check-circle"></i> </button></div><div class="col-2 col-sm-1 justify-content-end"><button class="navbar-toggler v2 editTask" data-id="' + data.id + '" data-project-id="' + data.project_id + '" type="button" data-toggle="modal" data-target="#ModalEditTask" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-pencil-alt"></i></button></div><div class="col-2 col-sm-1 justify-content-end"><button class="navbar-toggler v2 deleteTask" data-id="' + data.id + '" data-project-id="' + data.project_id + '" type="button" data-toggle="modal" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-trash-alt"></i></button></div></div>';

                    let UlMain = document.getElementsByClassName('list-group mb-5');

                    Array.from(UlMain).forEach(function (item) {
                        if (data.project_id == $(item).attr("data-id")) {
                            item.appendChild(li);
                        }
                    });
                }
                $(this).removeAttr("disabled");
            },
            //success: SuccessfulTask,
            error: function (xhr, status, error) {
                alert(xhr.responseText + '|\n' + status + '|\n' + error);
            }
        });
    }
});

function WaitTask() {
    button.attr("disabled", "disabled");
}

//Block functions "Edit project"
$("#main").on("click", ".editProject", function () {
    idProject = $(this).attr("data-id");
    $('#NameEditProject').val($(this).val());
});

$('#ModalEditProject').on('shown.bs.modal', function () {
    $('#NameEditProject').focus();
});

$('#EditProjectModal').click(function () {
    let NameProject = $('input#NameEditProject').val();

    if (!NameProject) {
        $('.alert').alert();
        //$('#infoBlockEditProject').val('Please try again');
    } else {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/project_update/" + idProject,
            type: "PUT",
            cache: false,
            data: ({
                'name': NameProject
            }),
            dataType: "json",
            beforeSend: WaitEditProject,
            success: SuccessfulEditProject
        });
    }
});

function WaitEditProject() {
    $('#EditProjectModal').attr("disabled", "disabled");
}

function SuccessfulEditProject(data) {
    if (data) {
        let Name = document.getElementsByClassName('strong');

        Array.from(Name).forEach(function (item) {
            if (idProject == $(item).attr("data-id")) {
                item.innerHTML = '&nbsp; ' + data.name;
            }
        });
        $('#ModalEditProject').modal('hide');
    }
    $('input#NameEditProject').val("");
    $('#EditProjectModal').removeAttr("disabled");
}

//Block functions "Delete project"
$("#main").on("click", ".deleteProject", function () {
    idProject = $(this).attr("data-id");
    let result = confirm("Delete this project?");

    if (result) {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/project_d/" + idProject,
            type: "PUT",
            cache: false,
            data: ({
                'id': $(this).attr("data-id")
            }),
            dataType: "json",
            success: SuccessfulDeleteProject
        });
    }
});

function SuccessfulDeleteProject(data) {
    if (data) {
        mainDiv.removeChild(document.getElementById(data.id));
    }
}

//Block functions "Task checked"
$("#main").on("click", ".checkTask", function () {
    idProject = $(this).attr("data-project-id");
    idTask = $(this).attr("data-id");
    let result = confirm("Mark this task as completed?");

    if (result) {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/task_status/" + idProject + "/" + idTask,
            type: "PUT",
            cache: false,
            data: ({
                'Hi': "Hi"
            }),
            dataType: "json",
            success: SuccessfulCheckedTask
        });
    }
});

function SuccessfulCheckedTask(data) {
    if (data) {
        SearchAndDeleteTask(idProject, idTask);
    }
}

//Block functions "Edit task"
$("#main").on("click", ".editTask", function () {
    idTask = $(this).attr("data-id");
    idProject = $(this).attr("data-project-id");
    $('input#NameEditTask').val($(this).val());
});

$('#ModalEditTask').on('shown.bs.modal', function () {
    $('#NameEditTask').focus();
});

$('#EditTaskModal').click(function (e) {
    let NameTask = $('input#NameEditTask').val();

    if (!NameTask) {
        $('.alert').alert();
        //$('#infoBlockEditTask').val('Please try again');
    } else {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/task_update/" + idProject + "/" + idTask,
            type: "PUT",
            cache: false,
            data: ({
                'name': NameTask
            }),
            dataType: "json",
            beforeSend: WaitEditTask,
            success: SuccessfulEditTask
        });
    }
});

function WaitEditTask() {
    $('#EditTaskModal').attr("disabled", "disabled");
}

function SuccessfulEditTask(data) {
    if (data) {
        let Name = document.getElementsByClassName('col-10 col-sm-8');

        Array.from(Name).forEach(function (item) {
            if (idTask == $(item).attr("data-id") && idProject == $(item).attr("data-project-id")) {
                item.innerHTML = $('input#NameEditTask').val();
            }
        });
        $('#ModalEditTask').modal('hide');
    }
    $('input#NameEditTask').val("");
    $('#EditTaskModal').removeAttr("disabled");
}

//Block functions "Delete task"
$("#main").on("click", ".deleteTask", function () {
    idProject = $(this).attr("data-project-id");
    idTask = $(this).attr("data-id");
    let result = confirm("Delete this task?");

    if (result) {
        $.ajax({
            url: "https://protected-crag-50525.herokuapp.com/api/task_d/" + idProject + "/" + idTask,
            type: "DELETE",
            cache: false,
            data: ({
                'Hi': "Hi"
            }),
            dataType: "json",
            success: SuccessfulDeleteTask
        });
    }
});

function SuccessfulDeleteTask(data) {
    if (data) {
        SearchAndDeleteTask(idProject, idTask);
    }
}

//Function for search and delete task (id project, id task)
function SearchAndDeleteTask(Project, Task) {
    let li = document.getElementsByClassName('list-group-item');
    let UlMain = document.getElementsByClassName('list-group mb-5');

    try {
        Array.from(UlMain).forEach(function (item) {
            if (Project == $(item).attr("data-id")) {
                throw item;
            }
        });
    } catch (main) {
        Array.from(li).forEach(function (item) {
            if (Task == $(item).attr("data-id") && Project == $(item).attr("data-project-id")) {
                main.removeChild(item);
            }
        });
    }
}
