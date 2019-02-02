class Task {
    constructor(name, dueDate, scheduledDate, complete) {
        this.name = name;
        this.dueDate = dueDate;
        this.scheduledDate = scheduledDate;
        this.complete = complete;
    }
}

class Project {
    constructor(name, tasks) {
        this.name = name;
        this.tasks = tasks;
    }
}

function newDummyProject(name, numTasks) {
    let newTasks = [];
    for (var i = 0; i < numTasks; ++i) {
        let taskName = ` ${name.split(' ')[0]} ${i}`;
        let dueDate = new Date().addDays(1 + i);
        let scheduledDate = new Date().addDays(i);
        let complete = Math.random() > 0.5;
        newTasks.push(new Task(taskName, dueDate, scheduledDate, complete));
    }

    return new Project(name, newTasks);
}

let allProjects = {
    "english": newDummyProject("English 316", 12),
    "math": newDummyProject("Math 313", 15),
    "web": new newDummyProject("CS 260", 5)
}