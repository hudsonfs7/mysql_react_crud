const express = require('express')

const app = express()

const router = app.Router()

router.get('/', getUsers)

export default router
