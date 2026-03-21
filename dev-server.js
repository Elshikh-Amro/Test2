// Simple development server for Welcome to Programming exercises
// Run with: node dev-server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8001;
const ROOT_DIR = path.join(__dirname, 'site');

const server = http.createServer((req, res) => {
    let filePath = path.join(ROOT_DIR, req.url);

    // Default to index.html for root
    if (req.url === '/' || req.url === '') {
        filePath = path.join(ROOT_DIR, 'index.html');
    }

    // Check if file exists
    fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
            res.writeHead(404);
            res.end('File not found');
            return;
        }

        // Read and serve the file
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.writeHead(500);
                res.end('Server error');
                return;
            }

            // Set content type based on file extension
            const ext = path.extname(filePath);
            let contentType = 'text/plain';

            switch (ext) {
                case '.html': contentType = 'text/html'; break;
                case '.css': contentType = 'text/css'; break;
                case '.js': contentType = 'text/javascript'; break;
                case '.json': contentType = 'application/json'; break;
            }

            res.writeHead(200, { 'Content-Type': contentType });
            res.end(data);
        });
    });
});

server.listen(PORT, () => {
    console.log(`Development server running at http://localhost:${PORT}`);
    console.log('Press Ctrl+C to stop');
});