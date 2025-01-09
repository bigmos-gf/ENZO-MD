const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNE1pVVRVbmZIcHlzemFRaDZXcWNHNWtOOWd6eU01Zzk2RTVuMjBlSGlGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYmVoaFZsWlpLZjFCdjdZQU1xQ0dqakRkZ3c4dHl1Z0h3MVVlNXBXQzd4bz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDSi9qNFlYL3V1L3NndG43QWVpZE5WYmJWbmUzc1pDNldDK1REN0hHMFZRPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJOMy9sVGNncFpkelY0YzVUS3l0aXM1MnM3c0d4cVJoU0U1SjBjckNLM1J3PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IllNRWM3eTJEWndPbVlJdFRKRlVKSzNLYzV3dWJiYmNLZmVCSldOaXRCSDg9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImJDSForbjFlL0ZsbEo4bXpjRUhyMjRtRHZ4U08rRGczL0tod1U1ZHRUWEU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pjTWNORTNNYnZ1a1ZZS3E2WnpORW5xbjZOeDY2Rk9saW9wTmV0OHoxRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZzMyZU1lYU9KcE1VMzV0MEg1TE42eWNRTW9NazYzYjZBYU5ib3A5WXRYYz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklwNUNtdnJKanNFa01SYm82ZDExU3BlTWxEYnBPVXNkV1hrbktRY1E5UXpVSHNzNGZHdFZ2U01yL25Od25IQ083TnJ2b3d0QkdLSTdwM0FlQXJRSWpnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI5LCJhZHZTZWNyZXRLZXkiOiJvUUwrNjZSUmFKTERDN1FTWWZlK0ZWVlN0aG53V2d0TzcwOStPTXQ5OExZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUaXRXMV9aU1JOaXRuVV95WnkxUlpnIiwicGhvbmVJZCI6IjdkMjljYmVjLTY2ODAtNDZlYS1hNjg3LWJlYTkwMDVjNGJlYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVV0pGTURZMGJ0QmJrLzVtSmZmRmhQMjZQRnM9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiN1RSbk5OOEhWTmRUdEo0b2FvR2lURGRzbkxBPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjE0RVA1MUdKIiwibWUiOnsiaWQiOiIyMzQ5MTI5NDk1MTg0OjQzQHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMbjI4N2tIRU8ybWdMd0dHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJaRlBNSGdseTFNb091bUZtUE5PMld0MTkzN0prSVZ1Vm1QM1NwRlJOVlM0PSIsImFjY291bnRTaWduYXR1cmUiOiJwNmdGOE1mM0xObmxrTGY1ODZTYUVVcnplV0V4MEY5VWJPK0RiRmFmSUp2Q255Y0F1MWhRdmRWQlRmUytxaUpOUjFvTlBTZGlhU2NqOHhVc296TEhBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiQTkvM1JoTm5UNThsVFJSOXZkKzlBV0JjZXB0U3ByS3YzQXNaQUkwa0RIY2lOYXZIVXhUUUVuNzhLeWVQQVVsdEZOMzVaMTgxeVJ1SytTK2FPMzE2aUE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ5MTI5NDk1MTg0OjQzQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQldSVHpCNEpjdFRLRHJwaFpqelR0bHJkZmQreVpDRmJsWmo5MHFSVVRWVXUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MzY0NDY4NDIsIm15QXBwU3RhdGVLZXlJZCI6IkFDb0FBQWxJIn0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
