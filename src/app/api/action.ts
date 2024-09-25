"use server"
import prisma from "../utils/connect"
import { getFilePath } from "../utils/filehelpers"

export async function addFood(formData: FormData) {
 
    await prisma.food.create({
        data: {
            name: formData.get('name') as string,
            image: getFilePath(''),
            description: formData.get('description') as string,
            selectedTime: formData.getAll('TOD') as string[],
            selectedMood: formData.getAll('mood') as string[]
        }
       
    }) 

}