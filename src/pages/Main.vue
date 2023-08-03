<script>

</script>

<template>
<div class="banner-wrapper">
    <img src="@/assets/banner.jpg" alt="banner image" usemap="#image-map"/>
</div>
    

<map name="image-map">
    <area alt="Каталог" title="" href="/catalog" coords="381,532,566,586" shape="rect">
</map>
    
</template>

<style scoped>
.banner-wrapper{
    width: 100%;
    display: flex;
}
.banner-wrapper img{
    width: 100%;
    object-fit: fill;
    background-repeat: no-repeat;
    background-position: center;
}
@media screen and (max-width: 968px) {
    .banner-wrapper{
        min-height: 200px;
    }
}


</style>