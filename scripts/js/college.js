let currentStep = 1;

function goToStep(step) {
    document.getElementById(`step${currentStep}`).classList.add('hidden');
    document.getElementById(`step${step}`).classList.remove('hidden');
    currentStep = step;
}

function submitForm() {
    alert('Form submitted successfully!');
}
