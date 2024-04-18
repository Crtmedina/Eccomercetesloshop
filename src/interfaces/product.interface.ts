/**
 * Interfaz Product
 * 
 * Representa la estructura de un producto en la tienda en línea.
 */
export interface Product {
    id: string;
    /**
     * Descripción del producto.
     */
    description: string;
    /**
     * Lista de URLs de las imágenes del producto.
     */
    images: string[];
    /**
     * Cantidad disponible en stock.
     */
    inStock: number;
    /**
     * Precio del producto.
     */
    price: number;
    /**
     * Tallas disponibles para el producto.
     */
    sizes: Size[];
    /**
     * Slug único del producto para URL amigable.
     */
    slug: string;
    /**
     * Etiquetas o categorías asociadas al producto.
     */
    tags: string[];
    /**
     * Título del producto.
     */
    title: string;
    /**
     * Tipo de producto, como camisetas, pantalones, sudaderas, sombreros, etc.
     */
    //TODO type: Type;
    /**
     * Género al que está dirigido el producto.
     * Puede ser 'men' (hombres), 'women' (mujeres), 'kid' (niños) o 'unisex' (unisex).
     */
    gender: Category;
}

export interface CartProduct {
    id: string;
    slug: string;
    title: string;
    price: number;
    quantity: number;
    size: Size;
    image: string;
}
export interface ProductImage {
    id: number;
    url: string;
    productId: string;
}
/**
 * Tipos de tallas válidas para los productos.
 */
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL';

/**
 * Tipos de productos válidos en la tienda en línea.
 */
export type Type = 'shirts' | 'pants' | 'hoodies' | 'hats';

type Category = 'men' | 'women' | 'kid' | 'unisex';