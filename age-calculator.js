document.addEventListener('DOMContentLoaded', function () {
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

    if (isNaN(dobMonth) || isNaN(dobDay) || isNaN(dobYear) || isNaN(calcDateMonth) || isNaN(calcDateDay) || isNaN(calcDateYear)) {
        alert('Please enter all date fields.');
        return;
    }

    // Adjust month values to match JavaScript Date object (0-based index for months)
    const dob = new Date(dobYear, dobMonth - 1, dobDay);
    const calcDate = new Date(calcDateYear, calcDateMonth - 1, calcDateDay);

    if (dob > calcDate) {
        alert('Date of birth cannot be after the calculation date.');
        return;
    }

    let years = calcDate.getFullYear() - dob.getFullYear();
    let months = calcDate.getMonth() - dob.getMonth();
    let days = calcDate.getDate() - dob.getDate();

    if (days < 0) {
        months--;
        const prevMonthDays = new Date(calcDate.getFullYear(), calcDate.getMonth(), 0).getDate();
        days += prevMonthDays;
    }

    if (months < 0) {
        years--;
        months += 12;
    }

    // Display the result
    document.getElementById('ageResult').innerHTML = `${years} years ${months} months ${days} days`;
    document.getElementById('clearBtn').classList.remove('hidden');
}

function handleCheckboxChange() {
    if (document.getElementById('todayDateCheckbox').checked) {
        const today = new Date();
        document.getElementById('calcDateMonth').value = today.getMonth() + 1; // Convert to 1-based index
        document.getElementById('calcDateDay').value = today.getDate();
        document.getElementById('calcDateYear').value = today.getFullYear();
    }
}

function clearAll() {
    document.getElementById('ageForm').reset();
    document.getElementById('ageResult').innerHTML = '';
    document.getElementById('clearBtn').classList.add('hidden');
}
