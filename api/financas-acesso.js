import crypto from 'node:crypto';

const ACCESS_HASH = 'f81de25663f64560bcf399ac5a12a7e6d92fbb1b7f40e6b0c8200b61ef154f86';

function digest(value) {
  return crypto.createHash('sha256').update(value, 'utf8').digest('hex');
}

function matchesAccessCode(value) {
  const candidate = Buffer.from(digest(value), 'hex');
  const expected = Buffer.from(ACCESS_HASH, 'hex');
  return candidate.length === expected.length && crypto.timingSafeEqual(candidate, expected);
}

export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
  const code = typeof body.code === 'string' ? body.code.trim() : '';
  if (!code || code.length > 128 || !matchesAccessCode(code)) {
    return res.status(401).json({ ok: false });
  }

  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Set-Cookie', `fsm_access=${encodeURIComponent(code)}; Path=/financas-sob-medida/ferramenta; Max-Age=7776000; HttpOnly; Secure; SameSite=Lax`);
  return res.status(200).json({ ok: true });
}
