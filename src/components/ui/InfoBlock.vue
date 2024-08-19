<script setup lang="ts">
type InfoBlockType = {
  imageUrl: string
  title: string
  descr: string
}

defineProps<InfoBlockType>()
</script>

<template>
  <div class="flex flex-col justify-center items-center flex-1 text-center w-72 mx-auto">
    <img :src="imageUrl" alt="picture" width="100" height="100" class="mb-4" />
    <h2 class="text-2xl font-medium mb-2">{{ title }}</h2>
    <p class="text-gray-400">{{ descr }}</p>
  </div>
</template>
