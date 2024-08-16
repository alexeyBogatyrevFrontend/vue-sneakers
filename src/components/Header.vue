<script setup lang="ts">
import type { Sneaker } from 'types'
import { inject, type Ref } from 'vue'

const cartContext = inject<{ cart: Ref<Sneaker[]>; toggleDrawer: () => void }>('cart')

const toggleDrawer = cartContext?.toggleDrawer
</script>

<template>
  <header class="flex justify-between items-center border-b border-slate-300 p-8">
    <div class="flex gap-4 items-center">
      <img src="/logo.png" alt="logo" class="w-10" />
      <div>
        <h2 class="text-xl font-bold uppercase">Vue Sneakers</h2>
        <p class="text-slate-400">Магазин лучших кроссовок</p>
      </div>
    </div>
    <nav>
      <ul class="flex justify-center items-center gap-10">
        <li
          class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer"
          @click="toggleDrawer"
        >
          <img src="/cart.svg" alt="cart" />
          <b>1205 руб.</b>
        </li>
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/heart.svg" alt="cart" />
          <span>Закладки</span>
        </li>
        <li class="flex items-center gap-3 text-gray-500 hover:text-black cursor-pointer">
          <img src="/profile.svg" alt="cart" />
          <span>Профиль</span>
        </li>
      </ul>
    </nav>
  </header>
</template>
