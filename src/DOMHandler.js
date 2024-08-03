import HamburgerMenuIcon from './img/hamburger-icon.svg';
import Inbox from './img/inbox-icon.svg';
import Date from './img/date-icon.svg';
import Add from './img/add-icon.svg';
import Edit from './img/edit-icon.svg';
import Delete from './img/delete-icon.svg';
import Check from './img/check-icon.svg';
import Cancel from './img/cancel-icon.svg';


export default class DOMHandler {
    taskModal = document.querySelector("#task-modal");
    addBtn = document.querySelector(".add-task");
    cancelBtn = document.querySelector(".cancel-btn");
    submitBtn = document.querySelector(".submit-btn")
    addProjectBtn = document.querySelector("#project-add");
    projectForm = document.querySelector(".none");
    projectName = document.querySelector("#add-project");

    inboxSection = document.querySelector("#inbox");
    todaySection = document.querySelector("#today");
    upcomingSection = document.querySelector("#upcoming");

    checkBtn = document.querySelector(".submit-project-btn");
    cancelProjectBtn = document.querySelector(".cancel-project-btn");

    taskTitle = document.querySelector("#task");
    description = document.querySelector("#description");
    date = document.querySelector("#date");
    priority = document.querySelector("#priority");
    projects = document.querySelector("#projects");

    projectTitleText = document.querySelector(".projectTitleText");


    get taskModal() {
        return this._taskModal;
    }

    get addBtn() {
        return this._addBtn;
    }

    get addProjectBtn() {
        return this._addProjectBtn;
    }

    get projectForm() {
        return this._projectForm;
    }

    get checkBtn() {
        return this._checkBtn;
    }

    get cancelProjectBtn() {
        return this._cancelProjectBtn;
    }


    get cancelBtn() {
        return this._cancelBtn;
    }

    get submitBtn() {
        return this._submitBtn;
    }

    get taskTitle() {
        return this._taskTitle;
    }
    
    get description() {
        return this._description;
    }
    get date() {
        return this._date;
    }
    get priority() {
        return this._priority;
    }
    get projects() {
        return this._projects;
    }

    get projectName() {
        return this._projectName;
    }

    get projectTitleText() {
        return this._projextTitleText
    }


    loadSVGs() {
        const hamContainer = document.querySelector(".hamburger-icon");

        const HamburgerIcon = new Image();
        HamburgerIcon.src = HamburgerMenuIcon;
        HamburgerIcon.classList.add("hamburgerIcon");

        hamContainer.appendChild(HamburgerIcon);

        const inbox = document.querySelector("#inbox");

        const inboxIcon = new Image();
        inboxIcon.src = Inbox;
        inboxIcon.classList.add("icons");

        inbox.prepend(inboxIcon);

        const today = document.querySelector("#today");
        const upcoming = document.querySelector("#upcoming");

        const dateIcon = new Image();
        dateIcon.src = Date;
        dateIcon.classList.add("icons");

        today.prepend(dateIcon);

        const upcomingIcon = new Image();
        upcomingIcon.src = Date;
        upcomingIcon.classList.add("icons");

        upcoming.prepend(upcomingIcon);

        // const projectIcons = document.querySelector(".project-icons");

        const checkBtn = document.querySelector(".submit-project-btn");
        const cancelProjectBtn = document.querySelector(".cancel-project-btn");

        const checkIcon = new Image();
        checkIcon.src = Check;
        checkIcon.classList.add("icons-24");

        const cancelIcon = new Image();
        cancelIcon.src = Cancel;
        cancelIcon.classList.add("icons-24");

        checkBtn.appendChild(checkIcon);
        cancelProjectBtn.appendChild(cancelIcon);

        const addProjectBtn = document.querySelector("#project-add");

        const addIcon = new Image();
        addIcon.src = Add;
        addIcon.classList.add("addIcon")

        addProjectBtn.prepend(addIcon);
    }

    renderNewTask(index) {
        const tasksContainer = document.querySelector(".tasks-container");

        const task = document.createElement("div")
        task.classList.add("task");
        // task.setAttribute('id', index);
        task.setAttribute('data-task', index);

        const checkboxContainer = document.createElement("div");
        checkboxContainer.classList.add("checkbox");

        const checkbox = document.createElement("input");
        checkbox.type = 'checkbox';
        checkbox.name = 'task-completed';
        checkbox.id = 'task-completed';

        checkboxContainer.appendChild(checkbox);

        task.appendChild(checkboxContainer);

        const taskInfo = document.createElement("div");
        taskInfo.classList.add('task-info');

        const taskTitle = document.createElement('p');
        taskTitle.classList.add('title');
        taskTitle.textContent = this.taskTitle.value;

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('description');
        taskDescription.textContent = this.description.value;

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);

        task.appendChild(taskInfo);

        const taskDateContainer = document.createElement("div");
        taskDateContainer.classList.add('task-date');

        const taskDate = document.createElement('p');
        taskDate.textContent = this.date.value;

        taskDateContainer.appendChild(taskDate);

        task.appendChild(taskDateContainer);

        const taskIcons = document.createElement('div');
        taskIcons.classList.add('task-icons')

        const edit = document.createElement('div');
        edit.setAttribute('id', 'edit');

        const editIcon = new Image();
        editIcon.src = Edit;

        edit.appendChild(editIcon);

        const deleteDiv = document.createElement('div');

        const deleteIcon = new Image();
        deleteIcon.src = Delete;

        deleteDiv.appendChild(deleteIcon);

        taskIcons.appendChild(edit);
        taskIcons.appendChild(deleteDiv);

        task.appendChild(taskIcons);

        tasksContainer.appendChild(task);

        // TODO: Add class based on the priority value - Low, Medium, High

    }

    renderNewProject(projName, projects) {
        const projectTitleText = document.querySelector(".projectTitleText");
        projectTitleText.textContent= projName;
        const projectListElem = document.querySelector(".projects-list")

        const projectSection = document.createElement('li');
        projectSection.textContent = projName;
        projectSection.classList.add("project-section");
        projectSection.setAttribute("data-project", projects.length-1);
        
        const HamburgerIcon = new Image();
        HamburgerIcon.src = HamburgerMenuIcon;
        HamburgerIcon.classList.add("icons-24");
        
        projectSection.prepend(HamburgerIcon);
        
        projectListElem.appendChild(projectSection);
        
        const everyProjectSection = document.querySelectorAll(".project-section");
        console.log(everyProjectSection);


        if(everyProjectSection.length === 1) {
            projectSection.classList.add("selected");
        } else {
            this.switchSelectedProject(projectSection, everyProjectSection);
        }

        const tasksContaier = document.querySelector(".tasks-container");
        this.removeChildrenElementsFromParentElem(tasksContaier);
        
        
        projectSection.addEventListener("click", (event) => {

            const everyProjectSection = document.querySelectorAll(".project-section");
            this.switchSelectedProject(event.target, everyProjectSection);
            this.removeChildrenElementsFromParentElem(tasksContaier);

            this.renderExistingProject(projName);

            console.log(event.target);

            let currentProjectIndex = 0;
            projects.forEach((project, index=0) => {
                console.log(project.name);
                if(project.name === event.target.textContent) {
                    console.log("SI");
                    currentProjectIndex = index;

                }
                index++;
            })
            this.renderExistingTasksFromProject(projects[currentProjectIndex]);
        })
    }

    renderExistingTasksFromProject(selectedProj) {
        console.log("renderExistingTasksFromProject has been called!");
        console.log(selectedProj.tasks);
    }

    renderExistingProject(projName) {
        const projectTitleText = document.querySelector(".projectTitleText");
        projectTitleText.textContent= projName;
    }

    // removeTasksContainer() {
    //     const tasksContaier = document.querySelector(".tasks-container");
    //     tasksContaier.remove();


    //     const cotent = document.querySelector(".content");

    //     const container = document.createElement("div");
    //     container.classList.add("tasks-container");

    //     cotent.appendChild(container);
    // }

    switchSelectedProject(selectedProj, everyProjectSection) {
        let unselectProj;
        console.log(everyProjectSection);
        everyProjectSection.forEach((project) => {
            if(project.classList.contains('selected')) {
                unselectProj = project;
            }
        })
        unselectProj.classList.remove('selected');
        selectedProj.classList.add('selected');
    }

    // Method will render new select options for the select element based on how many projects have been created. 
    renderSelectOptions(projectListArr) {
        const select = document.querySelector("#projects");
        
        this.removeChildrenElementsFromParentElem(select);

        projectListArr.forEach((project) => {
            const option = document.createElement('option');
            option.textContent = project.name;
            option.value = project.name.toLowerCase();

            select.appendChild(option);
        })
    }

    removeChildrenElementsFromParentElem(parent) {
        while(parent.firstChild) {
            parent.removeChild(parent.firstChild);
        }
    }

}