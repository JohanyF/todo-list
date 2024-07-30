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

    checkBtn = document.querySelector(".submit-project-btn");
    cancelProjectBtn = document.querySelector(".cancel-project-btn");

    taskTitle = document.querySelector("#task");
    description = document.querySelector("#description");
    date = document.querySelector("#date");
    priority = document.querySelector("#priority");
    projects = document.querySelector("#projects");


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

    renderNewProject(projName, indexOfProject, projects) {
        const projectListElem = document.querySelector(".projects-list")

        const projectSection = document.createElement('li');
        projectSection.textContent = projName;
        projectSection.classList.add("project-section")
        projectSection.setAttribute("data-project", indexOfProject);

        projectSection.addEventListener("click", () => {
            console.log(projects[indexOfProject]);
            console.log(projectSection);
            // call renderExistingTasksFromProject();
        })

        const HamburgerIcon = new Image();
        HamburgerIcon.src = HamburgerMenuIcon;
        HamburgerIcon.classList.add("icons-24");

        projectSection.prepend(HamburgerIcon);

        projectListElem.appendChild(projectSection);

    }

    // Method will render any of the exisiting tasks within a project
    renderExistingTasksFromProject() {
        // const projectSection = document.querySelectorAll('.project-section');
        // projectSection.forEach((section) => {
        //     section.addEventListener("click", () => {
        //         console.log(section);
        //         console.log("rendering tasks.... if there is any....");

        //     })
        // })
    }

}