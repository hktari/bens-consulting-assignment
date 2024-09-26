const fs = require("fs");
const path = require("path");

const inputFilePath = path.join(__dirname, "data", "products.json");
const outputFilePath = path.join(__dirname, "db.json");

const generateDbJson = async () => {
  try {
    // Read the input JSON file
    const fileContent = fs.readFileSync(inputFilePath, "utf-8");
    const jsonData = JSON.parse(fileContent);

    // Extract the data array
    const productsData = jsonData.data;

    // Create the output format
    const outputData = {
      products: productsData,
    };

    // Write the output data to db.json
    fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
    console.log(`Data written to ${outputFilePath}`);
  } catch (error) {
    console.error("Error generating db.json:", error);
  }
};

generateDbJson();
