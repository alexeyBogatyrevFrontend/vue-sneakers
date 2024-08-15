<script setup lang="ts">
import Card from './Card.vue'
import type { Sneaker } from '../../../types'

type CardList = {
  sneakers: Sneaker[]
}

defineProps<CardList>()
</script>

<template>
  <div class="grid grid-cols-4 gap-5">
    <Card
      v-for="sneaker in sneakers"
      v-bind:key="sneaker.id"
      :title="sneaker.title"
      :price="sneaker.price"
      :imageUrl="sneaker.imageUrl"
    />
  </div>
</template>
