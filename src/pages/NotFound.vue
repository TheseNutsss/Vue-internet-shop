<script>

</script>
<template>
<div class="container">
    <h1 class="error-code">404</h1>
    <p class="error-message">Страница не найдена</p>
    <button class="go-back-button" @click="$router.push('/')">Вернутьcя на главную</button>
</div>
</template>
<style>
 .error-code {
    font-size: 48px;
    font-weight: bold;
    margin-bottom: 20px;
}

.error-message {
    font-size: 24px;
    margin-bottom: 20px;
}

.go-back-button {
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    text-transform: uppercase;
    color: #fff;
    background-color: #4285F4;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.go-back-button:hover {
    background-color: #3367D6;
}
</style>