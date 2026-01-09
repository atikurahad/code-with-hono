import { serve } from '@hono/node-server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})
app.get('/users', (c) => {
  return c.json({
    message: [
      {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
      },
      {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
      },
      {
        name: 'John Doe',
        age: 30,
        email: 'john.doe@example.com'
      },
    ]
  })
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
