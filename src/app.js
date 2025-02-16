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
      return project;

    }

    view(projectIndex){
        console.log("view",this.projects[projectIndex])
        return this.projects[projectIndex];
        /*if (this.projects[index]) {
        const project = this.projects[index];
                return project;}*/
    }

    edit(editedName, projectIndex){
     this.projects[projectIndex].name = editedName;
     console.log(this.projects)
    }
   

    delete(projectIndex){
        this.projects.splice(projectIndex,1)
        console.log("your new array after deletion is", this.projects)
    }
 }