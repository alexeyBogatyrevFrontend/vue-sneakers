<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'

import CardList from './components/card/CardList.vue'
import Header from './components/Header.vue'
import Drawer from './components/modal/Drawer.vue'
import axios from 'axios'
import type { Sneaker } from 'types'

const sneakers = ref<Sneaker[]>([])
const filters = reactive({
  sort: 'title',
  search: ''
})

const onChangeSort = (e: Event) => {
  const target = e.target as HTMLSelectElement
  filters.sort = target.value
}

const onChangeSearch = (e: Event) => {
  const target = e.target as HTMLSelectElement
  filters.search = target.value
}

const fetchSneakers = async () => {
  try {
    const params: Record<string, string> = {
      sortBy: filters.sort
    }

    if (filters.search) {
      params.title = `*${filters.search}*`
    }

    const { data } = await axios.get(`https://fddd0cb885c7e776.mokky.dev/items`, {
      params
    })
    sneakers.value = data

    console.log(sneakers)
  } catch (error) {
    console.log(error)
  }
}

onMounted(fetchSneakers)
watch(filters, fetchSneakers)
</script>

<template>
  <!-- <Drawer /> -->

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl">
    <Header />

    <div class="p-10">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Все кроссовки</h2>

        <div class="flex justify-between items-center gap-4">
          <select class="py-2.5 px-3 border rounded-md outline-none" @change="onChangeSort">
            <option value="title">По названию</option>
            <option value="price">По цене (дешевые)</option>
            <option value="-price">По цене (дорогие)</option>
          </select>

          <div class="relative">
            <img src="/search.svg" alt="search" class="absolute top-3 left-4" />
            <input
              type="text"
              @input="onChangeSearch"
              placeholder="Поиск..."
              class="border border-gray-200 rounded-md py-2 pl-11 pr-4 outline-none focus:border-gray-400"
            />
          </div>
        </div>
      </div>

      <CardList :sneakers="sneakers" />
    </div>
  </div>
</template>
