const express = require('express');
const path = require('path');
const extractVideoUrl = require('./extractor');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000; // Use dynamic port

// Enable CORS for frontend requests
app.use(cors());

// Parse JSON bodies
app.use(express.json());

// Serve static files (if needed)
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint to trigger video URL extraction
app.post('/extract', async (req, res) => {
  console.log('Extraction request received');

  const { hunterPageUrl, imdbId } = req.body;

  if (!hunterPageUrl) {
    return res.status(400).json({ error: 'Missing hunterPageUrl parameter' });
  }

  console.log('IMDB ID:', imdbId);
  console.log('Hunter Page URL:', hunterPageUrl);

  try {
    const videoUrl = await extractVideoUrl(hunterPageUrl);
    console.log('Extraction result:', videoUrl);
    res.json({ videoUrl });
  } catch (error) {
    console.error('Extraction error:', error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Ready to extract video URLs');
});
