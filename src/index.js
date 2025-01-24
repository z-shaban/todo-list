import './styles.css';
import {Todo} from './todo.js';
import {Project} from './projects.js';

const todo = new Todo("class","me", 2, "high");
todo.print();

const project = new Project("list");
project.print();
