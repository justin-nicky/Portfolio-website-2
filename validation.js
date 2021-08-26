let nameField = document.getElementById('name')
let emailField = document.getElementById('email')
let phoneField = document.getElementById('phone')
let messageField = document.getElementById('message')

let errName = document.getElementById('errorname')
let errEmail = document.getElementById('erroremail')
let errPhone = document.getElementById('errorphone')
let errMessage = document.getElementById('errormessage')

let isNameValid = (isEmailValid = isPhoneValid = isMessageValid = false)

//########################## Name Validation ################################

nameField.addEventListener('blur', () => nameFieldBlur())
nameField.addEventListener('keypress', (e) => {
  let name = nameField.value
  if (
    !e.key.match(/^[A-Za-z ]+$/) ||
    (name.slice(-1) == ' ' && e.key == ' ') ||
    (name == '' && e.key == ' ') ||
    name.length > 20
  ) {
    e.preventDefault()
  } else if (
    errName.innerHTML == 'This field cannot be empty!' ||
    (nameField.value.length >= 3 &&
      errName.innerHTML == 'Name should contain atleast 3 characters.')
  ) {
    errName.innerHTML = ''
  }
})

function nameFieldBlur() {
  if (nameField.value.slice(-1) == ' ') {
    nameField.value = nameField.value.slice(0, -1)
  }
  if (nameField.value == '') {
    errName.innerHTML = 'This field cannot be empty!'
  } else if (nameField.value.length < 3) {
    errName.innerHTML = 'Name should contain atleast 3 characters.'
  } else {
    errName.innerHTML = ''
    isNameValid = true
  }
}

//########################### Email Validation #################################

emailField.addEventListener('blur', () => emailFieldBlur())
emailField.addEventListener('keypress', (e) => {
  if (e.key == ' ') {
    e.preventDefault()
  } else if (errEmail.innerHTML == 'This field cannot be empty!') {
    errEmail.innerHTML = ''
  }
})

function emailFieldBlur() {
  if (emailField.value == '') {
    errEmail.innerHTML = 'This field cannot be empty!'
  } else if (
    !emailField.value.match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    errEmail.innerHTML = 'This email id is invalid.'
  } else {
    errEmail.innerHTML = ''
    isEmailValid = true
  }
}

//########################## Phone Validation ####################################

phoneField.addEventListener('blur', () => phoneFieldBlur())
phoneField.addEventListener('keypress', (e) => {
  if (!e.key.match(/^[0-9]/) || phoneField.value.length > 11) {
    e.preventDefault()
  } else if (
    errPhone.innerHTML == 'This field cannot be empty!' ||
    (phoneField.value.length >= 10 &&
      errPhone.innerHTML == 'Phone number should have atleast 10 digits.')
  ) {
    errPhone.innerHTML = ''
  }
})

function phoneFieldBlur() {
  if (phoneField.value == '') {
    errPhone.innerHTML = 'This field cannot be empty!'
  } else if (phoneField.value.length < 10) {
    errPhone.innerHTML = 'Phone number should have atleast 10 digits.'
  } else {
    errPhone.innerHTML = ''
    isPhoneValid = true
  }
}

//######################### Message Validation ####################################

messageField.addEventListener('blur', () => messageFieldBlur())
messageField.addEventListener('keypress', (e) => {
  let message = messageField.value
  if (
    message.length > 50 ||
    (message.slice(-1) == ' ' && e.key == ' ') ||
    (message == '' && e.key == ' ')
  ) {
    e.preventDefault()
  } else if (
    errMessage.innerHTML == 'This field cannot be empty!' ||
    (messageField.value.length >= 10 &&
      errMessage.innerHTML == 'Message should have atleast 10 characters.')
  ) {
    errMessage.innerHTML = ''
  }
})

function messageFieldBlur() {
  if (messageField.value == '') {
    errMessage.innerHTML = 'This field cannot be empty!'
  } else if (messageField.value.length < 10) {
    errMessage.innerHTML = 'Message should have atleast 10 characters.'
  } else {
    errMessage.innerHTML = ''
    isMessageValid = true
  }
}

//########################## Mailing ########################################

function post() {
  nameFieldBlur()
  emailFieldBlur()
  phoneFieldBlur()
  messageFieldBlur()
  if (
    nameField.value != '' &&
    emailField.value != '' &&
    phoneField.value != '' &&
    messageField.value != '' &&
    isNameValid &&
    isEmailValid &&
    isPhoneValid &&
    isMessageValid
  ) {
    $.ajax({
      url: 'https://script.google.com/macros/s/AKfycbw79b_crwItgWTVdvNaUylzUKAdVMOJcla-pHZm/exec',
      data: $('#form').serialize(),
      method: 'post',
      success: function (response) {
        alert('Form submitted successfully')
        window.location.reload()
      },
      error: function (err) {
        alert('Something Error')
      },
    })
  }
}
