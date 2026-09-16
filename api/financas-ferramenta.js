import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const ACCESS_HASH = 'f81de25663f64560bcf399ac5a12a7e6d92fbb1b7f40e6b0c8200b61ef154f86';

function digest(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function matchesAccessCode(value) {
  const candidate = Buffer.from(digest(value), 'hex');
  const expected = Buffer.from(ACCESS_HASH, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

function readCookie(header, name) {
  for (const part of String(header || '').split(';')) {
    const [key, ...rest] = part.trim().split('=');
    if (key === name) return decodeURIComponent(rest.join('='));
  }
  return '';
}

function decryptTool(code) {
  const encryptedPath = path.join(process.cwd(), 'private', 'financas-tool.enc.json');
  const payload = JSON.parse(fs.readFileSync(encryptedPath, 'utf8'));
  const key = crypto.createHash('sha256').update(code, 'utf8').digest();
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, Buffer.from(payload.iv, 'base64'));
  decipher.setAuthTag(Buffer.from(payload.tag, 'base64'));
  return Buffer.concat([
    decipher.update(Buffer.from(payload.ciphertext, 'base64')),
    decipher.final(),
  ]).toString('utf8');
}

export default function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).end();
  }

  const code = readCookie(req.headers.cookie, 'fsm_access');
  if (!code || !matchesAccessCode(code)) {
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('Location', '/financas-sob-medida/ferramenta/');
    return res.status(302).end();
  }

  try {
    const html = decryptTool(code);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 'private, no-store, max-age=0');
    res.setHeader('X-Robots-Tag', 'noindex, nofollow');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    return res.status(200).send(html);
  } catch {
    res.setHeader('Cache-Control', 'no-store');
    return res.status(500).send('Não foi possível abrir a ferramenta.');
  }
}
