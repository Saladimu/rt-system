const { google } = require('googleapis');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../../.env') });

// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
// The ID of the spreadsheet to use.
const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID;

// Load client secrets from a local file.
async function getAuthClient() {
  const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve(__dirname, '../../credentials.json'),
    scopes: SCOPES,
  });
  return await auth.getClient();
}

/**
 * Get rows from a sheet
 * @param {string} sheetName - Name of the sheet/tab
 * @returns {Promise<Array>} - Array of rows (each row is an object with column headers as keys)
 */
async function getRows(sheetName) {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
    });
    const rows = res.data.values;
    if (!rows || rows.length === 0) {
      return [];
    }
    // Assume first row contains headers
    const headers = rows[0];
    const data = rows.slice(1).map(row => {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header] = row[index] !== undefined ? row[index] : '';
      });
      return obj;
    });
    return data;
  } catch (err) {
    console.error('Error getting rows from Google Sheets:', err);
    throw err;
  }
}

/**
 * Add a new row to a sheet
 * @param {string} sheetName - Name of the sheet/tab
 * @param {Object} rowData - Object where keys are column headers
 * @returns {Promise<Object>} - Response from Google Sheets API
 */
async function addRow(sheetName, rowData) {
  try {
    // First get current headers to ensure order
    const headers = await getHeaders(sheetName);
    // Create row array in correct order
    const rowValues = headers.map(header => rowData[header] !== undefined ? rowData[header] : '');
    
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A:Z`,
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [rowValues],
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error adding row to Google Sheets:', err);
    throw err;
  }
}

/**
 * Update a row in a sheet (by matching a column value)
 * @param {string} sheetName - Name of the sheet/tab
 * @param {string} matchColumn - Column name to match for finding row
 * @param {*} matchValue - Value to match in matchColumn
 * @param {Object} updateData - Object with column names and new values
 * @returns {Promise<Object>} - Response from Google Sheets API
 */
async function updateRow(sheetName, matchColumn, matchValue, updateData) {
  try {
    const rows = await getRows(sheetName);
    const headers = await getHeaders(sheetName);
    
    // Find row index (0-based in data array, but +2 for header row and 1-based index)
    const rowIndex = rows.findIndex(row => row[matchColumn] == matchValue);
    if (rowIndex === -1) {
      throw new Error(`No row found with ${matchColumn} = ${matchValue}`);
    }
    
    // Calculate the actual row number in the sheet (1-based, plus header row)
    const sheetRowNumber = rowIndex + 2;
    
    // Prepare updated row data
    const updatedRow = headers.map(header => {
      if (updateData[header] !== undefined) {
        return updateData[header];
      }
      // Keep existing value if not being updated
      return rows[rowIndex][header] !== undefined ? rows[rowIndex][header] : '';
    });
    
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A${sheetRowNumber}:Z${sheetRowNumber}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updatedRow],
      },
    });
    return res.data;
  } catch (err) {
    console.error('Error updating row in Google Sheets:', err);
    throw err;
  }
}

/**
 * Delete a row from a sheet (by matching a column value)
 * @param {string} sheetName - Name of the sheet/tab
 * @param {string} matchColumn - Column name to match for finding row
 * @param {*} matchValue - Value to match in matchColumn
 * @returns {Promise<Object>} - Response from Google Sheets API
 */
async function deleteRow(sheetName, matchColumn, matchValue) {
  try {
    const rows = await getRows(sheetName);
    const headers = await getHeaders(sheetName);
    
    // Find row index
    const rowIndex = rows.findIndex(row => row[matchColumn] == matchValue);
    if (rowIndex === -1) {
      throw new Error(`No row found with ${matchColumn} = ${matchValue}`);
    }
    
    // Calculate the actual row number in the sheet (1-based, plus header row)
    const sheetRowNumber = rowIndex + 2;
    
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    // We'll clear the row contents instead of deleting to maintain structure
    const res = await sheets.spreadsheets.values.clear({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!A${sheetRowNumber}:Z${sheetRowNumber}`,
    });
    return res.data;
  } catch (err) {
    console.error('Error deleting row from Google Sheets:', err);
    throw err;
  }
}

/**
 * Get headers from a sheet
 * @param {string} sheetName - Name of the sheet/tab
 * @returns {Promise<Array>} - Array of header strings
 */
async function getHeaders(sheetName) {
  try {
    const auth = await getAuthClient();
    const sheets = google.sheets({ version: 'v4', auth });
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${sheetName}!1:1`,
    });
    const headers = res.data.values?.[0] || [];
    return headers;
  } catch (err) {
    console.error('Error getting headers from Google Sheets:', err);
    throw err;
  }
}

module.exports = {
  getRows,
  addRow,
  updateRow,
  deleteRow,
  getHeaders,
};