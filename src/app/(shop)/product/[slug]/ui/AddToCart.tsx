'use client'

import { QuantitySelector, SizeSelector } from "@/components"
import { CartProduct, Product, Size } from "@/interfaces"
import { useCartStore } from "@/store";
import { useState } from "react";


interface Props {
    product: Product;
}

export const AddToCart = ({ product }: Props) => {

    const addProductToCart = useCartStore(state => state.addProductTocart);

    const [size, setSize] = useState<Size | undefined>();
    const [quantity, setQuantity] = useState<number>(1);
    const [posted, setPosted] = useState(false)

    const addToCart = () => {

        setPosted(true);

        if (!size) return;
        console.log({ size, quantity, product })
        // Todo: addtocart
        const cartProduct: CartProduct = {
            id: product.id,
            slug: product.slug,
            title: product.title,
            price: product.price,
            quantity: quantity,
            size: size,
            image: product.images[0]
        }
        addProductToCart(cartProduct);
        setPosted(false);
        setSize(undefined);
    }

    return (
        <>
            {
                posted && !size && (
                    <span className="mt-2 text-red-500 fade-in">
                        Debe de seleccionar una talla
                    </span>
                )
            }


            {/* Selector de tallas */}
            <SizeSelector
                selectedSize={size}
                availableSizes={product.sizes}
                onSizeChanged={setSize}
            />

            {/* Selector de cantidad */}
            <QuantitySelector
                quantity={quantity}
                onQuantityChanged={setQuantity}
            />

            {/* Button */}
            <button
                className="btn-primary my-5"
                onClick={addToCart}
            >
                Agregar al carrito
            </button>
        </>
    )
}
