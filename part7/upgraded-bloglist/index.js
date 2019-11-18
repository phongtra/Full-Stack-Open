const http = require('http');
const app = require('./app');

const server = http.createServer(app);
const configs = require('./utils/configs');

server.listen(configs.PORT, () => {
  console.log(`Server running on port ${configs.PORT}`);
});
