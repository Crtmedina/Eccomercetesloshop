import { Title } from "@/components";
import { getCategories, getProductBySlug } from '@/actions';
import { redirect } from "next/navigation";
import { ProductForm } from "./ui/ProductForm";

/**
 * Página para mostrar y editar un producto.
 * 
 * Esta página obtiene un producto y las categorías asociadas por su slug.
 * Si el producto no existe, redirige a la página de administración de productos.
 * 
 * @param {Object} props - Props de la página.
 * @param {Object} props.params - Parámetros de la URL, que incluyen el slug del producto.
 * @param {string} props.params.slug - El slug del producto.
 * 
 * @returns {JSX.Element} Un componente que muestra el título del producto y un formulario para editarlo.
 */

interface Props {
    params: {
        slug: string;
    }
}

export default async function Productpage({ params }: Props) {

    const { slug } = params;

    // Obtener el producto y las categorías asociadas
    const [product, categories] = await Promise.all([
        getProductBySlug(slug),
        getCategories()
    ])

    //  Redireccionar si el producto no existe
    if (!product && slug !== 'new') {
        redirect('/admin/products')
    }
    // Determinar el título de la página

    const title = (slug === 'new') ? 'Nuevo producto' : 'Editar producto'
    // Renderizar el título y el formulario del producto
    return (
        <>
            <Title title={title} subtitle="" />

            <ProductForm product={product ?? {}} categories={categories} />
        </>
    )
}
