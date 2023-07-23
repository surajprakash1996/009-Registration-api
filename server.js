require('dotenv').config();
const PORT = process.env.PORT || 3003;

const http = require('http');
const app = require('./app');
const server = http.createServer(app);


server.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})