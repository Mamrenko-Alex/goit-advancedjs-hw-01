import throttle from 'lodash.throttle';

const feedbackForm = document.querySelector('.feedback-form');
const inputEmail = feedbackForm.elements.email;
const inputMessage = feedbackForm.elements.message;

const KEY_FORM = "feedback-form-state"

// Функція для збереження поточного значення полів у локальне сховище
function saveFormState() {
    const formData = {
        email: inputEmail.value,
        message: inputMessage.value
    };
    localStorage.setItem(KEY_FORM, JSON.stringify(formData))
};

// Прослуховувач подій на форму зворотньго зв'язку для збереження даних
feedbackForm.addEventListener('input', throttle(saveFormState, 500));

// Функція для відтворення значення полів у формі зворотнього зв'язку
function restoreFormState() {
    const savedData = localStorage.getItem(KEY_FORM);
    if (savedData) {
        const formData = JSON.parse(savedData);
        inputEmail.value = formData.email;
        inputMessage.value = formData.message;
    };
};

// Прослуховувач подій на форму зворотньго зв'язку для відправлення данних на сервре
// та очистки локал сторедж
feedbackForm.addEventListener('submit', handlerSubmit);

// Функція обробника подій для сабміту форми
function handlerSubmit(event) {
    event.preventDefault();
    
    const currentEmail = inputEmail.value;
    const currentMessage = inputMessage.value;
    
    if (currentEmail.trim() === '' || currentMessage === '') {
        alert('Усі поля повинні бути заповнені');
    } else {
        const result = {
            email: currentEmail,
            message: currentMessage,
        }
        console.log(result);
        feedbackForm.reset();
        localStorage.removeItem('feedback-form-state')
    };
};

// Відновлення значення полів зворотнього зв'язку під час перезавантаження сторінки
restoreFormState()
