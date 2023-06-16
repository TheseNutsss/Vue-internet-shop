<script>
export default {
    name: 'my-input',
    props: ['modelValue'],
    emits: ['update:modelValue'],
}
</script>
<template>
    <input class="customInput" :value="modelValue" @input="$emit('update:modelValue', $event.target.value)"/>
</template>
<style>
.customInput{
    border: 1px solid #acacac;
    background: #fff;
    padding: 6px 8px;
    font-size: 16px;
    width: 100%;
    height: 36px;
}
</style>