const express = require('express')
const cors = require('cors');
const app = express()
// const router = require('./rootRouter')
const port =  3000
app.use(cors());

app.use(express.json())
// app.use('/api/v1', router)

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})