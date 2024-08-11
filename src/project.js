
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
}