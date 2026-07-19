import { PrismaClient, Role, Provider } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const salt = await bcrypt.genSalt(10)
  const passwordHash = await bcrypt.hash('password123', salt)

  console.log('Seeding CRM accounts...')

  // 1. Collector Account
  const collector = await prisma.user.upsert({
    where: { email: 'collector@kanyakumari.gov.in' },
    update: { passwordHash, role: Role.COLLECTOR },
    create: {
      name: 'District Collector',
      email: 'collector@kanyakumari.gov.in',
      phone: '+910000000001',
      passwordHash,
      role: Role.COLLECTOR,
      provider: Provider.EMAIL,
      isVerified: true
    }
  })
  console.log(`Created/Updated: ${collector.email} (Role: ${collector.role})`)

  // 2. Tourism Officer Account
  const officer = await prisma.user.upsert({
    where: { email: 'officer@kanyakumari.gov.in' },
    update: { passwordHash, role: Role.TOURISM_OFFICER },
    create: {
      name: 'Tourism Officer',
      email: 'officer@kanyakumari.gov.in',
      phone: '+910000000002',
      passwordHash,
      role: Role.TOURISM_OFFICER,
      provider: Provider.EMAIL,
      isVerified: true
    }
  })
  console.log(`Created/Updated: ${officer.email} (Role: ${officer.role})`)

  console.log('✅ CRM Accounts Seeded Successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
