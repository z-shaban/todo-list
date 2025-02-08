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

    view(index){
        console.log("view",this.projects[index])
        return this.projects[index];
        /*if (this.projects[index]) {
        const project = this.projects[index];
                return project;}*/
    }

    edit(index, newName){
     this.projects[index].name = newName;
     console.log(this.projects)
    }
   

    delete(project){
        this.projects.splice(project,1)
        console.log("your new array after deletion is", this.projects)
    }
 }