<script setup lang="ts">
import { computed, inject, type Ref } from 'vue'

import CartList from '../cart/CartList.vue'
import DrawerHead from './DrawerHead.vue'
import type { Sneaker } from 'types'

const cartContext = inject<{
  cart: Ref<Sneaker[]>
  totalCartPrice: Ref<number>
  toggleDrawer: () => void
  isCreatingOrder: Ref<boolean>
}>('cart')

if (!cartContext) {
  throw new Error('cartContext is not provided')
}

const { cart, toggleDrawer, totalCartPrice, isCreatingOrder } = cartContext

const taxFromTotalCartPrice = computed(() =>
  totalCartPrice !== undefined ? Math.round(totalCartPrice.value * 0.05) : 0
)
const emit = defineEmits(['createOrder'])

// creating order
const cartIsEmpty = computed(() => cart.value.length === 0)

const disabledButton = computed(() => isCreatingOrder.value || cartIsEmpty.value)
</script>

<template>
  <div
    class="fixed top-0 left-0 h-full w-full bg-black z-10 opacity-70"
    @click="toggleDrawer"
  ></div>
  <div
    class="bg-white w-96 h-full fixed right-0 top-0 z-20 pt-16 pb-8 px-8 flex flex-col justify-between"
  >
    <div class="max-h-screen overflow-auto custom-scrollbar">
      <DrawerHead />

      <CartList />
    </div>

    <div class="flex flex-col gap-4 pt-8">
      <div class="flex gap-2">
        <span>Итого:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ totalCartPrice }} ₽</b>
      </div>

      <div class="flex gap-2 mb-4">
        <span>Налог 5%:</span>
        <div class="flex-1 border-b border-dashed"></div>
        <b>{{ taxFromTotalCartPrice }} ₽</b>
      </div>

      <button
        :disabled="disabledButton"
        @click="() => emit('createOrder')"
        class="bg-lime-500 w-full rounded-xl py-3 cursor-pointer text-white hover:bg-lime-600 transition active:bg-lime-700 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        Оформить заказ
      </button>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar {
  scrollbar-width: none; /* Firefox */
}
.custom-scrollbar::-webkit-scrollbar {
  display: none; /* WebKit browsers */
}
</style>
