import './assets/style.css';

const Data = (() => {
    const projectList = [];

    const addProject = (title) => {
        let project = new Project(title);
        projectList.push(project);
    };

    return {projectList, addProject};
})();

class Todo {
    constructor(title, description, dueDate) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
    }

    toText() {
        return `${this.title}: due ${this.dueDate}. `;
    }
}

class Project {
    constructor(title) {
        this.title = title;
        this.todoList = [];
    }

    set title(title) {
        this._title = title;
    }
    get title() {
        return this._title;
    }
    set todoList(todoList) {
        this._todoList = todoList;
    }
    get todoList() {
        return this._todoList;
    }

    addTodo(todo) {
        this.todoList.push(todo);
        return this.todoList;
    }
}

class ProjectElement {
    constructor(project) {
        this.project = project;
        this.projectElement = this.projectElement(project);
    }

    get projectElement() {
        return this._projectElement;
    }

    projectElement(project) {
        let element = document.createElement('li');
        element.textContent = this.project.title;
        return element;
    }
}

const DisplayHandler = (() => {
    const projectList = Data.projectList;

    const displayProjects = () => {
        const oldContent = document.querySelector('div#content');
        const newContent = oldContent.cloneNode(false);
        const ul = document.createElement('ul');
        projectList.forEach(element => {
            let li = new ProjectElement(element);
            li = li.projectElement;
            li.addEventListener('click', (e)=>{
                renderProjectPage(element);
            });
            ul.appendChild(li);
        });
        newContent.appendChild(ul);
        replaceContent(oldContent, newContent);
    };

    const displayProjectForm = () => {
        const content = document.querySelector('div#content');
        let f = new newProjectForm()
        f = f.form;
        content.appendChild(f);
    };

    const renderProjectPage = (project) => {
        const oldContent = document.querySelector('div#content');
        const newContent = document.createElement('div');
        newContent.id = 'content';

        let ul = document.createElement('ul');
        const todoList = project.todoList;
        todoList.forEach(element => {
            let li = document.createElement('li');
            li.textContent = element.toText();
            ul.appendChild(li);
        });
        newContent.appendChild(ul);
        replaceContent(oldContent, newContent);
        displayTodoForm(project);
    };

    const displayTodoForm = (project) => {
        console.log('displaying todo form');
        let f = new newTodoForm(project);
        console.log(f.form);
        f = f.form;
        const content = document.querySelector('div#content');
        content.appendChild(f);
    }

    const replaceContent = (oldContent, newContent) => {
        oldContent.replaceWith(newContent);
    }

    return {displayProjects, displayProjectForm, renderProjectPage, displayTodoForm};
})();

class newProjectForm {
    constructor() {
        this.form = this.generateForm();
    }

    get form() {
        return this._form;
    }
    set form(form) {
        this._form = form;
    }

    generateForm() {
        //create form
        const form = document.createElement('form');
        form.setAttribute("method", "post");
        form.setAttribute("action", "submit.php");

        //create input element for project title
        let TITLE = document.createElement("input");
        TITLE.setAttribute('type', 'text');
        TITLE.setAttribute('name', 'title');
        TITLE.setAttribute('placeholder', 'Project title: ');

        //create a submit button
        let s = document.createElement('input');
        s.setAttribute('type', 'button');
        s.setAttribute('name', 'button');
        s.setAttribute('value', "Submit");
        s.addEventListener('click', function(e) {
            Data.addProject(this.form.title.value);
            DisplayHandler.displayProjects();
            DisplayHandler.displayProjectForm();
        });

        //append elements to form
        form.append(TITLE);
        form.append(s);

        return form;
    }
}

class newTodoForm {
    constructor(project) {
        this.project = project;
        this.form = this.generateForm(this.project);
    }

    get form() {
        return this._form;
    }
    set form(form) {
        this._form = form;
    }

    get project() {
        return this._project;
    }
    set project(project) {
        this._project = project;
    }

    generateForm(project) {
        console.log('generating form');
        //console.log(this.project.title);
        //create form
        let form = document.createElement('form');
        form.setAttribute("method", "post");
        form.setAttribute("action", "submit.php");
        //create input element for todo title
        let TITLE = document.createElement("input");
        TITLE.setAttribute('type', 'text');
        TITLE.setAttribute('name', 'title');
        TITLE.setAttribute('placeholder', 'Item title: ');

        //create input element for todo description
        let DESC = document.createElement("input");
        DESC.setAttribute('type', 'text');
        DESC.setAttribute('name', 'description');
        DESC.setAttribute('placeholder', 'Item description: ');

        //create input element for todo due date
        let DUE = document.createElement("input");
        DUE.setAttribute('type', 'date');
        DUE.setAttribute('name', 'due');
        DUE.setAttribute('placeholder', 'Due date: ');

        //create a submit button
        let s = document.createElement('input');
        s.setAttribute('type', 'button');
        s.setAttribute('name', 'button');
        s.setAttribute('value', "Submit");
        s.addEventListener('click', function(e) {
            let todo = new Todo(this.form.title.value, this.form.description.value, this.form.due.value);
            project.addTodo(todo);
            DisplayHandler.renderProjectPage(project);
        }); 

        //append elements to form
        form.appendChild(TITLE);
        form.appendChild(DESC);
        form.appendChild(DUE);
        form.appendChild(s);
        return form;
    }

    toTextRep() {
        console.log(`${this.form.textContent}`);
        console.log(`${this.project.title}`);
    }
}

Data.addProject('Third Project');
Data.addProject('Fourth Project');

DisplayHandler.displayProjects();
DisplayHandler.displayProjectForm();
