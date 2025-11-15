import { sheets } from "#utils/google/googleAuth.js";

export async function updateSheetValues(
    spreadsheetId: string,
    range: string,
    values: any[][]
) {
    await sheets.spreadsheets.values.update({
        spreadsheetId,
        range,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values
        }
    });
}

export async function clearSheet(
    spreadsheetId: string,
    range: string
) {
    await sheets.spreadsheets.values.clear({
        spreadsheetId,
        range
    });
}
