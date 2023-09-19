const MidtransClient = require('midtrans-client');
const MIDTRANS_SERVER_KEY = process.env.SERVER_KEY_MIDTRANS;

// const core = new midtransClient.CoreApi({
//     isProduction: false,
//     serverKey: process.env.MIDTRANS_SERVER_KEY
// })

module.exports = {
    processTranscation: async(req, res) => {
        try {
            const orderId = uuidv4(); // ID unik untuk setiap transaksi
            const orderAmount = req.body.amount; // Jumlah yang harus dibayar dari aplikasi React
        
            // Buat permintaan ke Midtrans API untuk memulai pembayaran
            const midtransResponse = await initiateMidtransPayment(orderId, orderAmount);
        
            // Kembalikan respon dari Midtrans ke aplikasi React
            res.json(midtransResponse);
          } catch (error) {
            console.error('Error initiating payment:', error);
            res.status(500).json({ error: 'Error initiating payment' });
          }
        // try {
        //     const snap = new midtransClient.Snap({
        //         isProduction:false,
        //         serverKey: process.env.SERVER_KEY_MIDTRANS,
        //         clientKey: process.env.CLIENT_KEY_MIDTRANS
        //     })

        //     const parameter = {
        //         transaction_detail: {
        //             order_id: req.body.order_id,
        //             gross_id: req.body.total
        //         },
        //         customer_detail: {
        //             first_name: req.body.name
        //         }
        //     }
        //     snap.createTransaction(parameter).then((transaction) => {
        //         const dataPayment = {
        //             response: JSON.stringify(transaction)
        //         }
        //         const token = transaction.token
    
        //         res.status(200).send({
        //             msg: 'success',
        //             dataPayment,
        //             token: token
        //     })

        //     })
        // } catch (error) {
        //     res.send({
        //         msg: 'error',
        //         status: 500,
        //         error
        //     })
        // }
    }
}
async function initiateMidtransPayment(orderId, orderAmount) {
    // Implementasikan permintaan ke Midtrans API di sini
    // Anda perlu menggunakan Midtrans Node.js SDK atau mengirim permintaan HTTP langsung ke API Midtrans.
  
    // Contoh penggunaan Midtrans Node.js SDK:
    // const MidtransClient = require('midtrans-client');
    const midtrans = new MidtransClient.CoreApi({
      isProduction: false, // Ganti menjadi true untuk mode produksi
      serverKey: MIDTRANS_SERVER_KEY,
    });
  
    const transactionDetails = {
      orderId,
      grossAmount: orderAmount,
    };
  
    const paymentResponse = await midtrans.chargeCard(transactionDetails);
    return paymentResponse;
  
    // Pastikan Anda mengganti kode di atas sesuai dengan penggunaan Midtrans Anda.
  }