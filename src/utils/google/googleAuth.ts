import { google } from "googleapis";
import fs from "fs";
import env from "#config/env/env.js";

const credentials = JSON.parse(fs.readFileSync(env.GOOGLE_SERVICE_ACCOUNT, "utf8"));

const auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

export const sheets = google.sheets({ version: "v4", auth });
