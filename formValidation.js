document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const commentsCount = document.getElementById('comments-count');
    const formErrorsInput = document.getElementById('form-errors');

    const form_errors = [];

    const patterns = {
        name: /^[A-Za-z\s]+(?:\s+[A-Za-z]+)*$/,
        comments: /^[A-Za-z0-9\s.,!?;#$%@&*()-_=:"']*$/
    };

    function showErrorMessage(input, message) {
        const errorOutput = document.getElementById(`${input.id}-error`);
        errorOutput.innerHTML = `<br>${message}`;
        errorOutput.classList.add('visible');
        input.classList.add('input-error');

        // log error
        logError(input.id, message);
        
        // remove error after 2 seconds
        setTimeout(() => {
            errorOutput.classList.remove('visible');
            input.classList.remove('input-error');
        }, 2000);
    }

    function clearErrorMessage(input) {
        const errorOutput = document.getElementById(`${input.id}-error`);
        errorOutput.textContent = '';
        input.classList.remove('input-error');
    }

    function maskInput(event) {
        const input = event.target;
        const pattern = patterns[input.id];
        if (pattern && !pattern.test(input.value)) {
            showErrorMessage(input, "Illegal character entered.");
        } else {
            clearErrorMessage(input); // clears error message if input is now valid
        }
    }

    function logError(field, message) {
        const timestamp = new Date().toISOString();
        form_errors.push({
            field: field,
            message: message,
            timestamp: timestamp
        });
        console.log(`Error Logged: ${field} - ${message} at ${timestamp}`);
    }

    function validateField(input) {
        let message = "";
        if (input.validity.valueMissing) {
            message = "This field is required.";
            input.setCustomValidity(message);
            logError(input.id, message);
        } else if (input.validity.tooShort) {
            message = "Input is too short.";
            input.setCustomValidity();
            logError(input.id, message);
        } else if (input.validity.tooLong) {
            message = "Input is too long.";
            input.setCustomValidity(message);
            logError(input.id, message);
        } else if (input.validity.patternMismatch) {
            message = "Invalid characters used.";
            input.setCustomValidity(message);
            logError(input.id, message);
        } else {
            input.setCustomValidity("");
        }
        input.reportValidity();
    }

    function updateCharacterCount() {
        const maxLength = commentsInput.getAttribute('maxlength');
        const currentLength = commentsInput.value.length;
        const remaining = maxLength - currentLength;

        commentsCount.textContent = `${remaining} characters remaining`;

        // change color depending on limit
        if (remaining <= 50 && remaining > 20) {
            commentsCount.classList.add('warning');
            commentsCount.classList.remove('error');
            console.log(commentsCount.classList);
        } else if (remaining <= 20) {
            commentsCount.classList.add('error');
            commentsCount.classList.remove('warning');
        } else {
            commentsCount.classList.remove('warning', 'error');
        }
    }

    // event listeners
    nameInput.addEventListener('input', (event) => {
        validateField(event.target);
        maskInput(event);
    });

    emailInput.addEventListener('input', (event) => {
        validateField(event.target);
    });

    commentsInput.addEventListener('input', (event) => {
        maskInput(event);
        updateCharacterCount();
    });

    // final validation on submit
    form.addEventListener('submit', function (event) {
        form_errors.length = 0;

        validateField(nameInput);
        validateField(emailInput);
        validateField(commentsInput);

        if (form_errors.length > 0) {
            formErrorsInput.value = JSON.stringify(form_errors);
        } else {
            formErrorsInput.value = ""; // clears field if no errors
        }

        if (!form.checkValidity()) {
            event.preventDefault();
        }
    });

    // initial
    updateCharacterCount();
});