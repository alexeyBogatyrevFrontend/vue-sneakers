<script setup lang="ts">
type CartType = {
  title: string
  price: number
  imageUrl: string
  onClickRemove: () => void
}

defineProps<CartType>()
</script>

<template>
  <div class="border border-slate-200 p-4 rounded-xl flex items-center gap-4">
    <img :src="imageUrl" alt="sneaker" class="w-16" />

    <div class="flex flex-col justify-between flex-1">
      <p>{{ title }}</p>

      <div class="flex justify-between mt-2">
        <b>{{ price }} ₽</b>
        <img
          src="/close.svg"
          alt="close"
          class="opacity-40 cursor-pointer hover:opacity-100 transition"
          @click="onClickRemove"
        />
      </div>
    </div>
  </div>
</template>
