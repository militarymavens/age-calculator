document.addEventListener('DOMContentLoaded', function() {
    populateDays('dobDay');
    populateDays('calcDateDay');
    
    document.getElementById('calculateBtn').addEventListener('click', calculateAge);
    document.getElementById('clearBtn').addEventListener('click', clearAll);
    document.getElementById('todayDateCheckbox').addEventListener('change', handleCheckboxChange);
});

function populateDays(daySelectId) {
    const daySelect = document.getElementById(daySelectId);
    for (let i = 1; i <= 31; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        daySelect.appendChild(option);
    }
}

function calculateAge() {
    const dobMonth = parseInt(document.getElementById('dobMonth').value);
    const dobDay = parseInt(document.getElementById('dobDay').value);
    const dobYear = parseInt(document.getElementById('dobYear').value);

    const calcDateMonth = parseInt(document.getElementById('calcDateMonth').value);
    const calcDateDay = parseInt(document.getElementById('calcDateDay').value);
    const calcDateYear = parseInt(document.getElementById('calcDateYear').value);

    if (!dobMonth || !dobDay || !dobYear || !calcDateMonth || !calcDateDay || !calcDateYear) {
        alert('Please enter all date fields.');
        return;
    }

    const dob = new Date(dobYear, dobMonth, dobDay);
    const calcDate = new Date(calcDateYear, calcDateMonth, calcDateDay);

    if (isNaN(dob) || isNaN(calcDate)) {
        alert('Please enter valid dates.');
        return;
    }

    let years = calcDate.getFullYear() - dob.getFullYear();
    let months = calcDate.getMonth() - dob.getMonth();
    let days = calcDate.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const daysInMonth = new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
        days += daysInMonth;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display the result
    const ageDetails = `
        ${years} years ${months} months ${days} days
    `;

    document.getElementById('ageResult').innerHTML = ageDetails;
    document.getElementById('clearBtn').classList.remove('hidden');
}

function handleCheckboxChange() {
    if (document.getElementById('todayDateCheckbox').checked) {
        const today = new Date();
        document.getElementById('calcDateMonth').value = today.getMonth();
        document.getElementById('calcDateDay').value = today.getDate();
        document.getElementById('calcDateYear').value = today.getFullYear();
    }
}

function clearAll() {
    document.getElementById('ageForm').reset();
    document.getElementById('ageResult').innerHTML = '';
    document.getElementById('clearBtn').classList.add('hidden');
}
