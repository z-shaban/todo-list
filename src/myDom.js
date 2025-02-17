import { myApp } from "./index.js";

const projectContainer = document.querySelector("#project");
const todoContainer = document.querySelector("#task");
const createProject = document.querySelector("#createProject");

export function renderProject(project, projectIndex) {
  const projectCard = document.createElement("div");
  const viewProject = document.createElement("button");
  const editProject = document.createElement("button");
  const removeProject = document.createElement("button");

  editProject.classList.add("editProject");
  removeProject.classList.add("removeProject");
  viewProject.classList.add("viewProject");

  viewProject.textContent = project.name;
  editProject.textContent = "EDIT";
  removeProject.textContent = "REMOVE";

  projectCard.append(viewProject, editProject, removeProject);
  projectContainer.appendChild(projectCard);

  editProject.addEventListener("click", () => {
    editProjectDialog(project, projectIndex, viewProject);
  });
  removeProject.addEventListener("click", () => {
    myApp.delete(projectIndex);
    reRenderProjects();
    todoContainer.innerHTML = "";
  });

  viewProject.addEventListener("click", () => {
    viewProjectCard(project, projectIndex);
  });
}

function viewProjectCard(project, projectIndex) {
  todoContainer.innerHTML = "";
  const createTodo = document.createElement("button");
  createTodo.textContent = "ADD TODO";
  todoContainer.appendChild(createTodo);
  createTodo.addEventListener("click", () => {
    createTodoDialog(project, projectIndex);
  });

  project.todo.forEach((todo, todoIndex) =>
    renderTodo(todo, todoIndex, projectIndex),
  );
}

function renderTodo(todo, todoIndex, projectIndex) {
  const todoCard = document.createElement("div");
  const viewTodo = document.createElement("button");
  const editTodo = document.createElement("button");
  const removeTodo = document.createElement("button");

  editTodo.classList.add("editTodo");
  removeTodo.classList.add("removeTodo");
  viewTodo.classList.add("viewTodo");

  viewTodo.textContent = todo.title;
  editTodo.textContent = "EDIT";
  removeTodo.textContent = "REMOVE";

  todoCard.append(viewTodo, editTodo, removeTodo);
  todoContainer.appendChild(todoCard);

  viewTodo.addEventListener("click", () => viewTodoCard(todo, todoIndex));
  editTodo.addEventListener("click", () => {
    const project = myApp.projects[projectIndex];
    editTodoDialog(project, projectIndex, todo, todoIndex);
  });

  removeTodo.addEventListener("click", () => {
    const project = myApp.projects[projectIndex];
    project.delete(todoIndex);
    viewProjectCard(project, projectIndex);
  });
}

function editProjectDialog(project, projectIndex, viewProject) {
  const editProjectDialog = document.createElement("dialog");
  editProjectDialog.id = "editProjectDialog";
  editProjectDialog.innerHTML = `
    <h2>Edit Project</h2>
    <input type="text" name="editedName" id="editedName" value="${project.name}">
    <button id="closeEditProjectDialog">CLOSE</button>
    <button id="confirmEditProject">EDIT</button>
  `;
  projectContainer.appendChild(editProjectDialog);
  editProjectDialog.showModal();

  editProjectDialog
    .querySelector("#closeEditProjectDialog")
    .addEventListener("click", () => {
      editProjectDialog.close();
      editProjectDialog.remove();
    });

  editProjectDialog
    .querySelector("#confirmEditProject")
    .addEventListener("click", () => {
      const editedName = editProjectDialog.querySelector("#editedName").value;
      myApp.edit(editedName, projectIndex);
      viewProject.textContent = editedName;
      editProjectDialog.close();
      editProjectDialog.remove();
    });
}

createProject.addEventListener("click", () => {
  const createProjectDialog = document.createElement("dialog");
  createProjectDialog.id = "createDialog";
  createProjectDialog.innerHTML = `
     <h2>Create a Project</h2>
     <input type="text" name="projectName" id="projectName" placeholder="Enter Project Name">
     <button id="closeCreateProject">CLOSE</button>
     <button id="confirmCreateProject">CREATE</button>
    `;

  projectContainer.appendChild(createProjectDialog);
  createProjectDialog.showModal();

  createProjectDialog
    .querySelector("#closeCreateProject")
    .addEventListener("click", () => {
      createProjectDialog.close();
      createProjectDialog.remove();
    });

  createProjectDialog
    .querySelector("#confirmCreateProject")
    .addEventListener("click", () => {
      const projectName =
        createProjectDialog.querySelector("#projectName").value;

      if (projectName.trim()) {
        const newProject = myApp.create(projectName);
        renderProject(newProject, myApp.projects.length - 1);
      }
      createProjectDialog.close();
      createProjectDialog.remove();
    });
});

function viewTodoCard(todo, todoIndex) {
  const todoDialog = document.createElement("dialog");
  todoDialog.id = "todoDialog";
  todoDialog.innerHTML = `
    <h2>TODO</h2>
    <p>NAME:  ${todo.title}</p>
    <p>DESCRIPTION: ${todo.description}</p>
    <p>DUE DATE: ${todo.dueDate}</p>
    <p>PRIORITY: ${todo.priority}</p>
    <button id="closeCreate">CLOSE</button>
    `;

  todoContainer.appendChild(todoDialog);
  todoDialog.showModal();

  const close = todoDialog.querySelector("#closeCreate");
  close.addEventListener("click", () => {
    todoDialog.close();
    todoDialog.remove();
  });
}

function editTodoDialog(project, projectIndex, todo, todoIndex) {
  const editTodoDialog = document.createElement("dialog");
  editTodoDialog.id = "editTodoDialog";
  editTodoDialog.innerHTML = `
    <h2>EDIT TODO</h2>
    <input type="text" name="title" id="title" value="${todo.title}">
    <input type="text" name="description" id="description" value="${todo.description}">
    <input type="text" name="dueDate" id="dueDate" value="${todo.dueDate}">
    <input type="text" name="priority" id="priority" value="${todo.priority}">
    <button id="closeEditTodoDialog">CLOSE</button>
    <button id="confirmEditTodo">EDIT</button>
    `;

  todoContainer.appendChild(editTodoDialog);
  editTodoDialog.showModal();

  editTodoDialog
    .querySelector("#closeEditTodoDialog")
    .addEventListener("click", () => {
      editTodoDialog.close();
      editTodoDialog.remove();
    });

  editTodoDialog
    .querySelector("#confirmEditTodo")
    .addEventListener("click", () => {
      const title = editTodoDialog.querySelector("#title").value;
      const description = editTodoDialog.querySelector("#description").value;
      const dueDate = editTodoDialog.querySelector("#dueDate").value;
      const priority = editTodoDialog.querySelector("#priority").value;

      project.edit(todoIndex, title, description, dueDate, priority);
      viewProjectCard(project, projectIndex);
      editTodoDialog.close();
      editTodoDialog.remove();
    });
}

function createTodoDialog(project, projectIndex) {
  const createTodoDialog = document.createElement("dialog");
  createTodoDialog.id = "todoDialog";
  createTodoDialog.innerHTML = `
    <h2>ADD a TODO</h2>
    <input type="text" name="title" id="title" placeholder="Enter todo Name">
    <input type="text" name="description" id="description" placeholder="Description">
    <input type="text" name="dueDate" id="dueDate" placeholder="Due Date">
    <input type="text" name="priority" id="priority" placeholder="Priority">
    <button id="closeCreateTodoDialog">CLOSE</button>
    <button id="confirmCreateTodo">CREATE</button>
    `;

  todoContainer.appendChild(createTodoDialog);
  createTodoDialog.showModal();

  createTodoDialog
    .querySelector("#closeCreateTodoDialog")
    .addEventListener("click", () => {
      createTodoDialog.close();
      createTodoDialog.remove();
    });

  createTodoDialog
    .querySelector("#confirmCreateTodo")
    .addEventListener("click", () => {
      const title = document.querySelector("#title").value;
      const description = document.querySelector("#description").value;
      const dueDate = document.querySelector("#dueDate").value;
      const priority = document.querySelector("#priority").value;

      const newTask = project.create(title, description, dueDate, priority);
      renderTodo(newTask, project.todo.length - 1, projectIndex);

      createTodoDialog.close();
      createTodoDialog.remove();
    });
}
function reRenderProjects() {
  projectContainer.innerHTML = "";
  myApp.projects.forEach((project, index) => renderProject(project, index));
}
