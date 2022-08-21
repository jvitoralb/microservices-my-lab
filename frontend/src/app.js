const exerciseForm = document.querySelector('#exercise-form');
const logsForm = document.querySelector('#logs-form');
const dateInput = document.querySelector('#exercise-date');
const exerciseUserID = document.querySelector('#user-id');
const logsUserID = document.querySelector('#logs-id');

const setFormAction = (form, input, path) => {
    const { value } = input;
    form.action = `/exercise-tracker/api/users/${value}/${path}`;
    form.submit();
}

const main = () => {
    let today = new Date().toISOString().slice(0, 10);
    dateInput.setAttribute('placeholder', today);
    logsForm.addEventListener('submit', () => setFormAction(logsForm, logsUserID, 'logs'));
    exerciseForm.addEventListener('submit', () => setFormAction(exerciseForm, exerciseUserID, 'exercises'));
}

main();