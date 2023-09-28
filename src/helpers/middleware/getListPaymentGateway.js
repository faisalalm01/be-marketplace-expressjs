const midtransClient = require('midtrans-client');

// const core = new midtransClient.CoreApi({
//     isProduction: false,
//     serverKey: process.env.MIDTRANS_SERVER_KEY
// })

module.exports = {
    processTranscation: (req, res) => {
        try {
            const snap = new midtransClient.Snap({
                isProduction:false,
                serverKey: process.env.SERVER_KEY_MIDTRANS,
                clientKey: process.env.CLIENT_KEY_MIDTRANS,
            })

            const parameter = {
                transaction_details: {
                    order_id: req.body.order_id,
                    gross_amount: req.body.total
                },
                customer_details: {
                    first_name: req.body.name
                }
            }
            snap.createTransaction(parameter).then((transaction) => {
                const dataPayment = {
                    response: JSON.stringify(transaction)
                }
                const token = transaction.token
                console.log(dataPayment);
                res.status(200).json({
                    msg: 'success',
                    dataPayment,
                    token: token
            })

            })
        } catch (error) {
            res.json({
                msg: 'error',
                status: 500,
                error
            })
        }
    }
}
