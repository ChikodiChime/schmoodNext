import Image from 'next/image'
import prisma from '../utils/connect'

export default async function page() {
  const foods = await prisma.food.findMany()

  return (
    <div className='w-full h-full grid grid-cols-3 p-20 gap-10 justify-center '>
      {foods.map(food => (
        <div key={food.id} className='bg-white/5 rounded-md flex flex-col justify-center gap-3 items-center w-[350px] h-[350px]  '>
          <Image src={food.image} alt={food.name} width={350} height={200} objectFit="cover" className='rounded-t-md' />
          <p className='text-[#E3694C] text-2xl salsa-regular'>{food.name}</p>
          <p className='text-sm'>{food.description}</p>
          
          <button className='bg-[#E3694C] px-5 py-2 rounded-md'>Click to Order</button>
        </div>
      ))}
    </div>
  )
}
