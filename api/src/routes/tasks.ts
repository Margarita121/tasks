import { FastifyPluginAsync } from 'fastify'
import { google } from "googleapis";
import path from 'node:path'
import fs from 'node:fs'
import { normalizeHeader } from './utils';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'service_account_key.json');

const tasks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  fastify.get('/api/tasks', async function (request, reply) {
    const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH).toString())
        const jwt = new google.auth.JWT({
            email: keys.client_email,
            key: keys.private_key,
            scopes: SCOPES
        })
        const sheets = google.sheets({
                version: 'v4',
                auth: jwt
            });
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SPREADSHEET_ID,
        range: "Darbi",
      });

      const [rawHeaders, ...rows] = response.data.values ?? [];
      const headers = rawHeaders.map(normalizeHeader)

      const data = rows.map( row =>
        Object.fromEntries(
          headers.map((h, i) => [h, row[i] ?? null])
        )
      )

    return data
  })
}

export default tasks
