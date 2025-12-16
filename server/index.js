const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());

app.get('/health', (req, res) => {
  res.json({ status: "TravelGuard API OK" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
