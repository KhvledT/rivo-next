import ProductsClient from '@/components/clientComponents/ProductsClient'
import { products } from '@/data/products'

export default function Products() {
  return (
    <ProductsClient initialProducts={products} />
  )
}
