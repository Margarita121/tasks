import { Task } from './types';
export function normalizeHeader(header: string): string {
  return header
    .trim()
    .toLowerCase()
    .normalize('NFD') // split accents
    .replace(/[\u0300-\u036f]/g, '') // remove accents
    .replace(/[^a-z0-9 ]/g, '') // remove symbols
    .replace(/\s+/g, '_'); // spaces to underscores
}

export function formatDate(date: string): string {
  return `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;
}

export function validCellID(id: string): Boolean {
  return /^[A-Z]\d{1,3}$/.test(id);
}

export function renderTasksPage(tasks: Task[]): string {
  let rows = '';

  for (const task of tasks) {
    rows += `
      <tr>
        <td>${task.kategorija}</td>
        <td>${task.kas_jadara}</td>
        <td>
          <form method="POST" action="/tasks">
            <input type="hidden" name="id" value="${'D' + (parseInt(task.nr) + 1)}">
            <input type="submit" value="Done">
          </form>
        </td>
      </tr>
    `;
  }

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8 name="viewport" content="width=device-width, initial-scale=1.0"">
  <title>Tasks</title>
  <style>
    body {
      font-family: serif;
      font-size: 48px;
      margin: 10px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      text-align: left;
      border: 1px solid #000;
      padding: 16px;
    }
    input[type="submit"] {
      font-size: 46px;
    }
  </style>
</head>
<body>
  <table>
    <tr>
      <th>Kategorija</th>
      <th>Kas jādara</th>
      <th></th>
    </tr>
    ${rows}
  </table>
  <script>
    setTimeout(function () {
      window.location.href = "/tasks";
    }, 86400000);
  </script>
</body>
</html>
`;
}
