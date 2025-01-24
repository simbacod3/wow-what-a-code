<script setup lang="ts">
</script>

<template>
  <div class="wac-details-page page">
    <div class="start">
      <img src="/photo1.jpg" alt="" width="500" height="300">
    </div>
    <div class="end">
      <h1>Name of my experience</h1>
      <span>Starts the</span>
      <span>Ends at</span>
      <div>
        <span class="tag">#byyourself</span>
      </div>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto cum atque ab. A, aliquam. Sed at repudiandae voluptate molestiae odio aliquid tenetur sequi autem delectus repellendus animi, sint architecto corporis?</p>
      <button>
        Book now
      </button>
    </div>
  </div>
</template>

<style lang="scss">

.wac-details-page {
  display: flex;
  margin-top: 2rem;
  gap: 2rem;
  min-height: 100vh;

  .start {
    flex: 3;

    img {
      border-radius: 16px;
    }
  }

  .end {
    flex: 4;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h1 {
      font-size: 2rem;
    }

    span {
      font-size: 1rem;
    }

    p {
      font-size: 1rem;
    }

    button {
      padding: 1rem 2rem;
      background-color: #a97807;
      color: white;
      border: none;
      border-radius: 0.5rem;
      cursor: pointer;
    }
  }
}
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
