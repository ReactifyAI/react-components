const express = require('express')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
const PORT = 3001

// Enable CORS so our app can access the API
app.use(cors())
app.use(express.json())

// FAQ Endpoint
app.get('/api/faqs', (req, res) => {
  try {
    const data = fs.readFileSync(
      path.join(__dirname, './data/faqs.json'),
      'utf8'
    )
    res.json(JSON.parse(data))
  } catch (error) {
    res.status(500).json({ error: 'Failed to load FAQs' })
  }
})

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`)
})