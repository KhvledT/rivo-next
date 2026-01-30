// app/products/[id]/page.tsx
import ProductDetailsClient from '@/components/clientComponents/ProductDetailsClient'
import { getProductBySlug } from '@/data/products'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    id: string
  }
}

export default async function ProductDetailsPage({ params }: PageProps) {
  const { id } = await params

  const product = getProductBySlug(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailsClient product={product} />
}
