<script>
export default {
name: "my-button"
}
</script>
<template>
    <button class="myBtn">
        <slot></slot>
    </button>
</template>
<style>
.myBtn {
    background-color: #FCCC26;
    color: black;
    padding: 8px 16px;
    cursor: pointer;
    border: none;
    font-size: 18px;
    position: relative;
    white-space: nowrap;
    margin: 0;
}
.myBtn:hover{
    background-color: #fcce265e;
}
</style>
