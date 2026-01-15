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
