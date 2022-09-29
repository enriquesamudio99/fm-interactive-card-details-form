// Variables
const cardImgName = document.getElementById('cardImgName');
const cardImgNumber = document.getElementById('cardImgNumber');
const cardImgMonth = document.getElementById('cardImgMonth');
const cardImgYear = document.getElementById('cardImgYear');
const cardImgCVC = document.getElementById('cardImgCVC');
const nameInput = document.getElementById('name');
const numberInput = document.getElementById('number');
const monthInput = document.getElementById('monthExp');
const yearInput = document.getElementById('yearExp');
const cvcInput = document.getElementById('cvc');
const form = document.getElementById('form');
const formDetailsExp = document.getElementById('formDetailsExp');
const completed = document.getElementById('completed');
const continueBtn = document.getElementById('continueBtn');

// Initial card state
const card = {
    name: '',
    number: '',
    month: '',
    year: '',
    cvc: ''
}

const validateFields = {
    name: false,
    number: false,
    month: false,
    year: false,
    cvc: false
}

document.addEventListener('DOMContentLoaded', () => {

    initApp();

});

const initApp = () => {

    nameInput.value = "";
    numberInput.value = "";
    monthInput.value = "";
    yearInput.value = "";
    cvcInput.value = "";
    
    nameInput.addEventListener('input', setCardName);
    numberInput.addEventListener('input', setCardNumber);
    monthInput.addEventListener('input', setCardMonth);
    yearInput.addEventListener('input', setCardYear);
    cvcInput.addEventListener('input', setCardCVC);

    form.addEventListener('submit', submitForm);
    continueBtn.addEventListener('click', finishRegistration);

}

// Functions

const setCardName = ({ target }) => {

    let value = target.value;

    card.name = value.trim();
    nameInput.value = value;
    cardImgName.textContent = card.name ? card.name : 'Jane Appleseed';

}

const setCardNumber = ({ target }) => {

    let value = target.value;
    let formatValue = value.replace(/\s/g, '').replace(/\D/g, '').replace(/([0-9]{4})/g, '$1 ').trim();

    if (formatValue.length > 19) {
        formatValue = formatValue.slice(0, 19);
    }

    card.number = formatValue;
    numberInput.value = formatValue;
    cardImgNumber.textContent = formatValue ? formatValue : '0000 0000 0000 0000';

}

const setCardMonth = (e) => {

    let value = e.target.value;

    if ((value > 0 && value < 10) && e.code !== 'Backspace') {
        value = `0${value}`;
    }

    value = value.slice(value.length - 2);
    card.month = value;
    monthInput.value = value;
    cardImgMonth.textContent = (value && value != 0) ? value : '00';

}

const setCardYear = (e) => {

    let value = e.target.value;

    if ((value > 0 && value < 10) && e.code !== 'Backspace') {
        value = `0${value}`;
    }

    value = value.slice(value.length - 2);
    card.year = value;
    yearInput.value = value;
    cardImgYear.textContent = (value && value != 0) ? value : '00';

}

const setCardCVC = ({ target }) => {

    let value = target.value;
    let formatValue = value.replace(/\s/g, '').replace(/\D/g, '');
    
    if (formatValue.length > 3) {
        formatValue = formatValue.slice(0, 3);
    }

    card.cvc = formatValue;
    cvcInput.value = formatValue;
    cardImgCVC.textContent = formatValue ? formatValue : '000';
    
}

const validateCardName = () => {

    nameInput.classList.remove('form__control--invalid');

    const spanErrorMsg = nameInput.nextElementSibling;

    if (card.name === '') {
        
        nameInput.classList.add('form__control--invalid'); 
        spanErrorMsg.textContent = "Can't be blank";
        validateFields.name = false;
        return;

    }
    
    nameInput.classList.remove('form__control--invalid');
    validateFields.name = true;

}

const validateCardNumber = () => {

    numberInput.classList.remove('form__control--invalid');

    const spanErrorMsg = numberInput.nextElementSibling;

    if (card.number.length === 0) {
        
        numberInput.classList.add('form__control--invalid');
        spanErrorMsg.textContent = "Can't be blank";
        validateFields.number = false;
        return;

    }

    if (card.number.replaceAll(' ', '').length < 16) {
        
        numberInput.classList.add('form__control--invalid');
        spanErrorMsg.textContent = "Invalid card number";
        validateFields.number = false;
        return;

    }
    
    numberInput.classList.remove('form__control--invalid');
    validateFields.number = true;

}

const validateCardDateExp = () => {

    monthInput.classList.remove('form__control--invalid');
    yearInput.classList.remove('form__control--invalid');

    const spanErrorMsgMonth = monthInput.nextElementSibling;
    const spanErrorMsgYear = yearInput.nextElementSibling;

    const monthValue = +card.month;
    const yearValue = +card.year;

    const getFullYear = new Date().getFullYear();
    const actualYear = +getFullYear.toString().slice(2, getFullYear.length);
    const actualMonth = new Date().getMonth() + 1;

    if (card.month === "") {
        
        formDetailsExp.classList.add("form__details-exp--error");
        monthInput.classList.add('form__control--invalid');
        spanErrorMsgMonth.textContent = "Can't be blank";
        validateFields.month = false;
        return;

    }

    if (actualYear == yearValue && monthValue < actualMonth || monthValue > 12) {
        
        formDetailsExp.classList.add("form__details-exp--error");
        monthInput.classList.add('form__control--invalid');
        spanErrorMsgMonth.textContent = "Invalid month";
        validateFields.month = false;
        return;

    }

    if (monthValue < 0 || monthValue > 12) {
        
        formDetailsExp.classList.add("form__details-exp--error");
        monthInput.classList.add('form__control--invalid');
        spanErrorMsgMonth.textContent = "Invalid month";
        validateFields.month = false;
        return;

    }

    if (card.year === "") {
        
        formDetailsExp.classList.add("form__details-exp--error");
        yearInput.classList.add('form__control--invalid');
        spanErrorMsgYear.textContent = "Can't be blank";
        validateFields.year = false;
        return;

    }

    if (yearValue < actualYear) {
        
        formDetailsExp.classList.add("form__details-exp--error");
        yearInput.classList.add('form__control--invalid');
        spanErrorMsgYear.textContent = "Invalid Year";
        validateFields.year = false;
        return;

    }

    formDetailsExp.classList.remove("form__details-exp--error");
    monthInput.classList.remove('form__control--invalid');
    yearInput.classList.remove('form__control--invalid');
    validateFields.month = true;
    validateFields.year = true;

}

const validateCardCVC = () => {

    cvcInput.classList.remove('form__control--invalid');

    const spanErrorMsg = cvcInput.nextElementSibling;

    if (card.cvc.length === 0) {
        
        cvcInput.classList.add('form__control--invalid');
        spanErrorMsg.textContent = "Can't be blank";
        validateFields.cvc = false;
        return;

    }

    if (card.cvc.length < 3) {
        
        cvcInput.classList.add('form__control--invalid');
        spanErrorMsg.textContent = "Invalid cvc number";
        validateFields.cvc = false;
        return;

    }
    
    cvcInput.classList.remove('form__control--invalid');
    validateFields.cvc = true;

}

const finishRegistration = () => {

    window.location.reload();

}

const submitForm = (e) => {

    e.preventDefault();

    validateCardName();
    validateCardNumber();
    validateCardDateExp();
    validateCardCVC();

    const { name, number, month, year, cvc } = validateFields;

    if (name && number && month && year && cvc) {
        form.style.display = "none";
        completed.style.display = "block";
    }

} 