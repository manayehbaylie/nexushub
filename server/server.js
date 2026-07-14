const path = require('path');
const dotenv = require('dotenv');

const envPath = path.join(__dirname, '.env');
const serverEnvPath = path.join(__dirname, 'server.env');
dotenv.config({ path: envPath, override: true });
dotenv.config({ path: serverEnvPath, override: true });

require('./config/db');
const app = require('./app');

const initialPort = Number(process.env.PORT || 5000);

const startServer = (port) => {
  const server = app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });

  server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
      const nextPort = port + 1;
      console.warn(`Port ${port} is already in use. Trying ${nextPort}...`);
      startServer(nextPort);
      return;
    }

    console.error('Failed to start server:', error);
    process.exit(1);
  });
};

startServer(initialPort);




// const authRoutes = require("./routes/auth");

// app.use("/api/auth", authRoutes);


// require("./config/db");

// const express = require("express");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.listen(5000, () => {
//   console.log("Server running on port 5000");
// });