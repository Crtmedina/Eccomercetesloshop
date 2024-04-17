'use client'

import { PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js"
import { CreateOrderData, CreateOrderActions, OnApproveActions, OnApproveData } from "@paypal/paypal-js"
import { paypalCheckPayment, setTransactionId } from "@/actions";


interface Props {
    orderId: string;
    amount: number;
}


export const PaypalButton = ({ orderId, amount }: Props) => {

    const [{ isPending }] = usePayPalScriptReducer();

    const roundedAmount = (Math.round(amount * 100)) / 100; // Redondear el monto a dos decimales

    if (isPending) {
        return (
            <div className="animate-pulse mb-16">
                <div className="h-11 bg-gray-300 rounded" />
                <div className="h-11 bg-gray-300 rounded mt-2" />
            </div>
        )
    }

    const createOrder = async (data: CreateOrderData, actions: CreateOrderActions): Promise<string> => {

        const transactionId = await actions.order.create({
            // intent: "AUTHORIZE",
            purchase_units: [
                {
                    invoice_id: orderId,
                    amount: {
                        // currency_code: 'USD', // Aquí debes especificar el código de moneda apropiado
                        value: `${roundedAmount}`,
                    }

                }
            ]
        });

        const { ok } = await setTransactionId(orderId, transactionId);
        if (!ok) {
            throw new Error('No se pudo actualizar la orden');
        }


        return transactionId;
    }

    const onApprove = async (data: OnApproveData, actions: OnApproveActions) => {
        // console.log('onApprove')
        const details = await actions.order?.capture();
        if (!details || !details.id) {
            console.error('No se pudo obtener el ID de la transacción de PayPal');
            return;
        }

        await paypalCheckPayment(details.id);
    }


    return (
        <PayPalButtons
            createOrder={createOrder}
            onApprove={onApprove}
        />
    )

}