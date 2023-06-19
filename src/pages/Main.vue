<script>

</script>

<template>
<div class="banner-wrapper">
    <img src="@/assets/images/banner.jpg" alt="banner image" usemap="#image-map"/>
</div>
    

<map name="image-map">
    <area alt="Каталог" title="" href="/catalog" coords="381,532,566,586" shape="rect">
</map>
    
</template>

<style scoped>
.banner-wrapper img{
    width: 100%;
    height: 100%;
    background-size: cover;
    display: flex;
}
@media screen and (max-width: 968px) {
.banner-wrapper{
    height: 30vh;
}
}


</style>