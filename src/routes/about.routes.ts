import { Hono } from 'hono'

export const aboutRoutes = new Hono()

// In-memory storage for about information
interface AboutInfo {
    companyName: string
    mission: string
    vision: string
    description: string
    founded?: string
    location?: string
    updatedAt: Date
}

interface TeamMember {
    id: string
    name: string
    position: string
    bio?: string
    email?: string
    imageUrl?: string
    joinedAt: Date
}

// Initialize with default about information
let aboutInfo: AboutInfo = {
    companyName: 'JohnGr8 HRMS',
    mission: 'To revolutionize human resource management with innovative technology solutions.',
    vision: 'To be the leading HRMS platform trusted by organizations worldwide.',
    description: 'JohnGr8 HRMS is a comprehensive human resource management system designed to streamline HR operations and improve workforce management.',
    founded: '2026',
    location: 'Global',
    updatedAt: new Date()
}

let teamMembers: TeamMember[] = [
    {
        id: '1',
        name: 'John Doe',
        position: 'CEO & Founder',
        bio: 'Visionary leader with 15+ years of experience in HR technology.',
        email: 'john@johngr8.com',
        joinedAt: new Date('2026-01-01')
    },
    {
        id: '2',
        name: 'Jane Smith',
        position: 'CTO',
        bio: 'Technology expert passionate about building scalable systems.',
        email: 'jane@johngr8.com',
        joinedAt: new Date('2026-01-02')
    }
]

// GET - Get about information
aboutRoutes.get('/', (c) => {
    return c.json({
        success: true,
        data: aboutInfo
    })
})

// PUT - Update about information
aboutRoutes.put('/', async (c) => {
    try {
        const body = await c.req.json()

        // Update only provided fields
        aboutInfo = {
            companyName: body.companyName || aboutInfo.companyName,
            mission: body.mission || aboutInfo.mission,
            vision: body.vision || aboutInfo.vision,
            description: body.description || aboutInfo.description,
            founded: body.founded !== undefined ? body.founded : aboutInfo.founded,
            location: body.location !== undefined ? body.location : aboutInfo.location,
            updatedAt: new Date()
        }

        return c.json({
            success: true,
            message: 'About information updated successfully',
            data: aboutInfo
        })
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// GET - Get all team members
aboutRoutes.get('/team', (c) => {
    return c.json({
        success: true,
        count: teamMembers.length,
        data: teamMembers
    })
})

// GET - Get team member by ID
aboutRoutes.get('/team/:id', (c) => {
    const id = c.req.param('id')
    const member = teamMembers.find(m => m.id === id)

    if (!member) {
        return c.json({
            success: false,
            message: `Team member with ID ${id} not found`
        }, 404)
    }

    return c.json({
        success: true,
        data: member
    })
})

// POST - Add new team member
aboutRoutes.post('/team', async (c) => {
    try {
        const body = await c.req.json()

        // Validation
        if (!body.name || !body.position) {
            return c.json({
                success: false,
                message: 'Name and position are required'
            }, 400)
        }

        // Create new team member
        const newMember: TeamMember = {
            id: (teamMembers.length + 1).toString(),
            name: body.name.trim(),
            position: body.position.trim(),
            bio: body.bio?.trim(),
            email: body.email?.trim().toLowerCase(),
            imageUrl: body.imageUrl?.trim(),
            joinedAt: new Date()
        }

        teamMembers.push(newMember)

        return c.json({
            success: true,
            message: 'Team member added successfully',
            data: newMember
        }, 201)
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// PUT - Update team member
aboutRoutes.put('/team/:id', async (c) => {
    try {
        const id = c.req.param('id')
        const body = await c.req.json()

        const memberIndex = teamMembers.findIndex(m => m.id === id)

        if (memberIndex === -1) {
            return c.json({
                success: false,
                message: `Team member with ID ${id} not found`
            }, 404)
        }

        // Update team member
        teamMembers[memberIndex] = {
            ...teamMembers[memberIndex],
            name: body.name || teamMembers[memberIndex].name,
            position: body.position || teamMembers[memberIndex].position,
            bio: body.bio !== undefined ? body.bio : teamMembers[memberIndex].bio,
            email: body.email !== undefined ? body.email : teamMembers[memberIndex].email,
            imageUrl: body.imageUrl !== undefined ? body.imageUrl : teamMembers[memberIndex].imageUrl
        }

        return c.json({
            success: true,
            message: 'Team member updated successfully',
            data: teamMembers[memberIndex]
        })
    } catch (error) {
        return c.json({
            success: false,
            message: 'Invalid request body'
        }, 400)
    }
})

// DELETE - Remove team member
aboutRoutes.delete('/team/:id', (c) => {
    const id = c.req.param('id')
    const memberIndex = teamMembers.findIndex(m => m.id === id)

    if (memberIndex === -1) {
        return c.json({
            success: false,
            message: `Team member with ID ${id} not found`
        }, 404)
    }

    const deletedMember = teamMembers.splice(memberIndex, 1)[0]

    return c.json({
        success: true,
        message: 'Team member removed successfully',
        data: deletedMember
    })
})
