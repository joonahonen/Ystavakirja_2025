require('dotenv').config();

const express = require('express');
const { google } = require('googleapis');
const app = express();

app.use(express.json());

const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
);

const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

app.get('/', (req, res) => {
  
});

app.post('/api/data', (req, res) => {

});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
