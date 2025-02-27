document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const commentsInput = document.getElementById('comments');
    const commentsCount = document.getElementById('comments-count');

    const patterns = {
        name: /^[A-Za-z\s]*$/,
        comments: /^[A-Za-z0-9\s.,!?;#$%@&*()-_=:"']*$/
    };

    function showErrorMessage(input, message) {
        const errorOutput = document.getElementById(`${input.id}-error`);
        errorOutput.innerHTML = `<br>${message}`;
        errorOutput.classList.add('visible');
        input.classList.add('input-error');
        
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

    function validateField(input) {
        if (input.validity.valueMissing) {
            input.setCustomValidity("This field is required.");
        } else if (input.validity.tooShort) {
            input.setCustomValidity("Input is too short.");
        } else if (input.validity.tooLong) {
            input.setCustomValidity("Input is too long.");
        } else if (input.validity.patternMismatch) {
            input.setCustomValidity("Invalid characters used.");
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
        validateField(nameInput);
        validateField(emailInput);
        validateField(commentsInput);
        if (!form.checkValidity()) {
            event.preventDefault();
        }
    });

    // initial
    updateCharacterCount();
});