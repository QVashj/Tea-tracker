const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

// .env dosyasındaki çevresel değişkenleri yükle
dotenv.config();

// Express uygulaması oluştur
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Anasayfa
app.get('/', (req, res) => {
  res.send('Crypto Portfolio Tracker API');
});

// Coin verisini almak için bir endpoint oluştur
app.get('/price/:coin', async (req, res) => {
  const { coin } = req.params;

  try {
    const response = await axios.get(
      `https://api.coingecko.com/api/v3/simple/price?ids=${coin}&vs_currencies=usd`
    );
    if (!response.data[coin]) {
      return res.status(404).json({ message: 'Coin not found' });
    }
    res.json({
      coin: coin,
      price: response.data[coin].usd,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
