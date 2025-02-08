import { Todo } from "./todo";
export class Project{
    constructor(name){
        this.name = name;
        this.todo = [];
    }
     print(){
        console.log(`project name is ${this.name}`)
        console.log(this.todo);
     }

    create(title,description, dueDate, priority){
        const todo = new Todo(title,description, dueDate, priority);
        this.todo.push(todo);
        return todo;
    }

    view(todo){
      this.todo.forEach((num, index) =>{
        if(index == todo){
            console.log("you are viewing", num);
        }
      })
    }

    edit(todo,title,description, dueDate, priority){
        this.todo.forEach((num, index) =>{
            if(index == todo){
                this.todo[index] = new Todo(title,description, dueDate, priority);
                console.log("your edited todo is", this.todo);
            }
        })
    }

    delete(todo){
        this.todo.splice(todo, 1);
        console.log("your new array after deletion is", this.todo)
    }
}