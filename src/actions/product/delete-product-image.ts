'use server'

import { revalidate } from '@/app/(shop)/page';
import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

export const deleteProductImage = async (imageId: number, imageUrl: string) => {

    if (!imageUrl.startsWith('http')) {
        return {
            ok: false,
            error: 'No se puede borrar imagenes en FS'
        }
    }

    const imageName = imageUrl
        .split('/')
        .pop()
        ?.split('.')[0] ?? '';


    console.log({ imageName })

    try {
        await cloudinary.uploader.destroy(imageName);
        const deleteImage = await prisma.productImage.delete({
            where: {
                id: imageId
            },
            select: {
                product: {
                    select: {
                        slug: true
                    }
                }
            }
        })

        // Revalidad los paths

        revalidatePath(`/admin/products`)
        revalidatePath(`/admin/products/${deleteImage.product.slug}`);
        revalidatePath(`/products/${deleteImage.product.slug}`);

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo eliminar la imagen'
        }
    }
}