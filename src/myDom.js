import {myApp} from "./index.js"

const projectContainer = document.querySelector('#project');
const todoContainer = document.querySelector('#task');
const createProject = document.querySelector("#createProject");

export function renderProject(project, projectIndex){
            const projectCard = document.createElement("div");
            const viewProject = document.createElement("button");
            const editProject = document.createElement("button");
            const removeProject = document.createElement("button");
            
            
            editProject.classList.add("editProject");
            removeProject.classList.add("removeProject");
            viewProject.classList.add('viewProject');

            viewProject.textContent = project.name;
            editProject.textContent = "EDIT";
            removeProject.textContent = "REMOVE";

            projectCard.append(viewProject, editProject, removeProject)
            projectContainer.appendChild(projectCard)

            editProject.addEventListener("click",()=> {editProjectDialog(project,projectIndex, viewProject)});
            removeProject.addEventListener("click",()=>{
                myApp.delete(projectIndex);
                reRenderProjects();
            })

            viewProject.addEventListener("click", ()=>{viewProjectCard(project, projectIndex)})
}

function viewProjectCard(project,projectIndex){
    myApp.view(projectIndex);
    todoContainer.innerHTML = "";
    const createTodo = document.createElement("button");
    createTodo.textContent = "ADD TODO"
    todoContainer.appendChild(createTodo);

    project.todo.forEach((todo, todoIndex)=> renderTodo(todo, todoIndex))
}

function renderTodo(todo, todoIndex){
    const todoCard = document.createElement("div");
    const viewTodo = document.createElement("button");
    const editTodo = document.createElement("button");
    const removeTodo = document.createElement("button");

    editTodo.classList.add("editTodo");
    removeTodo.classList.add("removeTodo");
    viewTodo.classList.add('viewTodo');

    viewTodo.textContent = todo.title;
    editTodo.textContent = "EDIT";
    removeTodo.textContent = "REMOVE";

    todoCard.append(viewTodo, editTodo, removeTodo)
    todoContainer.appendChild(todoCard)

    
}

function editProjectDialog(project, projectIndex,viewProject){
    const editProjectDialog = document.createElement("dialog");
    editProjectDialog.id = "editProjectDialog";
    editProjectDialog.innerHTML = `
    <h2>Edit Project</h2>
    <input type="text" name="editedName" id="editedName" value="${project.name}">
    <button id="closeEditProjectDialog">CLOSE</button>
    <button id="confirmEditProject">EDIT</button>
  `
    projectContainer.appendChild(editProjectDialog);
    editProjectDialog.showModal();

    editProjectDialog.querySelector("#closeEditProjectDialog").addEventListener("click",()=>{
    editProjectDialog.close();
    editProjectDialog.remove();
  })

  editProjectDialog.querySelector("#confirmEditProject").addEventListener("click",()=>{
  const editedName = editProjectDialog.querySelector("#editedName").value 
  myApp.edit(editedName, projectIndex);
  viewProject.textContent = editedName;
  editProjectDialog.close();
  editProjectDialog.remove();
  })
}

createProject.addEventListener("click",()=>{
    const createProjectDialog = document.createElement("dialog");
    createProjectDialog.id = "createDialog";
    createProjectDialog.innerHTML = `
     <h2>Create a Project</h2>
     <input type="text" name="projectName" id="projectName" placeholder="Enter Project Name">
     <button id="closeCreateProject">CLOSE</button>
     <button id="confirmCreateProject">CREATE</button>
    `

    projectContainer.appendChild(createProjectDialog);
    createProjectDialog.showModal();

    createProjectDialog.querySelector("#closeCreateProject").addEventListener("click",()=>{
        createProjectDialog.close();
        createProjectDialog.remove();
    })
  
     createProjectDialog.querySelector("#confirmCreateProject").addEventListener("click", ()=>{
            const projectName = createProjectDialog.querySelector("#projectName").value
            
            if (projectName.trim()){
                const newProject = myApp.create(projectName);
                renderProject(newProject, myApp.projects.length - 1);
            }
            createProjectDialog.close();
            createProjectDialog.remove();
        })
})

function reRenderProjects(){
    projectContainer.innerHTML = "";
    myApp.projects.forEach((project, index) => renderProject(project, index));
}
