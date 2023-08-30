require('dotenv').config({})
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT;
const morgan = require('morgan')
const mainRoutes = require('./src/routes')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(morgan('dev'))
app.set('view engine', 'ejs');
app.use('/api', mainRoutes)

// example
app.get('/', async (req, res) => {
    res.send({message: 'server its works 🐻'})
})

// port
app.listen(port, () => console.log(`server run on http://localhost:${port}`));
