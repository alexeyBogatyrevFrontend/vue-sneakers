<script lang="ts" setup>
type CardType = {
  id: Number
  title: string
  price: number
  imageUrl: string
  isFavorite?: boolean
  isAdded?: boolean
  onClickAdd?: (event: MouseEvent) => void
  onClickFavorite?: (event: MouseEvent) => void
}

defineProps<CardType>()
</script>

<template>
  <div
    class="relative border bg-white border-slate-100 rounded-3xl p-8 cursor-pointer transition-all hover:-translate-y-2 hover:shadow-xl"
  >
    <img
      :src="!isFavorite ? '/like-1.svg' : '/like-2.svg'"
      alt="like"
      class="absolute top-8 left-8"
      @click="onClickFavorite"
    />

    <img :src="imageUrl" alt="sneaker" />
    <h2 class="mt-2">{{ title }}</h2>
    <div class="flex justify-between mt-5">
      <div class="flex flex-col">
        <span class="text-slate-400">Цена: </span>
        <b>{{ price }} руб. </b>
      </div>

      <img :src="!isAdded ? '/plus.svg' : '/checked.svg'" alt="plus" @click="onClickAdd" />
    </div>
  </div>
</template>
