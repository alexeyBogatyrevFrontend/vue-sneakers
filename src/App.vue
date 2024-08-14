<script setup lang="ts">
import CardList from './components/card/CardList.vue'
import Header from './components/Header.vue'
import Drawer from './components/modal/Drawer.vue'
</script>

<template>
  <!-- <Drawer /> -->

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl">
    <Header />

    <div class="p-10">
      <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

      <CardList />
    </div>
  </div>
</template>
