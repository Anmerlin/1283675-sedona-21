var form = document.querySelector('.form-review');

if (form) {

  form.setAttribute('novalidate', true);

  var body = document.querySelector('body');
  var popup = document.querySelector('.popup--container');

  var firstname = document.querySelector('[name=name]');
  var surname = document.querySelector('[name=surname]');
  var phone = document.querySelector('[name=phone]');
  var email = document.querySelector('[name=email]');
  var inputs = document.querySelectorAll('.form-review__group-text');

  var failure = document.querySelector('#failure');
  var failureBtnClose = document.querySelector('.popup__button-failure');
  var success = document.querySelector('#success');
  var successBtnClose = document.querySelector('.popup__button-success');

  var isStorageSupport = true;
  var storageName = '';
  var storageSurname = '';
  var storagePhone = '';
  var storageEmail = '';

  try {
    storageName = localStorage.getItem('name');
    storageSurname = localStorage.getItem('surname');
    storagePhone = localStorage.getItem('phone');
    storageEmail = localStorage.getItem('email');
  } catch (err) {
    isStorageSupport = false;
  }

  document.addEventListener('DOMContentLoaded', function () {
    if (storageName && storageSurname && storagePhone && storageEmail) {
      firstname.value = storageName;
      surname.value = storageSurname;
      phone.value = storagePhone;
      email.value = storageEmail;
    } else {
      firstname.focus();
    }
  })

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    popup.classList.add('popup--active');
    if (!firstname.value || !surname.value || !phone.value || !email.value) {
      if (!firstname.validity.valid) {
        firstname.classList.add('form-review__group-text--invalid');
      }
      if (!surname.validity.valid) {
        surname.classList.add('form-review__group-text--invalid');
      }
      if (!phone.validity.valid) {
        phone.classList.add('form-review__group-text--invalid');
      }
      if (!email.validity.valid) {
        email.classList.add('form-review__group-text--invalid');
      }
      body.classList.add('page__body--popup-show');
      failure.classList.add('popup__section--show');
    } else {
      if (isStorageSupport) {
        localStorage.setItem('name', firstname.value);
        localStorage.setItem('surname', surname.value);
        localStorage.setItem('phone', phone.value);
        localStorage.setItem('email', email.value);
      }
      success.classList.add('popup__section--show');
    }
  }, false);


  for (var input of inputs) {
    input.addEventListener('input', function (event) {
      if (this.classList.contains('form-review__group-text--invalid')) {
        this.classList.remove('form-review__group-text--invalid')
      }
    }, false);
  }

  failureBtnClose.addEventListener('click', function () {
    failure.classList.remove('popup__section--show');
    popup.classList.remove('popup--active');
    body.classList.remove('page__body--popup-show');
  }, false);

  successBtnClose.addEventListener('click', function () {
    success.classList.remove('popup__section--show');
    popup.classList.remove('popup--active');
    body.classList.remove('page__body--popup-show');
    form.submit(false);
  }, false);
}
