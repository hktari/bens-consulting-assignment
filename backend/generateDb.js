const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, 'data', 'products.json');
const companiesFilePath = path.join(__dirname, 'data', 'companies.json');
const productDetailsFolderPath = path.join(__dirname, 'data', 'product-details');
const outputFilePath = path.join(__dirname, 'db.json');

const generateDbJson = async () => {
  try {
    // Read the products JSON file
    const productsFileContent = fs.readFileSync(productsFilePath, 'utf-8');
    const productsJsonData = JSON.parse(productsFileContent);
    const productsData = productsJsonData.data;

    // Read the companies JSON file
    const companiesFileContent = fs.readFileSync(companiesFilePath, 'utf-8');
    const companiesJsonData = JSON.parse(companiesFileContent);
    const companiesData = companiesJsonData.data;

    // Add description to each product
    for (const product of productsData) {
      const productDetailsFilePath = path.join(productDetailsFolderPath, `${product.id}.json`);
      if (fs.existsSync(productDetailsFilePath)) {
        const productDetailsContent = fs.readFileSync(productDetailsFilePath, 'utf-8');
        const productDetailsJson = JSON.parse(productDetailsContent);
        product.description = productDetailsJson.data.description;
      } else {
        product.description = null; // or any default value if the details file does not exist
      }
    }

    // Create the output format
    const outputData = {
      products: productsData,
      companies: companiesData
    };

    // Write the output data to db.json
    fs.writeFileSync(outputFilePath, JSON.stringify(outputData, null, 2));
    console.log(`Data written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error generating db.json:', error);
  }
};

console.log('Generating db.json...');

generateDbJson();