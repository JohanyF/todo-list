
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


    addTask(title, description, date, priority, project, isChecked) {
        let task = new Task(title, description, date, priority, project, isChecked);
        this.#tasks.push(task);
    }

    // Rename the methods if you will like
    // Add comment that describes what this method does, will be helpful if you are looking back at your project
    serialize() {
        return JSON.stringify({
            name: this._name,
            tasks: this.#tasks.map(task => task.serialize())
        });
    }

    // Rename the methods if you will like
    // Add comment that describes what this method does, will be helpful if you are looking back at your project
    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        const project = new Project(data.name);


        data.tasks.forEach(taskData => {
            const task = Task.deserialize(taskData);
            project.#tasks.push(task);
        });

        return project;
    }
}