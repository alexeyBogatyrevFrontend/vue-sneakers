<script setup lang="ts">
import { computed, onMounted, provide, reactive, ref, watch } from 'vue'

import CardList from './components/card/CardList.vue'
import Header from './components/Header.vue'
import Drawer from './components/modal/Drawer.vue'
import axios from 'axios'
import type { Sneaker } from 'types'

const sneakers = ref<Sneaker[]>([])
const cart = ref<Sneaker[]>([])
const drawerOpen = ref<Boolean>(false)

const filters = reactive({
  sort: 'title',
  search: ''
})

const totalCartPrice = computed(() => cart.value.reduce((accum, item) => accum + item.price, 0))

const onChangeSort = (e: Event) => {
  const target = e.target as HTMLSelectElement
  filters.sort = target.value
}

const onChangeSearch = (e: Event) => {
  const target = e.target as HTMLSelectElement
  filters.search = target.value
}

// add to favorite
const addToFavorite = async (sneaker: Sneaker) => {
  try {
    if (!sneaker.isFavorite) {
      const params = {
        sneakerId: sneaker.id
      }
      sneaker.isFavorite = true

      const { data } = await axios.post('https://fddd0cb885c7e776.mokky.dev/favorites', params)

      sneaker.favoriteId = data.id
    } else {
      sneaker.isFavorite = false
      await axios.delete(`https://fddd0cb885c7e776.mokky.dev/favorites/${sneaker.favoriteId}`)
      sneaker.favoriteId = null
    }
  } catch (error) {
    console.log(error)
  }
}

// add to cart
const addToCart = (item: Sneaker) => {
  cart.value.push(item)
  item.isAdded = true
}

// remove from cart
const removeFromCart = (item: Sneaker) => {
  cart.value.splice(cart.value.indexOf(item), 1)
  item.isAdded = false
}

// add or remove from cart
const toggleCart = (item: Sneaker) => {
  if (!item.isAdded) {
    addToCart(item)
  } else {
    removeFromCart(item)
  }
}

// get favorites
const fetchFavorites = async () => {
  try {
    const { data: favorites } = await axios.get(`https://fddd0cb885c7e776.mokky.dev/favorites`)

    sneakers.value = sneakers.value.map((sneaker) => {
      const favorite = favorites.find((favorite: any) => favorite.sneakerId === sneaker.id)

      if (!favorite) return sneaker

      return { ...sneaker, isFavorite: true, favoriteId: favorite.id }
    })
  } catch (error) {
    console.log(error)
  }
}

// get sneakers
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
    sneakers.value = data.map((obj: any) => ({
      ...obj,
      isFavorite: false,
      favoriteId: null,
      isAdded: false
    }))
  } catch (error) {
    console.log(error)
  }
}

// modal
const toggleDrawer = () => {
  drawerOpen.value = !drawerOpen.value
}

onMounted(async () => {
  await fetchSneakers()
  await fetchFavorites()
})
watch(filters, fetchSneakers)

provide('cart', { cart, totalCartPrice, toggleDrawer, removeFromCart })
</script>

<template>
  <Drawer v-if="drawerOpen" />

  <div class="w-4/5 m-auto bg-white rounded-xl shadow-xl">
    <Header :totalPrice="totalCartPrice" />

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

      <CardList :sneakers="sneakers" @addToFavorite="addToFavorite" @addToCart="toggleCart" />
    </div>
  </div>
</template>
