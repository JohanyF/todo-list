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

    // inboxSection = document.querySelector("#inbox");

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
        return this._projextTitleText;
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

    renderNewTask(t, index) {
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
        // taskTitle.textContent = this.taskTitle.value;
        taskTitle.textContent = t[index].title;

        const taskDescription = document.createElement('p');
        taskDescription.classList.add('description');
        // taskDescription.textContent = this.description.value;
        taskDescription.textContent = t[index].description;

        taskInfo.appendChild(taskTitle);
        taskInfo.appendChild(taskDescription);

        task.appendChild(taskInfo);

        const taskDateContainer = document.createElement("div");
        taskDateContainer.classList.add('task-date');

        const taskDate = document.createElement('p');
        taskDate.classList.add("date");
        // taskDate.textContent = this.date.value;
        taskDate.textContent = t[index].date;

        taskDateContainer.appendChild(taskDate);

        task.appendChild(taskDateContainer);

        const taskIcons = document.createElement('div');
        taskIcons.classList.add('task-icons')

        const edit = document.createElement('div');
        edit.setAttribute('id', 'edit');

        const editIcon = new Image();
        editIcon.src = Edit;

        edit.appendChild(editIcon);

        edit.addEventListener("click", () => {
            this.editTaskInfo(t[index], task);

        })


        const deleteDiv = document.createElement('div');

        const deleteIcon = new Image();
        deleteIcon.src = Delete;

        deleteDiv.appendChild(deleteIcon);

        deleteDiv.addEventListener("click", () => {
            t.splice(index, 1);
            this.removeTask(task)
            this.updateDataTask(t);

        })


        taskIcons.appendChild(edit);
        taskIcons.appendChild(deleteDiv);

        task.appendChild(taskIcons);

        tasksContainer.appendChild(task);

        if(t[index].priority === 'low') {
            task.classList.add("low");
        } else if(t[index].priority === 'medium') {
            task.classList.add("medium");
        } else if(t[index].priority === 'high') {
            task.classList.add("high");
        }

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


        if(everyProjectSection.length === 1) {
            // this.switchSelectedProject(projectSection, everyProjectSection);
            this.switchSelectedProject(projectSection);
            projectSection.classList.add("selected");
        } else {
            // this.switchSelectedProject(projectSection, everyProjectSection);
            this.switchSelectedProject(projectSection);
        }

        const tasksContaier = document.querySelector(".tasks-container");
        this.removeChildrenElementsFromParentElem(tasksContaier);
        
        
        projectSection.addEventListener("click", (event) => {

            const everyProjectSection = document.querySelectorAll(".project-section");
            // this.switchSelectedProject(event.target, everyProjectSection);
            this.switchSelectedProject(event.target);
            this.removeChildrenElementsFromParentElem(tasksContaier);

            this.renderExistingProject(projName);


            let currentProjectIndex = 0;
            projects.forEach((project, index=0) => {
                if(project.name === event.target.textContent) {
                    currentProjectIndex = index;

                }
                index++;
            })

            this.renderExistingTasksFromProject(projects[currentProjectIndex].tasks);
        })
    }

    renderExistingTasksFromProject(selectedProjectTasks) {
        for(let i = 0; i < selectedProjectTasks.length; i++) {
            this.renderNewTask(selectedProjectTasks, i);
        }
    }

    renderExistingProject(projName) {
        const projectTitleText = document.querySelector(".projectTitleText");
        projectTitleText.textContent= projName;
    }

    switchSelectedProject(selectedProj) {
        let unselectProj;

        const everyProjectSection = document.querySelectorAll(".project-section");
        const taskFilter = document.querySelectorAll(".section");
        taskFilter.forEach((section) => {
            if(section.classList.contains('selected')) {
                unselectProj = section;
            }
        })

        everyProjectSection.forEach((project) => {
            if(project.classList.contains('selected')) {
                unselectProj = project;
            }
        })
        
        if(unselectProj === null) {
            return;
        }
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

    addEventListenersToInbox(projectList) {
        const inboxSection = document.querySelector("#inbox");
        inboxSection.addEventListener("click", (event) => {
            const tasksContaier = document.querySelector(".tasks-container");

            this.switchSelectedProject(event.target);

            this.removeChildrenElementsFromParentElem(tasksContaier);

            this.renderExistingProject("Inbox");

            this.renderExistingTasksFromProject(projectList[0].tasks);
            
        })
    }

    addEventListenersToToday(projectList, todayDate) {
        const todaySection = document.querySelector("#today");
        todaySection.addEventListener("click", (event) => {
            let todayTasks = [];
            const tasksContaier = document.querySelector(".tasks-container");

            this.switchSelectedProject(event.target);

            this.removeChildrenElementsFromParentElem(tasksContaier);

            this.renderExistingProject("Today");

            projectList.forEach((project) => {
                let index = 0;
                project.tasks.forEach((task) => {
                    if(task.date === todayDate) {
                        this.renderNewTask(project.tasks, index);
                    }
                    index++;
                })

            })
        })
    }

    addEventListenersToUpcoming(projectList, todayDate) {
        const upcomingSection = document.querySelector("#upcoming");
        upcomingSection.addEventListener("click", (event) => {
            let upcomingTasks = [];
            const tasksContaier = document.querySelector(".tasks-container");

            this.switchSelectedProject(event.target);

            this.removeChildrenElementsFromParentElem(tasksContaier);

            this.renderExistingProject("Upcoming");
            
            projectList.forEach((project) => {
                let index = 0;
                project.tasks.forEach((task) => {
                    if(task.date > todayDate) {
                        this.renderNewTask(project.tasks, index);
                        upcomingTasks.push(task);
                    }
                    index++;
                })

            })
        })
    }

    editTaskInfo(taskInfo, selectedTask) {
        const editTaskForm = document.querySelector("#edit-task-modal")

        editTaskForm.showModal();

        const inputTask = document.querySelector("#edit-task");
        const inputDescription = document.querySelector("#edit-description");
        const inputDate = document.querySelector("#edit-date");
        const inputPriority = document.querySelector("#edit-priority");

        inputTask.value = taskInfo.title
        inputDescription.value = taskInfo.description
        inputDate.value = taskInfo.date
        inputPriority.value = taskInfo.priority

        const saveBtn = document.querySelector(".save-btn");
        // cloning the button allows the new node to not have any event listeners that were orinally attached to the button. 
        // This is used to "reset" the element and not let any old event listeners from causing unexpected behavior like multiple clicks
        const newSaveBtn = saveBtn.cloneNode(true);
        saveBtn.parentNode.replaceChild(newSaveBtn, saveBtn);

        const editCancelBtn = document.querySelector(".edit-cancel-btn");
        const newEditCancelBtn = editCancelBtn.cloneNode(true);
        editCancelBtn.parentNode.replaceChild(newEditCancelBtn, editCancelBtn);


        newSaveBtn.addEventListener("click", (event) => {
            event.preventDefault();

            // updates the title, description, date, and priority of the given task 
            taskInfo.title = inputTask.value
            taskInfo.description = inputDescription.value
            taskInfo.date = inputDate.value
            taskInfo.priority = inputPriority.value

            this.updateTextContentFromTask(taskInfo, selectedTask);
            editTaskForm.close();
        })

        newEditCancelBtn.addEventListener("click", (event) => {
            event.preventDefault();
            editTaskForm.close();
        })
    }

    updateTextContentFromTask(taskInfo, selectedTask) {

        selectedTask.classList.remove(selectedTask.classList[1]);
        
        selectedTask.children[1].children[0].textContent = taskInfo.title;
        selectedTask.children[1].children[1].textContent = taskInfo.description;
        selectedTask.children[2].children[0].textContent = taskInfo.date;


        if(taskInfo.priority === 'low') {
            selectedTask.classList.add("low");
        } else if(taskInfo.priority === 'medium') {
            selectedTask.classList.add("medium");
        } else if(taskInfo.priority === 'high') {
            selectedTask.classList.add("high");
        }
    }

    removeTask(selectedTask) {
        selectedTask.remove();
    }

    updateDataTask(taskList) {
        const task = document.querySelectorAll(".task")
        for(let i = 0; i <  taskList.length; i++) {
            task[i].setAttribute('data-task', i);
        }
    }

}