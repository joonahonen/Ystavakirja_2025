require('dotenv').config();

const express = require('express');
const { google } = require('googleapis');
const transformSheetData = require('./utils/transformJSON');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

// Luodaan JWT autentikaatio API:lle
const auth = new google.auth.JWT(
    process.env.GOOGLE_CLIENT_EMAIL,
    null,
    process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
    ['https://www.googleapis.com/auth/spreadsheets']
);

// Luodaan Sheets API instanssi, sekä tarvittavat muuttujat
const sheets = google.sheets({ version: 'v4', auth });
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;
const RANGE = 'Sheet1!A1:F1000';

// Tietojen haku Google Sheetistä
app.get('/api/groups', async (req, res) => {
    try {
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
        });

        const data = response.data.values;
        const transformedData = transformSheetData.transformSheetData(data);
        res.json(transformedData);
    } catch (error) {
        console.error("Virhe hakiessa dataa Google Sheetistä:", error);
        res.status(500).send('Server virhe hakiessa tietoja');
    }
});

// Tietojen lisäys Google Sheettiin
app.post('/api/submit', async (req, res) => {
    try {
        const { groupID, name, age, birth, hobby } = req.body;

        // Tarkistetaan kentät
        if (!groupID || !name || !age || !birth || !hobby) {
            return res.status(400).send('Kaikki kentät pakollisia');
        }

        // Lisätään tiedot Sheettiin
        const appendResponse = await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: RANGE,
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                values: [[groupID, name, age, birth, hobby]],
            },
        });

        // Onnistuessa lähetetään 200
        console.log(appendResponse.data);
        res.status(200).send('Data submitted successfully');

    } catch (error) {
        // Jos virhe, lähetetään 500
        console.error("Virhe hakiessa dataa Google Sheetistä:", error);
        res.status(500).send('Server virhe hakiessa tietoja');
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
