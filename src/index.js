import './style.css';

import Project from './project.js';
import DOMHandler from './DOMHandler.js';

let DOMhander = new DOMHandler();

DOMhander.loadSVGs();
let projectList = [];
let inboxTest = new Project("Inbox");
projectList.push(inboxTest);

const addBtn = DOMhander.addBtn;
const addProjectBtn = DOMhander.addProjectBtn;
const cancelBtn = DOMhander.cancelBtn;
const submitBtn = DOMhander.submitBtn;
const checkBtn = DOMhander.checkBtn;
const cancelProjectBtn = DOMhander.cancelProjectBtn;


const createNewProject = (projectName) => {
    const project = new Project(projectName);
    projectList.push(project);
}

addBtn.addEventListener("click", () => {
    DOMhander.taskModal.showModal();
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMhander.taskModal.close();
    document.taskForm.reset();
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    inboxTest.addTask(DOMhander.taskTitle.value, DOMhander.description.value, DOMhander.date.value, DOMhander.priority.value, DOMhander.projects.value);
    inboxTest.printTasks();
    DOMhander.renderNewTask(inboxTest.tasks.length-1);
    DOMhander.taskModal.close();
    document.taskForm.reset();
})

addProjectBtn.addEventListener("click", () => {
    DOMhander.projectForm.classList.remove('none');
})

checkBtn.addEventListener("click", (event)=> {
    console.log("CHECK TEST");
    event.preventDefault();
    DOMhander.projectForm.classList.add('none');
    createNewProject(DOMhander.projectName.value);
    DOMhander.renderNewProject(DOMhander.projectName.value)
    console.log(projectList);
    document.addProjectForm.reset();
})

cancelProjectBtn.addEventListener("click", () => {
    DOMhander.projectForm.classList.add('none');
    document.addProjectForm.reset();
})