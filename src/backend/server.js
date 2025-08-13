require('dotenv').config();

const express = require('express');
const { google } = require('googleapis');
const { transformSheetData } = require('./utils/transformJSON');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Luodaan autentikaatio API:lle
const auth = new google.auth.GoogleAuth({
    credentials: {
        client_email: process.env.GOOGLE_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});
const sheets = google.sheets({ version: 'v4', auth });

// Apuri: Hakee kaikki rivit Google Sheetistä
async function getSheetRows() {
    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.GOOGLE_SHEET_ID,
        range: 'Taulukko1',
    });
    return res.data.values;
}

// Tietojen haku Google Sheetistä. Palauttaa kaikki ihmiset JSON-muodossa
app.get('/api/groups', async (req, res) => {
    try {
        const rows = await getSheetRows();
        const data = transformSheetData(rows);
        res.json(data);
    } catch (err) {
        console.error('Virhe GET /api/groups:', err);
        res.status(500).json({ error: 'Tietojen haku Google Sheetistä epäonnistui.' });
    }
});

// Tietojen lisäys Google Sheettiin
app.post('/api/submit', async (req, res) => {
    try {
        const { groupID, name, age, birth, hobby } = req.body;

        // Tarkistetaan kentät
        if (!groupID || !name || !age || !birth || !hobby) {
            return res.status(400).json({ error: 'Kaikkien kenttien tulee olla täytetty.' });
        }

        // Lisätään tiedot Sheettiin
        await sheets.spreadsheets.values.append({
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            range: 'Taulukko1',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [[groupID, name, age, birth, hobby]],
            },
        });

        // Onnistuessa lähetetään 200
        console.log('Tietojen lisäys onnistui:', { groupID, name, age, birth, hobby });
        res.status(201).json({ message: 'Tietojen lisäys onnistui.' });

    } catch (error) {
        // Jos virhe, lähetetään 500
        console.error('Virhe POST /api/submit:', error);
        res.status(500).json({ error: 'Tietojen lähetys Google Sheettiin epäonnistui.' });
    }
});


app.listen(3000, () => {
    console.log('Server kaynnissa portilla 3000');
});

