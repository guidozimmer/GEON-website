import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize express app
const app = express();
const port = 3000;

// Resolve __dirname equivalent in ES Modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Send index.html on root request
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`App running on http://localhost:${port}`);
});
