function initializeClassView() {
    let classKey = document.querySelector(".class-container").dataset.class;
    var classData = undefined;
    if (classKey = "all") {
        classData = new Project("All Tasks", []);
        Object.values(allProjects).reduce((acc, next) => classData.tasks  = classData.tasks.concat(next.tasks));
    } else {
        classData = allProjects[classKey];
    }
    loadClass(classData);
}

function wrapFlexChild(children) {
    let wrapper = document.createElement("div");
    wrapper.classList.add("entry-slot");
    if (Array.isArray(children)) {
        for (var child of children) {
            wrapper.appendChild(child);
        }
    } else {
        wrapper.appendChild(children);
    }
    return wrapper;
}

function createTaskEntry(task, classList) {
    let taskEntry = document.createElement("tr");

    if (!Array.isArray(classList)) {
        classList = [classList];
    }

    for (var item of classList) {
        taskEntry.classList.add(item);
    }

    if (task.complete) {
        taskEntry.classList.add("complete");
    }

    let taskCompleted = document.createElement("td");
    if (task.complete) {
        taskCompleted.appendChild(document.createTextNode("Yes"));
    }
    else {
        taskCompleted.appendChild(document.createTextNode("No"));
    }

    let taskTitle = document.createElement("td");
    taskTitle.appendChild(document.createTextNode(task.name));
    let taskDueDate = document.createElement("td");
    taskDueDate.appendChild(document.createTextNode(task.dueDate.toDateString()));

    let taskScheduledDate = document.createElement("td");
    if (task.scheduledDate != undefined) {
        taskScheduledDate.appendChild(document.createTextNode(task.scheduledDate.toDateString()));
    }


    taskEntry.appendChild(taskCompleted);
    taskEntry.appendChild(taskTitle);
    taskEntry.appendChild(taskDueDate);
    taskEntry.appendChild(taskScheduledDate);

    return taskEntry;
}

function createDayHeader(dayNumber) {
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayText= days[dayNumber];

    let entry = document.createElement("tr");
    entry.classList.add("day-header");
    let heading = document.createElement("td");
    heading.setAttribute("colspan", 4);
    heading.innerHTML = "<strong>" + dayText + "</strong>";
    entry.appendChild(heading);
    return entry;
}

function loadClass(classData) {
    let tasks = classData.tasks;
    let soon = tasks.filter((t) => t.scheduledDate < new Date().addDays(7));

    document.querySelector(".class-label").innerText = classData.name;

    let soonArea = document.querySelector(".upcoming-area");
    soon = soon.groupBy((t) => t.scheduledDate.getDay());

    for (var day of soon) {
        soonArea.appendChild(createDayHeader(day.first));
        for (var task of day.group) {
            let taskEntry = createTaskEntry(task, "scheduled-entry");
            soonArea.appendChild(taskEntry);
        }
    }

    let allArea = document.querySelector(".all-tasks-area");
    for (var task of tasks) {
        let taskEntry = createTaskEntry(task, "total-entry");
        allArea.appendChild(taskEntry);
    }
}


window.onload = initializeClassView;