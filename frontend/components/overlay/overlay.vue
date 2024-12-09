<template>

    <dialog role="dialog" open="true" class="overlay" aria-label="generic overlay">

        <section aria-label="overlay content" >
            <h1 class="title">Loading content...</h1>

            <a href="/" class="retry-btn" role="button">
                Retry

            </a>
        </section>

    </dialog>


</template>

<style lang="scss">
.overlay {
    position: absolute;
    z-index: 2;
    min-width: 100%;
    min-height: 100%;
    display: flex;
    flex-direction: column;
    justify-items: center;
    justify-content: center;
    align-items: center;
    border: none;

    background-color: rgb(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    text-align: 'center';
    color: #ffffff;


    .title {
        font-size: 2rem;
    }

    .retry-btn {
        padding: 0.5rem;
        border: $border;
        border-radius: $radius;
        background-color: rgb(255, 255, 255, 0.1);
        color: #ffffff;
        text-decoration: none;

    }
}
</style>