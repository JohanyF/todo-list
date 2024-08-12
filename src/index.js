import './style.css';

import Project from './project.js';
import DOMHandler from './DOMHandler.js';

let DOMhandler = new DOMHandler();

DOMhandler.loadSVGs();
let projectList = [];
let inboxTest = new Project("Inbox");
projectList.push(inboxTest);

DOMhandler.addEventListenersToInbox();
DOMhandler.addEventListenersToToday();
DOMhandler.addEventListenersToUpcoming();

// PROJECTS ARE USED FOR TESTING PURPOSES 
// let project1 = new Project("project1");
// projectList.push(project1);
// let project2 = new Project("project2");
// projectList.push(project2);
// let project3 = new Project("project3");
// projectList.push(project3);

const addBtn = DOMhandler.addBtn;
const addProjectBtn = DOMhandler.addProjectBtn;
const cancelBtn = DOMhandler.cancelBtn;
const submitBtn = DOMhandler.submitBtn;
const checkBtn = DOMhandler.checkBtn;
const cancelProjectBtn = DOMhandler.cancelProjectBtn;


const createNewProject = (projectName) => {
    const project = new Project(projectName);
    projectList.push(project);
}

addBtn.addEventListener("click", () => {
    DOMhandler.taskModal.showModal();
    DOMhandler.renderSelectOptions(projectList);
})

cancelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    DOMhandler.taskModal.close();
    document.taskForm.reset();
})

submitBtn.addEventListener("click", (event) => {
    event.preventDefault();

    // Make this a function that return the index of the project we are adding a task to!
    let currentProjectIndex = 0;
    projectList.forEach((project, index=0) => {
        // console.log(project.name);
        if(project.name.toLowerCase() === DOMhandler.projects.value) {
            currentProjectIndex = index;

        }
        index++;
    })
    // 


    projectList[currentProjectIndex].addTask(DOMhandler.taskTitle.value, DOMhandler.description.value, DOMhandler.date.value, DOMhandler.priority.value, DOMhandler.projects.value);

    if(DOMhandler.projectTitleText.textContent === projectList[currentProjectIndex].name) {
        console.log(projectList[currentProjectIndex].tasks);
        DOMhandler.renderNewTask(projectList[currentProjectIndex].tasks, projectList[currentProjectIndex].tasks.length-1);
    }
    console.log(projectList);
    DOMhandler.taskModal.close();
    document.taskForm.reset();
})

addProjectBtn.addEventListener("click", () => {
    DOMhandler.projectForm.classList.remove('none');
})

checkBtn.addEventListener("click", (event)=> {
    event.preventDefault();
    DOMhandler.projectForm.classList.add('none');
    createNewProject(DOMhandler.projectName.value);
    DOMhandler.renderNewProject(DOMhandler.projectName.value, projectList)
    document.addProjectForm.reset();
})

cancelProjectBtn.addEventListener("click", () => {
    DOMhandler.projectForm.classList.add('none');
    document.addProjectForm.reset();
})