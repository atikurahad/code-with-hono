import { Hono } from 'hono'
import { userRoutes } from './routes/user.routes.js'

const app = new Hono()

// Root route
app.get('/', (c) => {
    return c.json({
        message: 'Welcome to JohnGr8 HRMS API',
        version: '1.0.0'
    })
})

// Mount user routes
app.route('/api/users', userRoutes)

export default app
