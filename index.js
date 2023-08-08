require('dotenv').config({})
const express = require('express')
const app = express()
const port = process.env.PORT;
const mainRoutes = require('./src/routes')

app.use(express.urlencoded({extended:false}))
// app.set('view engine', 'ejs');
app.use('/api', mainRoutes)


// xample
app.get('/api', async (req, res) => {
    res.send({message: 'api its works 🐻'})
})

// port
app.listen(port, () => console.log(`server run on http://localhost:${port}`))