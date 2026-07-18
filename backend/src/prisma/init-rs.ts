import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🔄 Attempting to initialize Replica Set rs0 on MongoDB...')
  try {
    const result = await prisma.$runCommandRaw({
      replSetInitiate: {
        _id: 'rs0',
        members: [{ _id: 0, host: 'localhost:27018' }]
      }
    })
    console.log('✅ Replica Set initialized successfully:', result)
  } catch (err: any) {
    if (err.message && err.message.includes('already initialized')) {
      console.log('ℹ️ Replica Set already initialized.')
    } else {
      console.error('❌ Failed to initialize Replica Set:', err)
    }
  } finally {
    await prisma.$disconnect()
  }
}

main()
