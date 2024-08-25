import './style.css';

import Project from './project.js';
import DOMHandler from './DOMHandler.js';

const serializeProjectList = (projectList) => {
    const serializedProjects = projectList.map(project => project.serialize());
    const stringifySerializedProjects = JSON.stringify(serializedProjects);
    localStorage.setItem("projects", stringifySerializedProjects);
}

let DOMhandler = new DOMHandler();

DOMhandler.loadSVGs();
let projectList = [];

let todayDate = new Date();
const timeZoneOffset = todayDate.getTimezoneOffset();
todayDate = new Date(todayDate.getTime() - (timeZoneOffset*60*1000));

DOMhandler.addDisplayNone();
DOMhandler.addEventListenersToInbox(projectList, serializeProjectList);
// currentDate.toISOString().split('T')[0] gets the date in yyyy-mm-dd format
DOMhandler.addEventListenersToToday(projectList, serializeProjectList, todayDate.toISOString().split('T')[0]);
DOMhandler.addEventListenersToUpcoming(projectList, serializeProjectList, todayDate.toISOString().split('T')[0]);

const addBtn = DOMhandler.addBtn;
const addProjectBtn = DOMhandler.addProjectBtn;
const cancelBtn = DOMhandler.cancelBtn;
const submitBtn = DOMhandler.submitBtn;
const checkBtn = DOMhandler.checkBtn;
const cancelProjectBtn = DOMhandler.cancelProjectBtn;

const createNewProject = (projectName) => {
    const project = new Project(projectName);
    projectList.push(project);
    
    serializeProjectList(projectList);
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

    let currentProjectIndex = 0;
    projectList.forEach((project, index=0) => {
        if(project.name.toLowerCase() === DOMhandler.projects.value) {
            currentProjectIndex = index;

        }
        index++;
    })

    projectList[currentProjectIndex].addTask(DOMhandler.taskTitle.value, DOMhandler.description.value, DOMhandler.date.value, DOMhandler.priority.value, DOMhandler.projects.value, false);

    serializeProjectList(projectList);

    if(DOMhandler.projectTitleText.textContent === projectList[currentProjectIndex].name) {
        DOMhandler.renderNewTask(projectList[currentProjectIndex].tasks, projectList[currentProjectIndex].tasks.length-1, serializeProjectList, projectList);
    }
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
    DOMhandler.renderNewProject(DOMhandler.projectName.value, projectList, serializeProjectList)
    document.addProjectForm.reset();
})

cancelProjectBtn.addEventListener("click", () => {
    DOMhandler.projectForm.classList.add('none');
    document.addProjectForm.reset();
})

const setUpLocalStorage = (projectList) => {
    const savedProjectJson = localStorage.getItem("projects");

    if(savedProjectJson) {
        const parsedProjectList = JSON.parse(savedProjectJson);

        const restoredProject = parsedProjectList.map(projectData => Project.deserialize(projectData));

        for(let i = 0; i < restoredProject.length; i++) {
            projectList.push(restoredProject[i]);
        }

        for(let i = 1; i < restoredProject.length; i++) {
            DOMhandler.renderProjectsFromLocalStorage(restoredProject[i].name, projectList, serializeProjectList);
        }
    }
}

setUpLocalStorage(projectList);


if(projectList.length === 0) {
    let inboxTest = new Project("Inbox");
    projectList.push(inboxTest);
} else {
    DOMhandler.renderExistingProject(projectList[0].name);
    DOMhandler.renderExistingTasksFromProject(projectList[0].tasks, serializeProjectList, projectList);
}


