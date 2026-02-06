import { Hono } from 'hono'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
// const config = require('config')


import { userRoutes } from './routes/user.routes.js'
import { contactRoutes } from './routes/contact.routes.js'
import { aboutRoutes } from './routes/about.routes.js'

const app = new Hono()



const users: { email: string; password: string }[] = []

const secretKey = process.env.SECRET_KEY

// Root route
app.get('/', (c) => {
    return c.json({
        message: 'Welcome to 🔥 HONO 🔥 Server ',
        version: '1.0.0'
    })
})
app.get('/posts', (c) => {
    const posts = [
        { id: '1', title: 'Getting Started with Hono' },
        { id: '2', title: 'Advanced Hono Techniques' },
        { id: '3', title: 'Hono Best Practices' },
        { id: '4', title: 'Hono Security' },
        { id: '5', title: 'Hono Performance' }, 
        { id: '6', title: 'Hono Debugging' },
        { id: '7', title: 'Hono Testing' },
        { id: '8', title: 'Hono Deployment' },
        { id: '9', title: 'Hono Maintenance' },
        { id: '10', title: 'Hono Future' },
    ];
    return c.json(posts)
})

app.get('/posts/:id', (c) => {
    const id = c.req.param('id')
    const post = { id, title: `Post ${id}`, content: 'This is the content...' }
    return c.json(post)
})

app.post('/posts', async (c) => {
    const body = await c.req.json()
    return c.json({ message: 'Post created successfully!', data: body }, 201)
})

app.put('/posts/:id', async (c) => {
    const id = c.req.param('id')
    const body = await c.req.json()
    return c.json({ message: `Post ${id} updated successfully!`, data: body })
})

app.delete('/posts/:id', (c) => {
    const id = c.req.param('id')
    return c.json({ message: `Post ${id} deleted successfully!` })
})

// Mount routes
app.route('/api/users', userRoutes)
app.route('/api/contact', contactRoutes)
app.route('/api/about', aboutRoutes)

export default app
