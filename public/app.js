const windowAlert = (msj) => {
    alert(msj);
}

const renderPage = async () => {
    window.location.reload();
};

const add = async (event) => {
    event.preventDefault();
    const todoText = document.getElementById('todo-input').value;
    if (!todoText){
        windowAlert("Lütfen bir todo giriniz");
        return;
    }
    await fetch('/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: todoText })
    });
    renderPage();
};

const editMode = async (id) => {

    await fetch(`/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ isEditMode: true })
    });
    renderPage();
}

const editTodo = async (id) => {

    const todoText = document.getElementById(`edit${id}`).value
    if (todoText === "" || todoText === null || todoText === undefined || todoText.lenght < 1) {
        windowAlert("Lütfen bir todo giriniz");
        return;
    }
     await fetch(`/todos/${id}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ todo: todoText, isEditMode: false, isCompleted: false })
    });
    renderPage();
}

const toggleCompleted = async (id) => {

     await fetch(`/todos/${id}`, {
         method: 'PUT',
         headers: {
             'Content-Type': 'application/json'
         },
         body: JSON.stringify({ isCompleted: "x"})
    });
    renderPage();
}

const deleteTodo = async (id) => {
    await fetch(`/todos/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    renderPage();
}

const deleteCompletedTodos = async () => {
    await fetch(`/todos`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
    });

    renderPage();
}

