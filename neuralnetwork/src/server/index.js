const path = require('path')
const express = require('express')
const app = express()


const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 8000



app.use(express.static(path.resolve(__dirname, '../../dist')))

app.listen(PORT, HOST, () => {
    console.log(__dirname)
    console.log(`server is running on ${HOST}:${PORT}`)
})