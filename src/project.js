
import Task from './task.js';

export default class Project {
    #tasks = []
    constructor(name) {
        this._name = name;
    }

    // Getter methods
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

    /*
     serializes the Project object into a JSON string and converts the Project instance into a plain object,
     serializes its tasks, and then into a JSON string

     The method returns a JSON string representation o f the Project instance
    */
    serialize() {
        return JSON.stringify({
            name: this._name,
            tasks: this.#tasks.map(task => task.serialize())
        });
    }

    /*
     Deserializes a JSON string into a Project object by taking a JSON string, parses it to extract the data, and
     creates a new Project instance with the extracted JSON data, including deserializing each task

     The method returns a new Project object constructed from the parsed data
    */
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