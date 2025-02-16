
import { Project } from "./projects.js";

const projectContainer = document.querySelector('#project');
const taskContainer = document.querySelector('#task');
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

            edit.addEventListener("click",()=> {openEditDialog(index,project)});
            remove.addEventListener("click",()=>{
                myApp.delete(index);
                myProject.remove();
            })
            viewProject.addEventListener("click",()=>{
                const projectIndex = myApp.view(index)
                taskContainer.textContent = "";
                const createTodo = document.createElement("button");
                createTodo.textContent = "ADD TODO"
                taskContainer.appendChild(createTodo);
                
                createTodo.addEventListener("click",()=>{
                    openCreateTodo(project, index);
                })
    
                
                if (projectIndex){
                    project.todo.forEach((todo, index)=>{
                    renderTodo(todo, index, project);
                    
                })}
            })}

 function renderTodo(todo, index, project){
            const myTodo = document.createElement("div");
            const viewTodo = document.createElement("button");
            const edit = document.createElement("button");
            const remove = document.createElement("button");

            edit.id = "edit";
            remove.id = "remove"
            viewTodo.className = "viewTodo";
            viewTodo.setAttribute("data-index", index);


            viewTodo.textContent = todo.title;
            edit.textContent = "EDIT";
            remove.textContent = "REMOVE";

            edit.addEventListener("click",()=> {editTodoDialog(todo,index,project)});
            viewTodo.addEventListener("click",()=>{viewTodoDialog(todo, index)});
            remove.addEventListener("click",()=>{
                project.delete(todo);
                myTodo.remove();
            })

            myTodo.append(viewTodo, edit, remove)
            taskContainer.appendChild(myTodo)
            return myTodo;
        }

function openEditDialog(index, project){
    const editDialog = document.createElement("dialog");
    editDialog.id = "editDialog";
    editDialog.innerHTML = `
    <h2>Edit Project</h2>
    <input type="text" name="newName" id="newName" value="${project.name}">
    <button id="close">CLOSE</button>
    <button id="editProject">EDIT</button>
  `
  console.log(project)
    projectContainer.appendChild(editDialog);
    editDialog.showModal();

   const close = editDialog.querySelector("#close");
   close.addEventListener("click",()=>{
    editDialog.close();
    editDialog.remove();
  })

  editDialog.querySelector("#editProject").addEventListener("click",()=>{
    const newName = document.querySelector("#newName").value;
    myApp.edit(index, newName)
    myProject.querySelectorAll("#viewProject").textContent= newName;
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
            renderProject(newProject, myApp.projects.length - 1, project);
        }
        createDialog.close();
        createDialog.remove();
    })
    
})

function openCreateTodo(project,index){
    const todoDialog = document.createElement("dialog");
    todoDialog.id = "todoDialog";
    todoDialog.innerHTML = `
    <h2>ADD a TODO</h2>
    <input type="text" name="title" id="title" placeholder="Enter todo Name">
    <input type="text" name="description" id="description" placeholder="Description">
    <input type="text" name="dueDate" id="dueDate" placeholder="Due Date">
    <input type="text" name="priority" id="priority" placeholder="Priority">
    <button id="closeCreate">CLOSE</button>
    <button id="confirmCreate">CREATE</button>
    `
    
    taskContainer.appendChild(todoDialog);
    todoDialog.showModal();

    const close = todoDialog.querySelector("#closeCreate");
    close.addEventListener("click",()=>{
        todoDialog.close();
        todoDialog.remove();
    })

    document.querySelector("#confirmCreate").addEventListener("click",()=>{
           const title = document.querySelector("#title").value;
           const description = document.querySelector("#description").value;
           const dueDate= document.querySelector("#dueDate").value;
           const priority = document.querySelector("#priority").value

            const newTask = project.create(title,description,dueDate,priority);
            renderTodo(newTask,project.todo.length-1)
            console.log(project.todo)
           
           todoDialog.close();
           todoDialog.remove();
           
    })
        

}

function editTodoDialog(todo, index,project){
    const todoDialog = document.createElement("dialog");
    todoDialog.id = "todoDialog";
    todoDialog.innerHTML = `
    <h2>EDIT TODO</h2>
    <input type="text" name="title" id="title" value="${todo.title}">
    <input type="text" name="description" id="description" value="${todo.description}">
    <input type="text" name="dueDate" id="dueDate" value="${todo.dueDate}">
    <input type="text" name="priority" id="priority" value="${todo.priority}">
    <button id="closeCreate">CLOSE</button>
    <button id="confirmEdit">EDIT</button>
    `
    
    taskContainer.appendChild(todoDialog);
    todoDialog.showModal();

    const close = todoDialog.querySelector("#closeCreate");
    close.addEventListener("click",()=>{
        todoDialog.close();
        todoDialog.remove();
    })

    document.querySelector("#confirmEdit").addEventListener("click",()=>{
           const title = document.querySelector("#title").value;
           const description = document.querySelector("#description").value;
           const dueDate= document.querySelector("#dueDate").value;
           const priority = document.querySelector("#priority").value

           project.todo[index] = {
            title,
            description,
            dueDate,
            priority
        };

        myApp.projects[index] = project;

           
            console.log(project.todo)
           
           todoDialog.close();
           todoDialog.remove();
           
    })
        
}

function viewTodoDialog(project, index){
    const todo = project.todo[index];
    const todoDialog = document.createElement("dialog");
    todoDialog.id = "todoDialog";
    todoDialog.innerHTML = `
    <h2>TODO</h2>
    <p>NAME:  ${todo.title}</p>
    <p>DESCRIPTION: ${todo.description}</p>
    <p>DUE DATE: ${todo.dueDate}</p>
    <p>PRIORITY: ${todo.priority}</p>
    <button id="closeCreate">CLOSE</button>
    `
    
    taskContainer.appendChild(todoDialog);
    todoDialog.showModal();

    const close = todoDialog.querySelector("#closeCreate");
    close.addEventListener("click",()=>{
        todoDialog.close();
        todoDialog.remove();
    })
}