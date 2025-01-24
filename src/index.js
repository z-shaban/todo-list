import './styles.css';
import { App } from './app.js';

const myApp = new App();
myApp.print();
myApp.create("project1")
myApp.create("project2")
myApp.project[0].create("project1a", "h", 2,"low")
myApp.project[1].create("project2a", "h", 2,"low")

