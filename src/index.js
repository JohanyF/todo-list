import './style.css';

import Project from './project.js';
import DOMHandler from './DOMHandler.js';

let DOMhander = new DOMHandler();

DOMhander.loadSVGs();

let inboxTest = new Project("Inbox");

const addBtn = DOMhander.addBtn;
const cancelBtn = DOMhander.cancelBtn;
const submitBtn = DOMhander.submitBtn;

console.log(addBtn);
console.log(cancelBtn);
console.log(submitBtn);

addBtn.addEventListener("click", () => {
    modal.showModal();
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    modal.close();
    document.taskForm.reset();
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();
    inboxTest.addTask(DOMhander.taskTitle.value, DOMhander.description.value, DOMhander.date.value, DOMhander.priority.value, DOMhander.projects.value);
    inboxTest.printTasks();
    DOMhander.renderNewTask(inboxTest.tasks.length-1);
    modal.close();
    document.taskForm.reset();
})