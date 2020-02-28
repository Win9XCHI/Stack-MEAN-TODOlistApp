# Stack-MEAN-TODOlistApp

Access link: https://protected-crag-50525.herokuapp.com/

Functionality:
1. Create new projects;
2. Add new tasks in a project;
3. Update name projects or tasks;
4. Delete projects or tasks;
5. Mark a task as 'done'.

Data base tables: project and task

Tools & Technologies: HTML, Jade, Bootstrap, JavaScript, AJAX, JQuery, Node.js, Express, MongoDB, REST API.

Opportunities for improvement:
1. User authentication (add new table in DB and use JWT standard, LocalStorage);
2. Add priority and deadline with able email alert for tasks (add new fields in table "task", functions on front-end for movement tasks);
3. Add history projects and tasks (add new page);
4. Productivity tracking tools (add new page and calculation functions);
5. Refactoring front-end on Angular.


SQL query:
CREATE TABLE projects (
    id int unique NOT NULL,
    name varchar(20),
    primary key (id)
);

CREATE TABLE tasks (
    id int unique NOT NULL,
    name varchar(20),
    status varchar(1),
    project_id int,
    primary key (id),
    foreign key (project_id) REFERENCES projects(id)
);

1) SELECT DISTINCT(status) FROM tasks ORDER BY status ASC; 
2) SELECT project_id, COUNT(*) FROM tasks GROUP BY project_id ORDER BY project_id DESC; 
3) SELECT projects.name, project_id, COUNT(*) FROM tasks JOIN (projects) ON (tasks.project_id = projects.id) GROUP BY project_id ORDER BY projects.name ASC
4) SELECT * FROM tasks WHERE name LIKE "N%"; 
5) SELECT projects.name, IFNULL(COUNT(tasks.id), 0) AS 'Count tasks' FROM projects LEFT JOIN (tasks) ON (tasks.project_id = projects.id) WHERE projects.name LIKE "%a%" GROUP BY projects.name
6) SELECT * FROM tasks WHERE name IN (SELECT name FROM tasks GROUP BY name HAVING COUNT(*) > 1);
7) SELECT name, status, COUNT(*) FROM tasks JOIN (projects) ON (tasks.project_id = projects.id) WHERE tasks.name IN (SELECT name FROM tasks GROUP BY name) AND tasks.status IN (SELECT status FROM tasks GROUP BY status) AND projects.name = "Garage" GROUP BY tasks.name, tasks.status HAVING COUNT(*) > 1 ORDER BY COUNT(*) ASC;
8) SELECT projects.name, COUNT(*) FROM tasks JOIN (projects) ON (tasks.project_id = projects.id) WHERE tasks.status = "F" GROUP BY projects.name HAVING COUNT(*) > 10 ORDER BY tasks.project_id;
