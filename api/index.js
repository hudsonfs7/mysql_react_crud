const express = require('express')
const cors = require('cores')

const app = express()

app.use(express.json())
app.use(cors())

app.listen(8800)
