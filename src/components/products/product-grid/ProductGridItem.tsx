'use client';


import Image from 'next/image';
import Link from 'next/link';

import { Product } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}
/**
 * Componente ProductGridItem
 * 
 * Este componente representa un elemento de la cuadrícula de productos.
 * Muestra una imagen del producto y puede contener otros detalles en futuras iteraciones.
 */

interface Props {
  /**
   * El producto que se va a mostrar en la cuadrícula.
   */
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {

  const [displayImage, setDisplayImage] = useState(product.images[0])

  return (
    <div className="rounded-md overflow-hidden fade-in">
      <Link href={`/product/${product.slug}`}>
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          priority
          className="w-full object-cover rounded"
          width={500}
          height={500}
          onMouseEnter={() => setDisplayImage(product.images[1])} // Cambiar la imagen cuando pasas el ratón sobre ella
          onMouseLeave={() => setDisplayImage(product.images[0])} // Restaurar la imagen original cuando el ratón sale
        />
      </Link>


      <div className="p-4 flex flex-col">
        <Link
          href={`/product/${product.slug}`}
          className="hover:text-blue-600">
          {product.title}
        </Link>
        <span className="font-bold">
          ${product.price}
        </span>
      </div>
    </div>
  )
}
