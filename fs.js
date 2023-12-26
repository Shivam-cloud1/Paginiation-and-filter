
import fs from 'fs/promises';


async function readJsonFile(filePath) {
  try {
    const jsonData = await fs.readFile(filePath, 'utf8');
    return JSON.parse(jsonData);
  } catch (error) {
    console.error('Error reading JSON file:', error.message);
    return null;
  }
}

const filePath = './studentData.json';

const jsonData = await readJsonFile(filePath);

if (jsonData) {
  console.log('Retrieved JSON data:', jsonData);
} else {
  console.log('Failed to retrieve JSON data.');
}

export default jsonData;
