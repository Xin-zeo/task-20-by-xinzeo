const http = require('http');
const fs = require('fs').promises;

// Define the port number
const PORT = process.env.PORT || 3000;

// Function to handle routes based on the request
const handleRoutes = async (res, page) => {
    try {
        const htmlContent = await fs.readFile(page, 'utf-8');
        if (page == './public/pageNotFound.html') {
            res.writeHead(404, { 'Content-Type': 'text/html' });
        } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
        }
        res.end(htmlContent);
    } catch (error) {
        // Server error
        res.writeHead(500);
        res.end("Internal Server Error");
    }
};

// Create a server
const server = http.createServer((req, res) => {
    // Routing
    if (req.url === '/') {
        handleRoutes(res, './public/home.html');
    } else if (req.url === '/about') {
        handleRoutes(res, './public/about.html');
    } else if (req.url === '/contact') {
        handleRoutes(res, './public/contact.html');
    } else {
        // Handle invalid routes
        handleRoutes(res, './public/pageNotFound.html');
    }
});

// Start the server
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});