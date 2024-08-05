
import Task from './task.js';

export default class Project {
    #tasks = []
    constructor(name) {
        this._name = name;
    }

    get tasks() {
        return this.#tasks;
    }

    get name() {
        return this._name;
    }


    addTask(title, description, date, priority, project) {
        let task = new Task(title, description, date, priority, project);
        this.#tasks.push(task);
        // console.log(this.#tasks);
    }

    printTasks() {
        this.#tasks.forEach((task) => {
            console.log(`${task.title} | ${task.description} | ${task.date} | ${task.priority} | ${task.project}`);
        })
    }


    // edit() {

    // }

    // delete() {

    // }



    // I think project class will include what the functionality of the Inbox, Today, and Upcoming tabs will do... Might have to make it its own file where you import this class???
    // Note: This will not involve any code that makes changes to the DOM that will be in another file that should do that
}