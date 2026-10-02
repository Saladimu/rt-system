// Mock test for gsheetService
const gsheetService = require('./gsheetService');

describe('Google Sheets Service', () => {
  // Since we're mocking, we'll just test that the functions exist
  test('should have getRows function', () => {
    expect(typeof gsheetService.getRows).toBe('function');
  });

  test('should have addRow function', () => {
    expect(typeof gsheetService.addRow).toBe('function');
  });

  test('should have updateRow function', () => {
    expect(typeof gsheetService.updateRow).toBe('function');
  });

  test('should have deleteRow function', () => {
    expect(typeof gsheetService.deleteRow).toBe('function');
  });

  test('should have getHeaders function', () => {
    expect(typeof gsheetService.getHeaders).toBe('function');
  });
});