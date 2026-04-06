export interface StoreConfig {
  id: string
  store_name: string
  whatsapp_number: string
  whatsapp_message: string
  logo_url?: string
  banner_url?: string
  created_at: string
  updated_at: string
}

export interface Category {
  id: string
  name: string
  description?: string
  image_url?: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface Product {
  id: string
  name: string
  description?: string
  price: number
  category_id?: string
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductImage {
  id: string
  product_id: string
  image_url: string
  is_primary: boolean
  sort_order: number
  created_at: string
}

export interface Admin {
  id: string
  email: string
  full_name?: string
  created_at: string
}

export interface ProductWithImages extends Product {
  images?: ProductImage[]
  category?: Category
}
