import './styles.css';
import { App } from './app.js';

const myApp = new App();
myApp.print();
myApp.create("project1")
myApp.create("project2")
myApp.projects[0].create("project1a", "h", 2,"low")
myApp.projects[1].create("project2a", "h", 2,"low")

document.addEventListener('DOMContentLoaded', ()=>{
    const projects = document.querySelector('#project');
    const task = document.querySelector('#task');
    const createProject = document.querySelector("#createProject");

    createProject.addEventListener("click", ()=>{
        const createDialog = document.createElement("dialog");
        createDialog.id = "dialog";
        createDialog.innerHTML = `
         <h2>Create a Project</h2>
         <input type="text" name="projectName" id="projectName" placeholder="Enter Project Name">
         <button id="close">CLOSE</button>
         <button id="create">CREATE</button>
        `
    
        projects.appendChild(createDialog);
        createDialog.showModal();

        const close = createDialog.querySelector("#close");
        close.addEventListener("click",()=>{
            createDialog.close();
            createDialog.remove();
        })

        const create = createDialog.querySelector("#create");
        create.addEventListener("click", ()=>{
            const projectName = createDialog.querySelector("#projectName").value;
            const newProject = myApp.create(projectName)
            projects.appendChild(newProject);
            createDialog.close();
            createDialog.remove();

            const edit = newProject.querySelector("#edit")
            edit.addEventListener("click",()=>{
                const ProjectIndex = Array.from(projects.children).indexOf(newProject);
                const editDialog = document.createElement("dialog");
                editDialog.id = "editDialog";
                editDialog.innerHTML = `
                <h2>Edit Project</h2>
                <input type="text" name="projectName" id="projectName" placeholder="Enter Project Name">
                <button id="close">CLOSE</button>
                <button id="editProject">EDIT</button>
              `
              projects.appendChild(editDialog);
              editDialog.showModal();

              const close = editDialog.querySelector("#close");
              close.addEventListener("click",()=>{
                editDialog.close();
                editDialog.remove();
        })
        const editButton = editDialog.querySelector("#editProject");
        editButton.addEventListener("click", ()=>{
        const projectName = editDialog.querySelector("#projectName").value;
        const editedProject = myApp.edit(ProjectIndex, projectName)
        projects.replaceChild(editedProject, newProject);
        editDialog.close();
        editDialog.remove();
    })
        })
        })

        
    })

    
})
