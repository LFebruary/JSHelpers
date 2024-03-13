const fs = require('fs');
const path = require('path');

// Read package.json
const packageJson = require('./package.json');

function updateDocs() {
    // Get the version from package.json
    const version = packageJson.version;

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

        // Update version in each JavaScript file
        jsFiles.forEach(file => {
            const filePath = path.join(srcDir, file);
            let fileContent = fs.readFileSync(filePath, 'utf8');

            // Update the version in the comment
            const updatedFileContent = fileContent.replace(/(JSHelpers v)[\d.]+/, `$1${version}`);

            // Write the updated content back to the file
            fs.writeFileSync(filePath, updatedFileContent, 'utf8');

            console.log(`Version updated to ${version} in ${filePath}`);
        });
    });
}

updateDocs();