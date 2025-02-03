import { Project } from "./projects";
 export class App{
    constructor(){
        this.projects = [];
    }

    print(){
        console.log(this.projects);
     }

    create(name){
      const project = new Project(name);
      this.projects.push(project);
            const myProject = document.createElement("div");
            const projectName = document.createElement("button");
            const edit = document.createElement("button");
            const remove = document.createElement("button");

            edit.id = "edit";
            remove.id = "remove"

            projectName.textContent = name;
            edit.textContent = "EDIT";
            remove.textContent = "REMOVE";
            myProject.append(projectName, edit, remove)
           return myProject;

    }

    view(project){
        this.projects.forEach((num, index)=>{
            if(index==project){
                console.log("this is", num);
            }
        })
    }

    edit(project, name){
        for(let index = 0; index < this.projects.length; index++){
            if(index == project){
                console.log('your edited app is',this.projects)
                this.projects[index] = new Project(name);
                const myProject = document.createElement("div");
                const projectName = document.createElement("button");
                const edit = document.createElement("button");
               const remove = document.createElement("button");

            edit.id = "edit";
            remove.id = "remove"

            projectName.textContent = name;
            edit.textContent = "EDIT";
            remove.textContent = "REMOVE";
            myProject.append(projectName, edit, remove)
           return myProject;

        }
        
    }
    return null;
}

    delete(project){
        this.projects.splice(project,1)
        console.log("your new array after deletion is", this.projects)
    }
 }