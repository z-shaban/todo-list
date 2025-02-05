import './styles.css';
import { App } from './app.js';
import { renderProject } from './dom.js';

export const myApp = new App();
myApp.print();
myApp.create("project1")
myApp.create("project2")
myApp.projects.forEach((project,index)=> renderProject(project,index))
myApp.projects[0].create("project1a", "h", 2,"low")
myApp.projects[1].create("project2a", "h", 2,"low")


















/*
document.addEventListener('DOMContentLoaded', ()=>{
    const projects = document.querySelector('#project');
    const task = document.querySelector('#task');
    const createProject = document.querySelector("#createProject");

    

            const edit = newProject.querySelector("#edit")
            edit.addEventListener("click",()=>{
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
        const editedProject = myApp.edit(projectIndex, projectName)
        projects.replaceChild(editedProject, newProject);
        editDialog.close();
        editDialog.remove();
    })
        })

        const remove = newProject.querySelector("#remove")
        remove.addEventListener("click",()=>{
            myApp.delete(projectIndex);
            newProject.remove();
        })

        const viewProject = newProject.querySelector("#viewProject")
        viewProject.addEventListener("click",()=>{
            alert("hi");
            task.textContent = "";
            task.textContent = myApp.view(projectIndex);
        })
        })

        
    })

    
})*/
