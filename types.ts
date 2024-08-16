export type Sneaker = {
  id: number
  favoriteId: number | null
  cartId: number | null
  title: string
  price: number
  imageUrl: string
  isFavorite: boolean
  isAdded: boolean
}
