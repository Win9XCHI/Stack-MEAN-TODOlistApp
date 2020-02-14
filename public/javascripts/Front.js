//Add project
$('#myModal').on('shown.bs.modal', function () {
    $('#NameProject').focus();
});

$('#AddProject').click(function (e) {
    let NameProject = $('input#NameProject').val();

    if (!NameProject) {
        $('#NameProject').prepend('<p> Please try again<p>');
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

function SuccessfulProject(data) {
    if (data) {

        let elements = document.getElementsByClassName('navbar-dark');
        let element;
        let id = 0;
        
        elements.forEach(el => {
            if ($el.attr("id") > id) {
                id = $el.attr("id");
                element = el;
            }
            }
        );
        
        element.prepend('<div class="navbar navbar-dark bg-info shadow-sm" id="' + data.id + '"><div class="container d-flex justify-content-between"><a href="#" class="navbar-brand d-flex align-items-center"><i class="fas fa-calendar-week"></i><strong>&nbsp; ' + data.name + ' </strong></a><div><button class="navbar-toggler v1" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-pen"></i></button><button class="navbar-toggler v1" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-dumpster"></i></button></div></div></div><nav class="navbar navbar-light bg-light"><i class="fas fa-plus"></i><div class="col-xs-8"><input class="form-control" id="' + data.id + '" type="text" placeholder="Start typing here to create a task"></div><button class="btn btn-outline-success my-2 my-sm-0" type="submit" id="' + data.id + '">Add task</button></nav><ul class="list-group"></ul>');

        $('#myModal').modal('hide');
    }
    $('#AddProject').removeAttr("disabled");
}

//Add task
$('.AddTask').click(function (e) {
    let idProject = $(this).attr("data-id");
    let NameTask = $('input#inpAddTask').val();

    $.ajax({
        url: "https://protected-crag-50525.herokuapp.com/api/task/" + idProject,
        type: "PUT",
        cache: false,
        data: ({
            'name': NameTask
        }),
        dataType: "json",
        beforeSend: WaitTask,
        success: SuccessfulTask
    });
});

function WaitTask() {
    //$('#AddTask').attr("disabled", "disabled");
}

function SuccessfulTask(data) {
    if (data) {

        let elements = document.getElementsByClassName('ul list-group');
        let element;
        let id = 0;
        elements.forEach(el => {
            if ($el.attr("data-id") == data.project_id) {
                element = el;
            
            element.prepend('<li class="list-group-item"><div class="row"><div class="col-1"><i class="far fa-calendar"></i></div><div class="col-8">Text</div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-check-circle"></i></button></div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-pencil-alt"></i></button></div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-trash-alt"></i></button></div></div></li>');
            }
        }
        );
    }
   // $('#AddTask').removeAttr("disabled");
}

//Edit project
$('#EditProjectModal').click(function (e) {
    let idProject = $(this).attr("data-id");
    let NameTask = $('input#inpAddTask').val();

    $.ajax({
        url: "https://protected-crag-50525.herokuapp.com/api/task/" + idProject,
        type: "PUT",
        cache: false,
        data: ({
            'name': NameTask
        }),
        dataType: "json",
        beforeSend: WaitTask,
        success: SuccessfulTask
    });
});

function WaitTask() {
    $('#AddTask').attr("disabled", "disabled");
}

function SuccessfulTask(data) {
    if (data) {

        let elements = document.getElementsByClassName('ul list-group');
        let element;
        let id = 0;
        elements.forEach(el => {
            if ($el.attr("data-id") == data.project_id) {
                element = el;
            
            element.prepend('<li class="list-group-item"><div class="row"><div class="col-1"><i class="far fa-calendar"></i></div><div class="col-8">Text</div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-check-circle"></i></button></div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-pencil-alt"></i></button></div><div class="col-1"><button class="navbar-toggler v2" type="button" data-toggle="collapse" data-target="#navbarHeader" aria-controls="navbarHeader" aria-expanded="false" aria-label="Toggle navigation"><i class="fas fa-trash-alt"></i></button></div></div></li>');
            }
        }
        );
    }
    $('#AddTask').removeAttr("disabled");
}
