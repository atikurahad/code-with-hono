import { Hono } from 'hono'
import { userRoutes } from './routes/user.routes.js'
import { contactRoutes } from './routes/contact.routes.js'
import { aboutRoutes } from './routes/about.routes.js'

const app = new Hono()

// Root route
app.get('/', (c) => {
    return c.json({
        message: 'Welcome to JohnGr8 HRMS API',
        version: '1.0.0'
    })
})

// Mount routes
app.route('/api/users', userRoutes)
app.route('/api/contact', contactRoutes)
app.route('/api/about', aboutRoutes)

export default app
