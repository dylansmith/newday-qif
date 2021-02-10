/* eslint-env jest */

const fs = require('fs')
const path = require('path')
const qif = require('./qif')

const fixturesDir = path.resolve(__dirname, '../__fixtures__')

describe('transforms/qif', () => {
  describe('#buildTargetPath', () => {
    it('should add a suffix to the filename', () => {
      expect(qif.buildTargetPath('foo')).toEqual('foo.qif')
      expect(qif.buildTargetPath('foo.csv')).toEqual('foo.qif')
      expect(qif.buildTargetPath('foo/bar.csv')).toEqual('foo/bar.qif')
    })
  })

  describe('#transformInput', () => {
    const fixturePath = `${fixturesDir}/fixture_input.csv`
    let actual

    beforeEach(async () => {
      actual = await qif.transformInput(fixturePath)
    })

    it('should return metadata', () => {
      expect(actual.file).toEqual(fixturePath)
      expect(actual.csv).toEqual(fs.readFileSync(fixturePath, { encoding: 'utf8' }))
    })

    it('should return parsed records', () => {
      expect(actual.records).toMatchSnapshot()
    })

    it('should return the qif output', () => {
      const expected = fs.readFileSync(`${fixturesDir}/fixture_output.qif`, { encoding: 'utf8' })
      expect(`${actual.output}`).toEqual(expected)
    })

    it('should return undefined output for empty input', async () => {
      actual = await qif.transformInput(`${fixturesDir}/fixture_input_empty.csv`)
      expect(actual.output).toEqual(undefined)
    })
  })
})
