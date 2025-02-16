import {myApp} from "./index.js"

const projectContainer = document.querySelector('#project');
const taskContainer = document.querySelector('#task');
const createProject = document.querySelector("#createProject");

export function renderProject(project, projectIndex){
            const myProject = document.createElement("div");
            const viewProject = document.createElement("button");
            const editProject = document.createElement("button");
            const removeProject = document.createElement("button");

            editProject.id = "editProject";
            removeProject.id = "removeProject"
            viewProject.classList.add('viewProject');

            viewProject.textContent = project.name;
            editProject.textContent = "EDIT";
            removeProject.textContent = "REMOVE";

            myProject.append(viewProject, editProject, removeProject)
            projectContainer.appendChild(myProject)

            editProject.addEventListener("click",()=> {editProjectDialog(project,projectIndex)});
            removeProject.addEventListener("click",()=>{
                myApp.delete(projectIndex);
                myProject.remove();
            })




}

function editProjectDialog(project, projectIndex){
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
  document.querySelectorAll(".viewProject")[projectIndex].textContent = editedName;
  editProjectDialog.close();
  editProjectDialog.remove();
  })
}

