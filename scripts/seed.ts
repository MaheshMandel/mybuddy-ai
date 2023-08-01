const { PrismaClient } = require('@prisma/client')

const db = new PrismaClient()

async function main() {
    try {
        await db.category.createMany({
            data: [
                { name: 'React Js' },
                { name: 'Monkey' },
                { name: 'Tiger' },
            ]
        })
    } catch (error) {
        console.log('Error in Seeding default Categories', error)
    } finally {
        await db.$disconnect()
    }
}

main()