<script>
import { getAuth, signOut } from "firebase/auth";
export default {
    methods: {
        logOut(userCredentials){
            this.$store.dispatch('logOut', userCredentials)
            this.$router.push('/auth')
            signOut(getAuth()).then(() => {
            // Sign-out successful.
            }).catch((error) => {
            // An error happened.
            });
        },
    },
    mounted(){
      
    }
}
</script>

<template>
<div class="container">
    <h2>Личный кабинет</h2>
     <div class="user-profile">
      <img src="@/assets/images/default-avatar.png" alt="Profile Picture">
      <div class="user-details">
        <h2>{{$store.state.auth.userCredentials.displayName}}</h2>
        <p class="email">{{$store.state.auth.userCredentials.email}}</p>
        <p class="address"></p>
      </div>
      <my-button @click="logOut($store.state.auth.userCredentials)">Выйти из ЛК</my-button>
    </div>

    <h2>Заказы пользователя</h2>
    <ul class="order-list">
      <li>Пока заказов нет</li>
      <!-- Добавьте дополнительные элементы заказа по необходимости -->
    </ul>
</div>
</template>

<style scoped>
h2 {
  font-size: 24px;
  font-weight: bold;
  margin: 0;
  margin-bottom: 10px;
}

.user-profile {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.user-profile img {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  margin-right: 16px;
}

.user-details {
  flex: 1;
}

.user-details h2 {
  font-size: 20px;
  margin: 0;
  margin-bottom: 4px;
}

.user-details p {
  margin: 0;
  margin-bottom: 4px;
}

.user-details .email {
  font-style: italic;
  color: #777;
}

.user-details .address {
  color: #777;
}

.order-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.order-list li {
  font-size: 16px;
  margin-bottom: 6px;
  color: #333;
}
</style>