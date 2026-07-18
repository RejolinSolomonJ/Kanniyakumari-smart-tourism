import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.destination.update({
    where: { slug: 'thirparappu-waterfalls' },
    data: {
      entryFeeCamera: 50,
      parkingFeeCar: 30,
      parkingFeeBike: 10,
    }
  })
  console.log('Successfully updated Thirparappu Waterfalls prices.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
