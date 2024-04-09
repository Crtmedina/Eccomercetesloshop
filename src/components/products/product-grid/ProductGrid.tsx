import { Product } from "@/interfaces";
import { ProductGridItem } from "./ProductGridItem";

/**
 * Componente ProductGrid
 * 
 * Este componente representa una cuadrícula de productos.
 * Muestra una serie de elementos de la cuadrícula utilizando el componente ProductGridItem.
 */

interface Props {
     /**
     * Lista de productos que se mostrarán en la cuadrícula.
     */
    products: Product[];
}

export const ProductGrid = ({ products }: Props) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-10 mb-10">
        {
            products.map(product =>(
                <ProductGridItem 
                    key={ product.slug }
                    product={ product }
                />
                    
            ))
        }
    </div>
  )
}
