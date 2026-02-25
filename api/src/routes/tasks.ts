import { FastifyPluginAsync } from 'fastify';
import { google } from 'googleapis';
import path from 'node:path';
import fs from 'node:fs';
import { normalizeHeader, formatDate, validCellID, renderTasksPage } from '../utils';
import { Task } from '../types';

const SPREADSHEET_ID = process.env.SPREADSHEET_ID!;
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
const CREDENTIALS_PATH = path.join(process.cwd(), 'service_account_key.json');

const tasks: FastifyPluginAsync = async (fastify, opts): Promise<void> => {
  const keys = JSON.parse(fs.readFileSync(CREDENTIALS_PATH).toString());
  const jwt = new google.auth.JWT({
    email: keys.client_email,
    key: keys.private_key,
    scopes: SCOPES,
  });
  const sheets = google.sheets({
    version: 'v4',
    auth: jwt,
  });

  fastify.get('/tasks', async function (request, reply) {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: 'Darbi',
    });

    const [rawHeaders, ...rows] = response.data.values ?? [];
    const headers = rawHeaders.map(normalizeHeader);

    const allTasks = rows.map(row =>
      Object.fromEntries(headers.map((h, i) => [h, row[i] ?? null])),
    );
    const todoTasks = allTasks.filter(task => task.to_do === 'To do') as Task[];
    const html = renderTasksPage(todoTasks);

    reply.header('Content-Type', 'text/html; charset=utf-8').send(html);
  });

  fastify.post('/tasks', async function (request, reply) {
    const { id } = request.body as {
      id: string;
    };
    if (validCellID(id)) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SPREADSHEET_ID,
        range: `Darbi!${id}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [[formatDate(new Date().toISOString())]],
        },
      });
    }
    reply.redirect('/tasks');
  });
};

export default tasks;
