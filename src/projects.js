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

    view(index){
        console.log("view",this.todo[index])
        return this.todo[index];
    }

    edit(index,title,description, dueDate, priority){
        const todo =this.todo[index];
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;
        return todo;
    }

    delete(todoIndex){
        this.todo.splice(todoIndex, 1);
        console.log("your new array after deletion is", this.todo)
    }
}
