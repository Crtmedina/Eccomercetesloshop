'use server'

import { auth } from "@/auth.config"
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

/**
 * Cambia el rol de un usuario.
 * 
 * Esta función requiere que el usuario que realiza la acción esté autenticado como administrador.
 * 
 * @param {string} userId - El ID del usuario cuyo rol se va a cambiar.
 * @param {'admin' | 'user'} role - El nuevo rol que se asignará al usuario. Puede ser 'admin' o 'user'.
 * 
 * @returns {Object} Un objeto que indica si la operación fue exitosa y un mensaje descriptivo.
 * @returns {boolean} ok - Indica si la operación fue exitosa. true si fue exitosa, false si falló.
 * @returns {string} message - Un mensaje descriptivo que indica el resultado de la operación.
 * 
 * @throws {Error} Error de autenticación si el usuario no tiene permisos de administrador.
 * @throws {Error} Error si no se puede actualizar el rol del usuario.
 */

export const changeUserRole = async (userId: string, role: string) => {
    const session = await auth();

    if (session?.user.role != 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado como admin'
        }
    }

    try {

        const newRole = role === 'admin' ? 'admin' : 'user';
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                role: newRole
            }
        })

        revalidatePath('/admin/users');

    } catch (error) {
        return {
            ok: false,
            message: 'No se pudo actualizar el role, revisar logs'
        }
    }
}