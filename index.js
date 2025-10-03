const express = require('express');
const app = express();

const PORT = 3000;

app.get('/test', (req, res) => {
  res.send('Salom Shuxrat');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT}-portda ishlayapti...`);
});
