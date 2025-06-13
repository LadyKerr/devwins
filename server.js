// Simple Express server to handle POST requests and append to Google Sheets
// 1. Install dependencies: npm install express googleapis cors dotenv
// 2. Set up a Google Cloud project, enable Sheets API, and download credentials.json
// 3. Place credentials.json in the root of this server folder
// 4. Create a .env file with SHEET_ID=your_google_sheet_id

const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
const fs = require('fs');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const SHEET_ID = process.env.SHEET_ID;

// Load client secrets from a local file.
const auth = new google.auth.GoogleAuth({
  keyFile: 'credentials.json',
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

app.post('/api/win', async (req, res) => {
  try {
    const sheets = google.sheets({ version: 'v4', auth: await auth.getClient() });
    const win = req.body;
    const values = [[
      win.year,
      win.month,
      win.description,
      win.measurable,
      win.details,
      win.technical,
      win.category,
      win.image
    ]];
    await sheets.spreadsheets.values.append({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      requestBody: { values },
    });
    res.status(200).json({ message: 'Win added to Google Sheet!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
