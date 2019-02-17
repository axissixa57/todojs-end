 // упаковка необходима чтобы не засорять глобальное пространство(глобальный объект, среду). Используется паттерн модуль, Immediately Invoked Function Expression (IIFE) - самовызывающаяся функция
 (document => {
    function createElement(tag, props, ...children) {
        const element = document.createElement(tag);
    
        //console.log(Object.keys(props)); // ["type", "className"];
        Object.keys(props).forEach(key => element[key] = props[key]); // for example, type => input.type = checkbox; 
        // key = свойство объекта, кот. идёт как параметр; element.type(у элемента задаём свойство) = props.type(значение свойства у переданного объекта); 
    
        if (children.length > 0) {
            children.forEach(child => {
                if (typeof child === 'string') {
                    child = document.createTextNode(child); // создаём DOM-узел из текста(объект)
                }
    
                element.appendChild(child); // appendChild принимает только объект, кот. является узлом(строку не добавит); к элементу(например label) добавляем атрибут title со значением
            });
        }
    
        return element;
    }
    
    function createTodoItem(title) {
        const checkbox = createElement('input', { type: 'checkbox', className: 'checkbox' }); 
        const label = createElement('label', { className: 'title' }, title);
        const editInput = createElement('input', { type: 'text', className: 'textfield' });
        const editButton = createElement('button', { className: 'edit' }, 'Изменить');
        const deleteButton = createElement('button', { className: 'delete' }, 'Удалить');
        const listItem = createElement('li', { className: 'todo-item' }, checkbox, label, editInput, editButton, deleteButton);
    
        bindEvents(listItem);
    
        return listItem;
    }
    
    function bindEvents(todoItem) {
        const checkbox = todoItem.querySelector('.checkbox'); // обращение по содержимому атрибута
        const editButton = todoItem.querySelector('button.edit');
        const deleteButton = todoItem.querySelector('button.delete');
    
        checkbox.addEventListener('change', toggleTodoItem);
        editButton.addEventListener('click', editTodoItem);
        deleteButton.addEventListener('click', deleteTodoItem);
    }
    
    function addTodoItem(event) {
        event.preventDefault(); // С помощью метода preventDefault() объекта Event мы можем остановить дальнейшее выполнение события. (отмена данных на сервер)
    
        if (addInput.value === '') {
            return alert('Необходимо ввести название задачи.');
        }
    
        const todoItem = createTodoItem(addInput.value); // создаётеся пункт списка li со значением в параметре
        todoList.appendChild(todoItem); // к ul добавляем созданный li 
        addInput.value = '';
    }
    
    function toggleTodoItem() {
        const listItem = this.parentNode; // this ссылается на элемент input(checkbox-a), this.parentNode - это li, в кот. содержится input
        //console.log(this.parentNode);
        listItem.classList.toggle('completed'); // добавляет или удаляет атрибут class у li
    }
    
    function editTodoItem() {
        const listItem = this.parentNode; // li
        const title = listItem.querySelector('.title');
        const editInput = listItem.querySelector('.textfield');
        const isEditing = listItem.classList.contains('editing'); // проверяем есть у li класс с атрибутом class = 'editing'
    
        if (isEditing) {
            title.innerText = editInput.value; // если true, то записываем значение из input в label 
            this.innerText = 'Изменить'; // this = button(edit), меням текст кнопки 
        } else {
            editInput.value = title.innerText; // в input вносится значение из label
            this.innerText = 'Сохранить'; // текст кнопки у button(edit) меняется
        }
    
        listItem.classList.toggle('editing'); // подставляем или убираем в class-е li значение в скобках
    }
    
    function deleteTodoItem() {
        const listItem = this.parentNode; // li текущий
        todoList.removeChild(listItem); // обращение к ul и с помощью метода removeChild удаляем пункт списка(li) 
    }
    
    const todoForm = document.getElementById('todo-form');
    const addInput = document.getElementById('add-input');
    const todoList = document.getElementById('todo-list');
    const todoItems = document.querySelectorAll('.todo-item');
    
    function main() {
        todoForm.addEventListener("submit", addTodoItem); // "submit" - событие отправки данных у формы(можно заменить на 'click'). при внесении данных вызывается метод addTodoItem()
        todoItems.forEach(item => bindEvents(item)); // к каждому элементу массива из li. эта запись необхадима если заранее прописаны li пункты и у них отсутствуют события на кнопки либо др.
    }
    
    main();       
 })(document);
 