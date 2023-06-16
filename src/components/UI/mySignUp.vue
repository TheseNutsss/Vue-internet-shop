<script>
import { getAuth, createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
export default {
    name: 'my-signup',
    methods:{
        validateForm(e){
          e.preventDefault()
          const form = document.getElementById('registration-form');
          const usernameInput = document.getElementById('username');
          const emailInput = document.getElementById('email');
          const passwordInput = document.getElementById('password');
          const confirmPasswordInput = document.getElementById('confirm-password');
          // Сброс предыдущих сообщений об ошибках
          this.resetErrors();
          // Проверка полей формы
          let isValid = true;
          if (!this.validateUsername(usernameInput.value)) {
            isValid = false;
            this.showError(usernameInput, 'Введите имя пользователя');
          }
          if (!this.validateEmail(emailInput.value)) {
            isValid = false;
            this.showError(emailInput, 'Введите корректный email');
          }
          if (!this.validatePassword(passwordInput.value)) {
            isValid = false;
            this.showError(passwordInput, 'Пароль должен быть не менее 6 символов');
          }
          if (passwordInput.value !== confirmPasswordInput.value) {
            isValid = false;
            this.showError(confirmPasswordInput, 'Пароли не совпадают');
          }
          // Если форма валидна, можно выполнить дополнительные действия, например, отправить данные на сервер
          if (isValid) {
            // Дополнительный код для отправки данных на сервер
            console.log('Форма отправлена')
            this.signUpWithEmailAndPassword(usernameInput.value, emailInput.value, passwordInput.value)
            form.reset(); // Сброс полей формы
          }
        },
        validateUsername(username) {
          // имя пользователя должно содержать только буквы и цифры
          const regex = /^[a-zA-Z0-9]+$/;
          return regex.test(username);
        },
        validateEmail(email) {
          // валидация email
          const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          return regex.test(email);
        },
        validatePassword(password) {
          //пароль должен быть не менее 6 символов
          return password.length >= 6;
        },
        showError(input, message) {
            const errorElement = document.querySelector(`#registration-form #${input.id}`)
            const errorElementMessage = document.querySelector(`#${input.id}-error`)
            errorElementMessage.innerText = message;
            errorElement.classList.add('error-border')
        },
        resetErrors() {
            const errorMessage = document.getElementsByClassName('error-message');
            const errorElements = document.querySelectorAll('form input')
            Array.from(errorElements).forEach(function(element) {
                if(element.classList.contains('error-border')){
                    element.classList.remove('error-border')
                }
            });
            Array.from(errorMessage).forEach(function(element) {
                element.innerText = '';
            });
        },
        signUpWithEmailAndPassword(username, email, password){
          console.log('попал в метод')
          createUserWithEmailAndPassword(getAuth(), email, password)
            .then((userCredential) => {
              // Signed in 
              const user = userCredential.user;
              sessionStorage.setItem('auth', JSON.stringify({username, 'email' : user.email}));
              this.$store.commit('SET_AUTH', sessionStorage.getItem('auth'))
            })
            .catch((error) => {
              console.log('Произошла ошибка на сервере')
              document.querySelector('.server-error').innerHTML = "Произошла ошибка на сервере, пожалуйста повторите попытку"
              const errorCode = error.code;
              const errorElement = document.querySelector('.server-error')         
              switch (errorCode) {
                  case 'auth/invalid-email':
                      errorElement.innerHTML = "Вы ввели неверный email"
                      break;
                  case 'auth/email-already-in-use':
                      errorElement.innerHTML = "Пользователь с данным email уже зарегистрирован"
                      break;
                  default: 
                      errorElement.innerHTML = "Произошла ошибка на сервере, пожалуйста повторите попытку"
              }
            });
        },
        signUpWithGoogle(){
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
                .then((result) => {
                    console.log('+')
                    // This gives you a Google Access Token. You can use it to access the Google API.
                    const credential = GoogleAuthProvider.credentialFromResult(result);
                    const token = credential.accessToken;
                    // The signed-in user info.
                    const user = result.user;
                    sessionStorage.setItem('auth', JSON.stringify(user));
                    this.$store.commit('SET_AUTH', sessionStorage.getItem('auth'))
                    this.$router.push('/personalAccount')
                }).catch((error) => {
                    // Handle Errors here.
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const errorElement = document.querySelector('.server-error')
                    errorElement.innerHTML = "Произошла ошибка на сервере, пожалуйста повторите попытку"
                    // The email of the user's account used.
                    const email = error.customData.email;
                    // The AuthCredential type that was used.
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    // ...
                });
        }
    }

}
</script>
<template>
    <h1>Регистрация</h1>
    <form id="registration-form">
        <span class="server-error"></span>
        <div class="form-group">
        <label for="username">Имя пользователя</label>
        <my-input type="text" id="username" required></my-input>
        <span id="username-error" class="error-message"></span>
        </div>
        <div class="form-group">
        <label for="email">Email</label>
        <my-input type="email" id="email" required></my-input>
        <span id="email-error" class="error-message"></span>
        </div>
        <div class="form-group">
        <label for="password">Пароль</label>
        <my-input type="password" id="password" required></my-input>
        <span id="password-error" class="error-message"></span>
        </div>
        <div class="form-group">
        <label for="confirm-password">Подтверждение пароля</label>
        <my-input type="password" id="confirm-password" required></my-input>
        <span id="confirm-password-error" class="error-message"></span>
        </div>
        <div class="registration-buttons">
            <my-button @click="validateForm">Зарегистрироватся</my-button>
            <button class="google-login-button" @click="signUpWithGoogle">Войти с помощью google</button>
        </div>
        <p>Уже есть аккаунт? <a class="auth-link" @click="$router.push('/auth')">Войти</a></p>
    </form>

</template>

<style scoped>
#registration-form {
  width: 550px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 5px;
}
.customInput{
  max-width: 350px;
  min-width: 270px;
}
.server-error{
    background-color: rgba(255, 0, 0, 0.123);
    display: block;
}
.auth-link {
  border-bottom: 1px dashed rgb(44, 44, 163);
  color: rgb(44, 44, 163);
  font-weight: 600;
  cursor: pointer;
}
#registration-form p {
  margin-top: 10px;
}
.google-login-button {
  display: inline-block;
  padding: 10px;
  margin: 0;
  font-family: 'Roboto', sans-serif;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: #fff;
  background-color: #4285F4;
  border: none;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.25);
  cursor: pointer;
  transition: background-color 0.3s;
}

.google-login-button:hover {
  background-color: #3367D6;
}

.google-login-button:focus {
  outline: none;
  background-color: #3367D6;
}

.google-login-button:active {
  background-color: #2F5BB7;
  box-shadow: none;
}
.registration-buttons{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin-top: 15px;
}
@media (max-width: 480px) {
  #registration-form {
    max-width: 100%;
    padding: 15px;
  }
  
  input[type="email"],
  input[type="password"] {
    padding: 6px;
  }
  
  button[type="submit"] {
    padding: 8px;
  }
}
</style>
