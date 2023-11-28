const fs = require('fs');
const path = require('path');

const distPath = path.join(__dirname, '/dist');
const healthPath = path.join(distPath, '/health');

if (!fs.existsSync(healthPath)) {
    fs.mkdirSync(healthPath, { recursive: true });
}

const healthIndexContent = '<html><body><h1>Health Check</h1></body></html>';
fs.writeFileSync(path.join(healthPath, 'index.html'), healthIndexContent);

console.log('Health folder and index.html created successfully.');
