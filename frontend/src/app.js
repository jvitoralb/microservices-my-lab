const exerciseForm = document.querySelector('#create-exercise-form');
const exercisesLogs = document.querySelector('#exercises-logs');
const logsUserID = document.querySelector('#user-logs-id');
const formUserID = document.querySelector('#user-id');


exerciseForm.addEventListener('submit', (e) => {
    const { value } = formUserID;
    exerciseForm.action = `/exercise-tracker/api/users/${value}/exercises`;
    exerciseForm.submit();
});

exercisesLogs.addEventListener('submit', (e) => {
    const { value } = logsUserID;
    exercisesLogs.action = `/exercise-tracker/api/users/${value}/logs`;
    exerciseForm.submit();
});

/**
 *  Do the same for the get-logs-form
**/

/**
 *  Try to add Date placeholder || value to the current date
**/