const fs = require('fs');
const path = require('path');

const excludeDirs = ['node_modules', '.git', '.next', 'public'];
const extensions = ['.tsx', '.ts', '.css', '.md', '.json'];

function replaceInFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf8');
    let newContent = content.replace(/DUCERE/g, 'DOCERE').replace(/ducere/g, 'docere');

    // special rule for the domain since it shouldn't change
    newContent = newContent.replace(/admin@docere.app/g, 'admin@ducere.app')
        .replace(/mentor@docere.app/g, 'mentor@ducere.app')
        .replace(/student@docere.app/g, 'student@ducere.app')
        .replace(/priya@docere.app/g, 'priya@ducere.app')
        .replace(/ananya@docere.app/g, 'ananya@ducere.app')
        .replace(/rahul@docere.app/g, 'rahul@ducere.app')
        .replace(/vikram@docere.app/g, 'vikram@ducere.app');

    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf8');
        console.log(`Updated: ${filePath}`);
    }
}

function processDirectory(dir) {
    const files = fs.readdirSync(dir);

    for (const file of files) {
        const fullPath = path.join(dir, file);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
            if (!excludeDirs.includes(file)) {
                processDirectory(fullPath);
            }
        } else {
            const ext = path.extname(file);
            if (extensions.includes(ext) || file === '.env.local.example') {
                try {
                    replaceInFile(fullPath);
                } catch (e) {
                    console.error(`Failed on ${fullPath}:`, e);
                }
            }
        }
    }
}

console.log('Starting replacement...');
processDirectory(__dirname);
console.log('Done!');
