import { writeFile, mkdir } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { dirname } from "path";
import prisma from "@/app/utils/connect"; 
import { getFilePath } from "../../utils/filehelpers"; 

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;

    if (!file) {
      return NextResponse.json({ success: false, message: 'No file uploaded.' });
    }

    const bytes = await file.arrayBuffer();
    const uint8Array = new Uint8Array(bytes); 
    const path = getFilePath(file.name);

    // Ensure the directory exists
    await mkdir(dirname(path), { recursive: true });

    // Write the file
    await writeFile(path, uint8Array); // Use Uint8Array instead of Buffer

    console.log(`File saved at: ${path}`);

    // Store the file path and other data in Prisma
    const foodEntry = await prisma.food.create({
      data: {
        name: data.get('name') as string,
        image: `/tmp/${file.name}`, // Store the temporary file path in the database
        description: data.get('description') as string,
        selectedTime: data.getAll('TOD') as string[],
        selectedMood: data.getAll('mood') as string[],
      }
    });

    return NextResponse.json({ success: true, message: 'File uploaded and data saved successfully.', foodEntry });
  } catch (error: any) {
    console.error("Error uploading file or saving data:", error);
    return NextResponse.json({ success: false, message: 'Error uploading file or saving data.', error: error.message });
  }
}
