import { FC } from 'react';
import React from 'react';
import Image from 'next/image';
import prisma from '../../utils/connect';

interface pageProps {
  params: { moods: string };
}

const page: FC<pageProps> = async ({ params }) => {
  const allFoods = await prisma.food.findMany();
  const capitalizedMood =
    params.moods.charAt(0).toUpperCase() + params.moods.slice(1);

  // Get the current greeting (e.g., Breakfast, Lunch, Dinner)
  const currentGreeting = (): string => {
    const curHr = new Date().getHours();
    if (curHr < 12) {
      return 'Breakfast';
    } else if (curHr < 17) {
      return 'Lunch';
    } else {
      return 'Dinner';
    }
  };

  // Filter foods based on the mood and time
  const filteredFoods = allFoods.filter(
    food =>
      food.selectedMood[0].split(',').includes(capitalizedMood) &&
      (food.selectedTime[0].split(',').includes(currentGreeting()) ||
        food.selectedTime[0].split(',').includes('Snack'))
  );

  // Function to randomly select a specified number of items
  const getRandomFoods = (foods: typeof filteredFoods, count: number) => {
    return foods.sort(() => Math.random() - 0.5).slice(0, count);
  };

  // Get a random selection of 6 foods
  const foods = getRandomFoods(filteredFoods, 6);

  return (
    
      <div className="px-2 py-10 sm:px-10">
        <div className="text-center py-10">
          <h1 className=''>I see you are feeling {capitalizedMood}</h1>
          <p>
            I have some food suggestions that are just right for you
          </p>
        </div>

        <div className="grid h-full w-full grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 justify-center items-center place-items-center  gap-10   ">
          {foods.map(food => (
            <div
              key={food.id}
              className="flex h-full w-[100%] flex-col items-center justify-center gap-3 rounded-md bg-white/5 px-2 text-center"
            >
              <div className="relative h-[270px] w-full">
                <Image
                  src={food.image}
                  alt={food.name}
                  width={350}
                  height={300}
                  objectFit="cover"
                  className="h-full w-full  rounded-t-md object-cover"
                />
                <p className="absolute bottom-0 left-0 bg-black/50 px-2">
                  {currentGreeting()}
                </p>
              </div>
              <div className="flex h-2/6 flex-col items-center justify-center gap-3 py-4">
                <p className="salsa-regular text-2xl text-[#E3694C]">
                  {food.name}
                </p>
                <p className="text-sm">{food.description}</p>

                <button className="rounded-md bg-[#E3694C] px-5 py-2">
                  Click to Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};

export default page;
