
export default class Task {
    constructor(title, description, date, priority, project, isChecked) {
        this._title = title;
        this._description = description;
        this._date = date;
        this._priority = priority;
        this._project = project;
        this._isChecked = isChecked;
    }

    get title() {
        return this._title;
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

    get project() {
        return this._project;
    }

    get isChecked() {
        return this._isChecked;
    }

    set title(title) {
        this._title = title;
    }

    set description(description) {
        this._description = description;
    }
    set date(date) {
        this._date = date;
    }
    set priority(priority) {
        this._priority = priority;
    }
    set project(project) {
        this._project = project;
    }

    set isChecked(isChecked) {
        this._isChecked = isChecked;
    }

    serialize() {
        return JSON.stringify({
            title: this.title,
            description: this.description,
            date: this.date,
            priority: this.priority,
            project: this.project,
            isChecked: this.isChecked
        });
    }

    static deserialize(jsonString) {
        const data = JSON.parse(jsonString);
        return new Task(data.title, data.description, data.date, data.priority, data.project, data.isChecked);
    }
}