import { join } from "path";

// Function to get the file path in the `/tmp` directory for serverless environments

export const getFilePath = (fileName: string) => {
  return join(process.cwd(), 'public', 'tmp', fileName);
};
