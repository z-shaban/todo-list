import './styles.css';
import { App } from './app.js';

const myApp = new App();
myApp.print();
myApp.create("project1")
myApp.create("project2")
myApp.project[0].create("project1a", "h", 2,"low")
myApp.project[1].create("project2a", "h", 2,"low")

document.addEventListener('DOMContentLoaded', ()=>{
    const projects = document.querySelector('#project');
    const task = document.querySelector('#task');
    const createProject = document.querySelector("#createProject");

    createProject.addEventListener("click", ()=>{
        const dialog = document.createElement("dialog");
        dialog.id = "createProjectDialog";
        dialog.innerHTML = `
         <h2>Create a Project</h2>
         <input type="text" name="projectName" id="exampleId" placeholder="Enter Project Name">
         <button id="close">CLOSE</button>
         <button id="create">CREATE</button>
        `
        projects.appendChild(dialog);
        dialog.showModal();

        const close = dialog.querySelector("#close");
        close.addEventListener("click",()=>{
            dialog.close();
            dialog.remove();
        })
    })

    
})

