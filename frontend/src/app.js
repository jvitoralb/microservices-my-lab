const exerciseForm = document.querySelector('#exercise-form');
const logsForm = document.querySelector('#logs-form');
const dateInput = document.querySelector('#exercise-date');
const exerciseUserID = document.querySelector('#user-id');
const logsUserID = document.querySelector('#logs-id');

const handleFormAction = (form, input, path) => {
    const { value } = input;
    form.action = `/exercise-tracker/api/users/${value}/${path}`;
    form.submit();
}

const main = () => {
    let today = new Date().toISOString().slice(0, 10);
    dateInput.setAttribute('placeholder', today);
    logsForm.addEventListener('submit', () => handleFormAction(logsForm, logsUserID, 'logs'));
    exerciseForm.addEventListener('submit', () => handleFormAction(exerciseForm, exerciseUserID, 'exercises'));
}

main();