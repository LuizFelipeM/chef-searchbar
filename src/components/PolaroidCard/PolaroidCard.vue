<style>
.polaroid {
    top: 18%;
    left: 15%;
    position: absolute;

    background-color: #fff;
    padding: 13px;
    width: 200px;
    max-width: 100%;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.photo-container {
    width: 100%;
    height: 200px;
    /* Adjust as needed */
    overflow: hidden;
    border-radius: 5px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.photo {
    width: auto;
    height: 100%;
    object-fit: cover;
}

.caption {
    text-align: center;
    font-size: 0.8rem;
    margin-top: 5px;
    font-family: Arial, sans-serif;
    color: #555;
}
</style>

<template>
    <div class="polaroid">
        <div class="photo-container">
            <img class="photo" v-bind:src="imgSrc" v-bind:alt="caption">
        </div>
        <p class="caption">{{ caption }}</p>
    </div>
</template>

<script>
export default {
    name: 'PolaroidCard',
    props: {
        imgSrc: {
            type: String,
            required: true
        },
        caption: {
            type: String,
            required: true
        }
    },
}
</script>