<template>
    <div id="canvas"></div> 
    
</template>

<script>

</script>

<style>
#canvas {
    position: absolute;
    width: 10000px;
    height: 10000px;
    left: -5000px;
    top: -5000px;
    z-index: 9;
    text-align: center;
}

.draggable {
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 10;
    border-radius: 50%;
    color: black;
    font-size: 1.5rem;
}
</style>