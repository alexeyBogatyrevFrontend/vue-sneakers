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
      <div class="flex justify-between items-center">
        <h2 class="text-3xl font-bold mb-8">Все кроссовки</h2>

        <div class="flex justify-between items-center gap-4">
          <select class="py-2.5 px-3 border rounded-md outline-none">
            <option value="">По названию</option>
            <option value="">По цене (дешевые)</option>
            <option value="">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img src="/search.svg" alt="search" class="absolute top-3 left-4" />
            <input
              type="text"
              placeholder="Поиск..."
              class="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>
      <CardList />
    </div>
  </div>
</template>
