import { Project } from "./projects";
 export class App{
    constructor(){
        this.project = [];
    }

    print(){
        console.log(this.project);
     }

    create(name){
      const project = new Project(name);
      this.project.push(project);
    }

    view(project){
        this.project.forEach((num, index)=>{
            if(index==project){
                console.log("this is", num);
            }
        })
    }

    edit(project, name){
        this.project.forEach((num,index)=>{
            if(index == project){
                this.project[index] = new Project(name);
                console.log('your edited app is',this.project)
            }
        })
    }

    delete(project){
        this.project.splice(project,1)
        console.log("your new array after deletion is", this.project)
    }
 }