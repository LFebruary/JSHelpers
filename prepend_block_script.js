const fs = require('fs');
const path = require('path');

// Specified block to prepend to each JavaScript file
const specifiedBlock = `
/*
 * JSHelpers v1.0.0 https://github.com/LFebruary/JSHelpers
 * (c) 2024 LFebruary - Released under the MIT License (https://github.com/LFebruary/JSHelpers/blob/master/LICENSE)
 */
`;

// Directory containing JavaScript files
const srcDir = './src';

// Read all JavaScript files in the src directory
fs.readdir(srcDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    // Filter out non-JavaScript files
    const jsFiles = files.filter(file => path.extname(file) === '.js');

    // Prepend specified block to each JavaScript file
    jsFiles.forEach(file => {
        const filePath = path.join(srcDir, file);
        let fileContent = fs.readFileSync(filePath, 'utf8');

        // Prepend specified block to file content
        const updatedFileContent = specifiedBlock + fileContent;

        // Write the updated content back to the file
        fs.writeFileSync(filePath, updatedFileContent, 'utf8');

        console.log(`Specified block prepended to ${filePath}`);
    });
});