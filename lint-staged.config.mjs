import path from 'node:path'

const webRoot = path.resolve('apps/web')

/** @param {string[]} files */
function toWebPaths(files) {
  return files
    .map((file) => path.relative(webRoot, path.resolve(file)))
    .map((file) => file.split(path.sep).join('/'))
    .filter((file) => file && !file.startsWith('..'))
}

/** @param {string} bin @param {string[]} files @param {string[]} [extra] */
function webExec(bin, files, extra = []) {
  const rel = toWebPaths(files)
  if (!rel.length) return []
  return [`npm --prefix apps/web exec -- ${bin} ${extra.join(' ')} ${rel.join(' ')}`.replace(/\s+/g, ' ').trim()]
}

export default {
  'apps/web/**/*.{js,mjs,cjs,ts,vue}': (files) => webExec('eslint', files, ['--fix', '--no-warn-ignored']),
  'apps/web/**/*.{css,vue}': (files) => webExec('stylelint', files, ['--fix', '--allow-empty-input']),
  'apps/web/**/*.{js,mjs,cjs,ts,vue,css,json,md}': (files) => webExec('prettier', files, ['--write']),
}
