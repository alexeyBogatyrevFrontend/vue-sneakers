<script setup lang="ts">
import { inject, type Ref } from 'vue'
import CartItem from './CartItem.vue'
import type { Sneaker } from 'types'

const cartContext = inject<{
  cart: Ref<Sneaker[]>
  toggleDrawer: () => void
  removeFromCart: (item: Sneaker) => void
}>('cart')

const cart = cartContext?.cart
const removeFromCart = cartContext?.removeFromCart

const handleRemoveFromCart = (sneaker: Sneaker) => {
  if (removeFromCart) {
    removeFromCart(sneaker)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 mt-5">
    <CartItem
      v-for="sneaker in cart"
      v-bind:key="sneaker.id"
      :title="sneaker.title"
      :price="sneaker.price"
      :image-url="sneaker.imageUrl"
      :on-click-remove="() => handleRemoveFromCart(sneaker)"
    />
  </div>
</template>
