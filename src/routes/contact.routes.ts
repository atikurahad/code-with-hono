import { Hono } from 'hono'

export const contactRoutes = new Hono()

// In-memory contact storage (replace with database in production)
interface ContactMessage {
    id: string
    name: string
    email: string
    subject?: string
    message: string
    status: 'new' | 'read' | 'resolved'
    createdAt: Date
}

let contactMessages: ContactMessage[] = []

// Helper function to validate email
const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

// POST - Submit a contact message
contactRoutes.post('/', async (c) => {
    try {
        const body = await c.req.json()

        // Validation
        if (!body.name || !body.email || !body.message) {
            return c.json({
                success: false,
                message: 'Name, email, and message are required'
            }, 400)
        }

        // Email validation
        if (!isValidEmail(body.email)) {
            return c.json({
                success: false,
                message: 'Invalid email format'
            }, 400)
        }

        // Create new contact message
        const newMessage: ContactMessage = {
            id: (contactMessages.length + 1).toString(),
            name: body.name.trim(),
            email: body.email.trim().toLowerCase(),
            subject: body.subject?.trim(),
            message: body.message.trim(),
            status: 'new',
            createdAt: new Date()
        }

        contactMessages.push(newMessage)

        return c.json({
            success: true,
            message: 'Contact message submitted successfully',
            data: newMessage
        }, 201)
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// GET - Get all contact messages
contactRoutes.get('/', (c) => {
    // Optional query parameter to filter by status
    const status = c.req.query('status')

    let filteredMessages = contactMessages

    if (status && ['new', 'read', 'resolved'].includes(status)) {
        filteredMessages = contactMessages.filter(msg => msg.status === status)
    }

    return c.json({
        success: true,
        count: filteredMessages.length,
        data: filteredMessages
    })
})

// GET - Get contact message by ID
contactRoutes.get('/:id', (c) => {
    const id = c.req.param('id')
    const message = contactMessages.find(msg => msg.id === id)

    if (!message) {
        return c.json({
            success: false,
            message: `Contact message with ID ${id} not found`
        }, 404)
    }

    return c.json({
        success: true,
        data: message
    })
})

// PUT - Update contact message status
contactRoutes.put('/:id', async (c) => {
    try {
        const id = c.req.param('id')
        const body = await c.req.json()

        const messageIndex = contactMessages.findIndex(msg => msg.id === id)

        if (messageIndex === -1) {
            return c.json({
                success: false,
                message: `Contact message with ID ${id} not found`
            }, 404)
        }

        // Validate status if provided
        if (body.status && !['new', 'read', 'resolved'].includes(body.status)) {
            return c.json({
                success: false,
                message: 'Invalid status. Must be: new, read, or resolved'
            }, 400)
        }

        // Update status
        if (body.status) {
            contactMessages[messageIndex].status = body.status
        }

        return c.json({
            success: true,
            message: 'Contact message updated successfully',
            data: contactMessages[messageIndex]
        })
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// DELETE - Delete contact message
contactRoutes.delete('/:id', (c) => {
    const id = c.req.param('id')
    const messageIndex = contactMessages.findIndex(msg => msg.id === id)

    if (messageIndex === -1) {
        return c.json({
            success: false,
            message: `Contact message with ID ${id} not found`
        }, 404)
    }

    const deletedMessage = contactMessages.splice(messageIndex, 1)[0]

    return c.json({
        success: true,
        message: 'Contact message deleted successfully',
        data: deletedMessage
    })
})
