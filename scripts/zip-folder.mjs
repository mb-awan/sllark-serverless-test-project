import fs from 'fs';
import archiver from 'archiver';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to the folders
const foldersToZip = ['../node_modules', '../src'];
const outputFileName = '../lambda.zip';

async function zipFolders() {
  try {
    const outputFilePath = path.join(__dirname, outputFileName);

    // Check if the zip file already exists and delete it
    if (fs.existsSync(outputFilePath)) {
      fs.unlinkSync(outputFilePath);
      console.log('Deleted existing zip file...');
    }
    console.log('Creating new zip file...');

    const output = fs.createWriteStream(outputFilePath);
    const archive = archiver('zip', {
      zlib: { level: 9 }, // Compression level
    });

    // Log completion message
    output.on('close', () => {
      console.log('Success! Zip file has been created.');
      console.log(`Total bytes: ${archive.pointer()}`);
    });

    archive.on('error', (err) => {
      throw err;
    });

    archive.pipe(output);

    // Append folders to the zip
    for (const folder of foldersToZip) {
      const folderPath = path.join(__dirname, folder);
      if (fs.existsSync(folderPath)) {
        archive.directory(folderPath, folder);
      } else {
        console.log(
          `Warning: Folder '${folder}' does not exist and will be skipped.`
        );
      }
    }

    await archive.finalize();
  } catch (error) {
    console.error(`Error creating zip file: ${error.message}`);
  }
}

// Execute the function
zipFolders();
