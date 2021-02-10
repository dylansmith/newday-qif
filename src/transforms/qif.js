const path = require('path')
const { promisify } = require('util')
const csv = require('csv')
const { readFile } = require('fs-extra')

const parse = promisify(csv.parse)

function buildTargetPath (fp) {
  const { dir, name } = path.parse(fp)
  return path.join(dir, `${name}.qif`)
}

function splitDescription (input) {
  const parts = input.Description.split(/\s{2,}/)
  input.Payee = String(parts.shift()).trim()
  input.Memo = String(parts.join(' ')).trim()
  return input
}

function omitPending (input) {
  return input.Date !== 'Pending'
}

async function transformInput (file) {
  const csv = await readFile(file, { encoding: 'utf-8' })
  const parsed = await parse(csv, { columns: true })
  const records = parsed.filter(omitPending).map(splitDescription).map(transformRecord)
  const output = records.length ? ['!Type:Bank', ...records].join('\n') + '\n' : undefined
  return {
    file,
    csv,
    records,
    output
  }
}

function transformRecord (input) {
  const amt = parseFloat(input['Amount(GBP)']) || 0.00
  const field = (val, prefix) => [undefined, ''].includes(val) === false ? `${prefix}${val}` : null
  return [
    field(input.Date, 'D'),
    field(-amt, 'T'),
    field(input.Payee, 'P'),
    field(input.Memo, 'M'),
    '^'
  ]
    .filter(i => i !== null)
    .join('\n')
}

module.exports = {
  buildTargetPath,
  transformInput
}
