import sharp from 'sharp'
import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const assets = 'C:/Users/annyv/.cursor/projects/d-Programming-dm-tools-mgnovenie/assets'
const out = path.join(path.dirname(fileURLToPath(import.meta.url)), '../public/products')

const map = [
  ['hvoinyi-les.png', 'hvoinyi-les'],
  ['med-i-polyn.png', 'med-i-polyn'],
  ['uyutnyi-vecher.png', 'uyutnyi-vecher'],
  ['dikii-med.png', 'dikii-med'],
  ['teplyi-dom.png', 'teplyi-dom'],
  ['utrennii-tuman.png', 'utrennii-tuman'],
  ['tabak-i-vanil.png', 'tabak-i-vanil'],
  ['derevo-i-mokh.png', 'derevo-i-mokh'],
  ['les-posle-dozhdya.png', 'les-posle-dozhdya'],
  ['tsvetushchii-lug.png', 'tsvetushchii-lug'],
  ['hvoinyi-les-gallery-2.png', 'hvoinyi-les-2'],
  ['hvoinyi-les-gallery-3.png', 'hvoinyi-les-3'],
]

for (const [srcName, base] of map) {
  const src = path.join(assets, srcName)
  const resized = sharp(src).rotate().resize(800, 1000, { fit: 'cover', position: 'centre' })
  await resized.clone().webp({ quality: 82 }).toFile(path.join(out, `${base}.webp`))
  await resized.clone().avif({ quality: 55 }).toFile(path.join(out, `${base}.avif`))
  console.log('ok', base)
}

for (const f of await readdir(out)) {
  if (f.endsWith('.svg')) {
    await unlink(path.join(out, f))
    console.log('rm', f)
  }
}
