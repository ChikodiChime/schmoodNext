import { FC } from 'react'
import React from 'react'
import Image from 'next/image'
import prisma from '../../utils/connect'
import Link from 'next/link'
import ReloadBtn from '../../components/ReloadBtn/ReloadBtn'
import { FaAngleLeft } from 'react-icons/fa'

interface pageProps {
    params: { moods: string }
}

const capitalizeWords = (str: string): string => {
    return str
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ')
}

const page: FC<pageProps> = async ({ params }) => {
    const allFoods = await prisma.food.findMany()
    // Decode two-worded mood from the URL
    const decodedMood = decodeURIComponent(params.moods)
    const capitalizedMood = capitalizeWords(decodedMood)

    // Get the current greeting (e.g., Breakfast, Lunch, Dinner)
    const currentGreeting = (): string => {
        const curHr = new Date().getHours()
        if (curHr < 12) {
            return 'Breakfast'
        } else if (curHr < 15) {
            return 'Lunch'
        } else {
            return 'Dinner'
        }
    }

    // Filter foods based on the mood and time
    const filteredFoods = allFoods.filter(
        food =>
            food.selectedMood.some(mood =>
                mood
                    .split(',')
                    .map(m => m.trim())
                    .includes(capitalizedMood)
            ) &&
            (food.selectedTime.some(time =>
                time
                    .split(',')
                    .map(t => t.trim())
                    .includes(currentGreeting())
            ) ||
                food.selectedTime.some(time =>
                    time
                        .split(',')
                        .map(t => t.trim())
                        .includes('Snack')
                ))
    )

    // Function to randomly select a specified number of items
    const getRandomFoods = (foods: typeof filteredFoods, count: number) => {
        return foods.sort(() => Math.random() - 0.5).slice(0, count)
    }

    // Get a random selection of 6 foods
    const foods = getRandomFoods(filteredFoods, 6)

    return (
        <div className='px-2 py-5 sm:px-10'>
            <div className='flex w-full mb-5 justify-between'>
                    <Link
                        href={'/Moods'}
                        className='flex items-center gap-2 text-sm'
                    >
                        <span className='text-[#E3694C]  hover:text-gray-700'>
                            <FaAngleLeft />
                        </span>
                        <span className='text-gray-700'>Go Back</span>
                    </Link>
                    <ReloadBtn />
                </div>
            <div className=' text-center space-y-5 sm:space-y-0 mb-5'>
                
                <h1 className=''>I see you are feeling {capitalizedMood}</h1>
                <p>I have some food suggestions that are just right for you</p>
            </div>

            <div className='grid h-full w-full grid-cols-1 place-items-center  items-center justify-center gap-10 sm:grid-cols-2  lg:grid-cols-3   '>
                {foods.map(food => (
                    <div
                        key={food.id}
                        className='flex h-full w-[100%] flex-col items-center justify-center gap-3 rounded-md bg-white/5 px-2 text-center'
                    >
                        <div className='relative h-[270px] w-full'>
                            <Image
                                src={food.image}
                                alt={food.name}
                                width={350}
                                height={300}
                                objectFit='cover'
                                className='h-full w-full  rounded-t-md object-cover'
                            />
                            <p className='absolute bottom-0 left-0 bg-black/50 px-2'>
                                {food.selectedTime.some(time =>
                                    time
                                        .split(',')
                                        .map(t => t.trim())
                                        .includes(currentGreeting())
                                )
                                    ? currentGreeting()
                                    : food.selectedTime.some(time =>
                                            time
                                                .split(',')
                                                .map(t => t.trim())
                                                .includes('Snack')
                                        )
                                      ? 'Snack'
                                      : ''}
                            </p>
                        </div>
                        <div className='flex h-2/6 flex-col items-center justify-center gap-3 py-4'>
                            <p className='salsa-regular text-2xl text-[#E3694C]'>
                                {food.name}
                            </p>
                            <p className='text-sm'>{food.description}</p>

                            <a
                                href='https://chowdeck.com/'
                                target='_blank'
                                rel='noopener noreferrer'
                                className='rounded-md bg-[#E3694C] px-5 py-2'
                            >
                                Click to Order
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default page
