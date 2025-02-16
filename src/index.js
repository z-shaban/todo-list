import './styles.css';
import { App } from './app.js';
import { renderProject } from './myDom.js';

export const myApp = new App();
myApp.print();
myApp.create("project1")
myApp.create("project2")
myApp.projects.forEach((project,index)=> renderProject(project,index))
myApp.projects[0].create("project1a", "h", 2,"low")
myApp.projects[1].create("project2a", "h", 2,"low")












