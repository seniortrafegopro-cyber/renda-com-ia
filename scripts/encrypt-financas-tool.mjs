import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';

const projectRoot = path.resolve(import.meta.dirname, '..');
const codePath = path.join(projectRoot, '.fsm-access-code');
const sourcePath = path.join(projectRoot, 'private', 'financas-tool.html');
const outputPath = path.join(projectRoot, 'private', 'financas-tool.enc.json');

const code = fs.readFileSync(codePath, 'utf8').trim();
if (!code) throw new Error('Código de acesso ausente.');

const plaintext = fs.readFileSync(sourcePath);
const key = crypto.createHash('sha256').update(code, 'utf8').digest();
const iv = crypto.randomBytes(12);
const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);
const ciphertext = Buffer.concat([cipher.update(plaintext), cipher.final()]);

fs.writeFileSync(outputPath, JSON.stringify({
  version: 1,
  algorithm: 'aes-256-gcm',
  iv: iv.toString('base64'),
  tag: cipher.getAuthTag().toString('base64'),
  ciphertext: ciphertext.toString('base64'),
}));

process.stdout.write('Ferramenta protegida preparada.\n');
