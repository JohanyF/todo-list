
export default class Task {
    constructor(title, description, date, priority, project) {
        this._title = title;
        this._description = description;
        this._date = date;
        this._priority = priority;
        this._project = project;
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
}