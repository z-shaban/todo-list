import './styles.css';
import {Todo} from './todo.js';
import {Project} from './projects.js';


const project1 = new Project("project 1");
const project2= new Project("project 2");
project1.print();
project1.create("project1a", "h", 2,"low");
project1.create("project1b", "h", 2,"low");
project1.view(1);
project1.delete(0);
project2.print();
project2.create("project2a", "h", 2,"low");
project2.edit(0,"project2anew", "h", 2,"low");
project2.create("project2b", "h", 2,"low");
