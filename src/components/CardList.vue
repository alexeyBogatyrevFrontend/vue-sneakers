<script setup lang="ts">
import Card from './Card.vue'
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card imageUrl="/sneakers/sneakers-1.jpg" title="Norm boots" :price="5000" :isAdded="false" />
  </div>
</template>
