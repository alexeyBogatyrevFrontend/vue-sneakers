<script setup lang="ts">
import type { Sneaker } from 'types'
import { inject, type Ref } from 'vue'

const cartContext = inject<{ cart: Ref<Sneaker[]>; toggleDrawer: () => void }>('cart')

const toggleDrawer = cartContext?.toggleDrawer
</script>

<template>
  <div class="flex items-center gap-5 absolute top-8 left-8">
    <button @click="toggleDrawer">
      <svg
        class="cursor-pointer opacity-30 rotate-180 hover:opacity-100 transition hover:-translate-x-1"
        width="16"
        height="14"
        viewBox="0 0 16 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1 7H14.7143"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8.71436 1L14.7144 7L8.71436 13"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </button>

    <h2 class="text-2xl font-bold">Корзина</h2>
  </div>
</template>
