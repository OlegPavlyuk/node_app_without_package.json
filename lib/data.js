// Dependencies
const fsPromises = require('fs').promises;
const path = require('path');

// Container for the module
const lib = {};

// Base directory of data folder
lib.baseDir = path.join(__dirname, '/../.data/');

// Write data to a file
lib.create = async (dir, file, data) => {
  let filehandle = null;
  try {
    // Open the file for writing
    filehandle = await fsPromises.open(
      `${lib.baseDir}${dir}/${file}.json`,
      'wx'
    );

    // Convert data to string.
    const stringData = JSON.stringify(data);

    // Write stringData to a file
    await filehandle.writeFile(stringData);
  } catch (err) {
    console.error(`Could not create new file, ${err}`);
  } finally {
    if (filehandle) {
      // Close the file if it is opened.
      await filehandle.close();
    }
  }
};

// Read data from a file
lib.read = async (dir, file) => {
  let data;
  try {
    data = await fsPromises.readFile(
      `${lib.baseDir}${dir}/${file}.json`,
      'utf8'
    );
    console.log(data);
  } catch (err) {
    console.error(`Can't read a file, ${err}`);
    data = null;
  }

  return data;
};

// Update data in a file
lib.update = async (dir, file, data) => {
  let filehandle = null;
  try {
    // Open the file for writing
    filehandle = await fsPromises.open(
      `${lib.baseDir}${dir}/${file}.json`,
      'r+'
    );

    // Convert data to string.
    const stringData = JSON.stringify(data);

    // Truncate the file.
    await filehandle.truncate();

    // Write to the file
    await filehandle.writeFile(stringData);
  } catch (err) {
    console.error(`Can't update a file, ${err}`);
  } finally {
    if (filehandle) {
      // Close the file if it is opened.
      await filehandle.close();
    }
  }
};

// Delete file
lib.delete = async (dir, file) => {
  // Unlink the file from file system
  await fsPromises.unlink(`${lib.baseDir}${dir}/${file}.json`);
};

// Export module
module.exports = lib;
