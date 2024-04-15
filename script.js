document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close');
    const tooltipIcon = document.getElementById('tooltipIcon');
    const tooltip = document.getElementById('tooltip');
    const tooltip1 = document.getElementById('tooltip1');
    const tooltip2 = document.getElementById('tooltip2');
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const grossIncome = parseFloat(document.getElementById('grossIncome').value);
        const extraIncome = parseFloat(document.getElementById('extraIncome').value);
        const age = document.getElementById('age').value;
        const deductions = parseFloat(document.getElementById('deductions').value);

        // Validate inputs
        const errors = validateInputs(grossIncome, extraIncome, age, deductions);
        if (errors.length > 0) {
            displayErrors(errors);
            return;
        }

        // Calculate tax
        const tax = calculateTax(grossIncome, extraIncome, age, deductions);

        // Calculate remaining salary
        const remainingSalary = (grossIncome + extraIncome) - (tax + deductions);

        // Display result
        document.getElementById('taxResult').textContent = `Your remaining salary after tax and deductions is ${remainingSalary.toFixed(2)}`;
        modal.style.display = 'block';
    });

    closeButton.onclick = function () {
        modal.style.display = 'none';
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }

    // Show tooltip when hovering over the tooltip icon
    tooltipIcon.addEventListener('mouseenter', function() {
        tooltip.style.display = 'block';
    });

    tooltipIcon.addEventListener('mouseleave', function() {
        tooltip.style.display = 'none';
    });

    grossIncomeInput.addEventListener('input', function(event) {
        const inputValue = event.target.value;
        const hasNonNumeric = /[^\d]/.test(inputValue); // Check for non-numeric characters
        if (hasNonNumeric) {
            tooltipIcon.style.display = 'block';
        } else {
            tooltipIcon.style.display = 'none';
        }
    });


    tooltipIcon1.addEventListener('mouseenter', function() {
        tooltip1.style.display = 'block';
    });

    tooltipIcon1.addEventListener('mouseleave', function() {
        tooltip1.style.display = 'none';
    });

    extraIncomeInput.addEventListener('input', function(event) {
        const inputValue1 = event.target.value;
        const hasNonNumeric = /[^\d]/.test(inputValue1); // Check for non-numeric characters
        if (hasNonNumeric) {
            tooltipIcon1.style.display = 'block';
        } else {
            tooltipIcon1.style.display = 'none';
        }
    });



    tooltipIcon2.addEventListener('mouseenter', function() {
        tooltip2.style.display = 'block';
    });

    tooltipIcon2.addEventListener('mouseleave', function() {
        tooltip2.style.display = 'none';
    });

    deductionsInput.addEventListener('input', function(event) {
        const inputValue2 = event.target.value;
        const hasNonNumeric = /[^\d]/.test(inputValue2); // Check for non-numeric characters
        if (hasNonNumeric) {
            tooltipIcon2.style.display = 'block';
        } else {
            tooltipIcon2.style.display = 'none';
        }
    });


    function validateInputs(grossIncome, extraIncome, age, deductions) {
        const errors = [];
        if (isNaN(grossIncome) || grossIncome < 0) {
            errors.push("Gross Annual Income must be a positive number");
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            errors.push("Extra Income must be a positive number");
        }
        if (isNaN(deductions) || deductions < 0) {
            errors.push("Total Applicable Deductions must be a positive number");
        }
        if (age === "") {
            errors.push("Age Group is required");
        }
        return errors;
    }

    function displayErrors(errors) {
        const errorFields = ['grossIncome', 'extraIncome', 'deductions', 'age'];
        errorFields.forEach(field => {
            const errorIcon = document.getElementById(`${field}Error`);
            errorIcon.style.display = 'none';
        });
        errors.forEach(error => {
            const fieldWithError = error.split(" ")[0].toLowerCase();
            const errorIcon = document.getElementById(`${fieldWithError}Error`);
            errorIcon.style.display = 'block';
            errorIcon.setAttribute('title', error);
        });
    }

    function calculateTax(grossIncome, extraIncome, age, deductions) {
        const totalIncome = grossIncome + extraIncome;
        let tax = 0;
        if (totalIncome > 800000) {
            if (age === '<40') {
                tax = 0.3 * (totalIncome - 800000);
            } else if (age === '>=40 & <60') {
                tax = 0.4 * (totalIncome - 800000);
            } else if (age === '>=60') {
                tax = 0.1 * (totalIncome - 800000);
            }
        }
        return tax.toFixed(2);
    }
});
 