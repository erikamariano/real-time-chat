const workspace = window.location.pathname.replace(/\//g, '');
const socket = io(`http://localhost:3000/${workspace}`);

let user = null;

socket.on('update_msg', (messages) => {
    updateMessagesOnScreen(messages);
})

function updateMessagesOnScreen(messages){
    const div_messages = document.querySelector('#messages');

    let list_messages = '<ul>'
    messages.forEach(element => {
        list_messages += `<li>${element.user}: ${element.msg}</li>`
    });

    list_messages += '</ul>'

    div_messages.innerHTML = list_messages;
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#message_form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();

        if(!user){
            alert('Please insert a username');
            return;
        }

        const message = document.forms['message_form_name']['msg'].value;
        console.log(message)
        document.forms['message_form_name']['msg'].value = '';

        socket.emit('event_new_msg', {user: user, msg:message})
        console.log(message);
    })

    const userForm = document.querySelector('#user_form');
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        user = document.forms['user_form_name']['user'].value;
        console.log(user)
        userForm.parentNode.removeChild(userForm);

    })
})