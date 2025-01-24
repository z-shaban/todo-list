export class Todo{
    constructor(title,description,dueDate,priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    print(){
        console.log(`this is ${this.title + this.description + this.dueDate + this. priority}`)
    }
}