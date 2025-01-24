<template>
  <main class="wac-welcome-page page">
    <img src="/photo1.jpg" alt="" class="home-img">
    <h1>Your next adventure</h1>
    <p>Discover the best adventures in <b>Bali</b>. <br> By yourself, in couple or with your friends ❤️</p>
    <button>
      Discover experiences
    </button>
  </main>
</template>

<style lang="scss">
.wac-welcome-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  min-height: 100vh;
  color: white;
  text-shadow: 0 0 1rem rgba(169, 120, 7, 0.5);

  .home-img {
    z-index: -1;
    position: absolute;
    width: 90vw;
    height: 70vh;
    border-radius: 1rem;
  }
}
</style>
