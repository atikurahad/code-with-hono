import { Hono } from 'hono'

export const userRoutes = new Hono()

// In-memory user storage (replace with database in production)
interface User {
    id: string
    name: string
    email: string
    age?: number
    createdAt: Date
    updatedAt: Date
}

let users: User[] = [
    {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30,
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        id: '2',
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        age: 28,
        createdAt: new Date(),
        updatedAt: new Date()
    }
]

// GET all users
userRoutes.get('/', (c) => {
    return c.json({
        success: true,
        count: users.length,
        data: users
    })
})

// GET user by ID
userRoutes.get('/:id', (c) => {
    const id = c.req.param('id')
    const user = users.find(u => u.id === id)

    if (!user) {
        return c.json({
            success: false,
            message: `User with ID ${id} not found`
        }, 404)
    }

    return c.json({
        success: true,
        data: user
    })
})

// POST create new user
userRoutes.post('/', async (c) => {
    try {
        const body = await c.req.json()

        // Validation
        if (!body.name || !body.email) {
            return c.json({
                success: false,
                message: 'Name and email are required'
            }, 400)
        }

        // Check if email already exists
        const existingUser = users.find(u => u.email === body.email)
        if (existingUser) {
            return c.json({
                success: false,
                message: 'User with this email already exists'
            }, 409)
        }

        // Create new user
        const newUser: User = {
            id: (users.length + 1).toString(),
            name: body.name,
            email: body.email,
            age: body.age,
            createdAt: new Date(),
            updatedAt: new Date()
        }

        users.push(newUser)

        return c.json({
            success: true,
            message: 'User created successfully',
            data: newUser
        }, 201)
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// PUT update user
userRoutes.put('/:id', async (c) => {
    try {
        const id = c.req.param('id')
        const body = await c.req.json()

        const userIndex = users.findIndex(u => u.id === id)

        if (userIndex === -1) {
            return c.json({
                success: false,
                message: `User with ID ${id} not found`
            }, 404)
        }

        // Check if email is being changed and if it already exists
        if (body.email && body.email !== users[userIndex].email) {
            const existingUser = users.find(u => u.email === body.email)
            if (existingUser) {
                return c.json({
                    success: false,
                    message: 'User with this email already exists'
                }, 409)
            }
        }

        // Update user
        users[userIndex] = {
            ...users[userIndex],
            name: body.name || users[userIndex].name,
            email: body.email || users[userIndex].email,
            age: body.age !== undefined ? body.age : users[userIndex].age,
            updatedAt: new Date()
        }

        return c.json({
            success: true,
            message: 'User updated successfully',
            data: users[userIndex]
        })
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// DELETE user
userRoutes.delete('/:id', (c) => {
    const id = c.req.param('id')
    const userIndex = users.findIndex(u => u.id === id)

    if (userIndex === -1) {
        return c.json({
            success: false,
            message: `User with ID ${id} not found`
        }, 404)
    }

    const deletedUser = users.splice(userIndex, 1)[0]

    return c.json({
        success: true,
        message: 'User deleted successfully',
        data: deletedUser
    })
})
