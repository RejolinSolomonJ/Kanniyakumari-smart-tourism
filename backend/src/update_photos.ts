import { PrismaClient } from '@prisma/client'
import { destinations } from '../../apps/web/lib/data.ts'

const prisma = new PrismaClient()

async function main() {
  for (const dest of destinations) {
    try {
      await prisma.destination.update({
        where: { slug: dest.slug },
        data: {
          heroImage: dest.heroImage,
          images: dest.images
        }
      })
      console.log(`Updated ${dest.nameEn}`)
    } catch (e) {
      console.log(`Could not update ${dest.slug}:`, e.message)
    }
  }
  console.log('Database photos updated successfully!')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
