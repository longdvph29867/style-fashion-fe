export const showSpinner = () => {
    const spinnerElement = document.getElementById('spinner');
    if (spinnerElement) {
        spinnerElement.style.display = 'flex';
    }
}
export const hiddenSpinner = () => {
    const spinnerElement = document.getElementById('spinner');

    if (spinnerElement) {
        spinnerElement.style.display = 'none';
    }
}
