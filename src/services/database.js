// Dependencies
const fsPromises = require('fs').promises;
const path = require('path');
const jsonStringToObject = require('../services/jsonStringToObject');

// Container for the module
const database = {};

// Base directory of data folder
database.baseDir = path.join(__dirname, '/../../.data/');

// Write data to a file
database.create = async (dir, file, data) => {
  let filehandle = null;
  try {
    // Open the file for writing
    filehandle = await fsPromises.open(
      `${database.baseDir}${dir}/${file}.json`,
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
database.read = async (dir, file) => {
  let data;
  try {
    data = await fsPromises.readFile(
      `${database.baseDir}${dir}/${file}.json`,
      'utf8'
    );
    data = jsonStringToObject(data);
  } catch (err) {
    console.error(`Can't read a file, ${err}`);
    data = null;
  }

  return data;
};

// Update data in a file
database.update = async (dir, file, data) => {
  let filehandle = null;
  try {
    // Open the file for writing
    filehandle = await fsPromises.open(
      `${database.baseDir}${dir}/${file}.json`,
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
database.delete = async (dir, file) => {
  // Unlink the file from file system
  await fsPromises.unlink(`${database.baseDir}${dir}/${file}.json`);
};

// Export the module
module.exports = database;
