import {myApp} from "./index.js"

const projectContainer = document.querySelector('#project');
const task = document.querySelector('#task');
const createProject = document.querySelector("#createProject");

export function renderProject(project, index){
            const myProject = document.createElement("div");
            const viewProject = document.createElement("button");
            const edit = document.createElement("button");
            const remove = document.createElement("button");

            edit.id = "edit";
            remove.id = "remove"
            viewProject.id = "viewProject"

            viewProject.textContent = project.name;
            edit.textContent = "EDIT";
            remove.textContent = "REMOVE";

            myProject.append(viewProject, edit, remove)
            projectContainer.appendChild(myProject)

            edit.addEventListener("click",()=> {openEditDialog(index,myProject)});
            remove.addEventListener("click",()=>{
                myApp.delete(index);
                myProject.remove();
            })
            viewProject.addEventListener("click",()=>{
                task.textContent = "";
                task.textContent = myApp.view(index);
            })
}

function openEditDialog(index, projecElement){
    const editDialog = document.createElement("dialog");
    editDialog.id = "editDialog";
    editDialog.innerHTML = `
    <h2>Edit Project</h2>
    <input type="text" name="newName" id="newName" placeholder="Enter Project Name">
    <button id="close">CLOSE</button>
    <button id="editProject">EDIT</button>
  `
    projectContainer.appendChild(editDialog);
    editDialog.showModal();

   const close = editDialog.querySelector("#close");
   close.addEventListener("click",()=>{
    editDialog.close();
    editDialog.remove();
  })

  document.querySelector("#editProject").addEventListener("click",()=>{
    const newName = document.querySelector("#newName").value;
    myApp.edit(index, newName)
    projecElement.querySelector("button").textContent= newName;
    editDialog.close();
    editDialog.remove();
  })
}

createProject.addEventListener("click", ()=>{
    const createDialog = document.createElement("dialog");
    createDialog.id = "createDialog";
    createDialog.innerHTML = `
     <h2>Create a Project</h2>
     <input type="text" name="projectName" id="projectName" placeholder="Enter Project Name">
     <button id="closeCreate">CLOSE</button>
     <button id="confirmCreate">CREATE</button>
    `

    projectContainer.appendChild(createDialog);
    createDialog.showModal();

    const close = createDialog.querySelector("#closeCreate");
    close.addEventListener("click",()=>{
        createDialog.close();
        createDialog.remove();
    })

    document.querySelector("#confirmCreate").addEventListener("click", ()=>{
        const projectName = document.querySelector("#projectName").value
        if (projectName.trim()){
            const newProject = myApp.create(projectName);
            renderProject(newProject, myApp.projects.length - 1);
        }
        createDialog.close();
        createDialog.remove();
    })
})