'use server'

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

/**
 * Obtiene una lista paginada de pedidos.
 * 
 * Esta función requiere que el usuario esté autenticado como administrador.
 * 
 * @returns {Object} Un objeto que indica si la operación fue exitosa y la lista de pedidos.
 * @returns {boolean} ok - Indica si la operación fue exitosa. true si fue exitosa, false si falló.
 * @returns {Object[]} orders - La lista de pedidos obtenida.
 * @returns {string} orders.id - El ID del pedido.
 * @returns {Date} orders.createAt - La fecha y hora en que se creó el pedido.
 * @returns {Object} orders.OrderAddress - La información de dirección asociada al pedido.
 * @returns {string} orders.OrderAddress.firstName - El nombre del destinatario de la dirección.
 * @returns {string} orders.OrderAddress.lastName - El apellido del destinatario de la dirección.
 * 
 * @throws {Error} Error de autenticación si el usuario no tiene permisos de administrador.
 */

export const getPaginatedOrders = async () => {
    const session = await auth();

    if (session?.user.role !== 'admin') {
        return {
            ok: false,
            message: 'Debe de estar autenticado'
        }
    }

    const orders = await prisma.order.findMany({
        orderBy: {
            createAt: 'desc',
        },
        include: {
            OrderAddress: {
                select: {
                    firstName: true,
                    lastName: true
                }
            }
        }
    })

    return {
        ok: true,
        orders: orders,
    }
}
