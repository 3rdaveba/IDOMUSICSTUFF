import test from 'node:test'
import assert from 'node:assert/strict'
import { validateLocale } from '../scripts/check-content'
import { unflattenLocale } from '../scripts/locale-utils'

test('locale validation rejects missing array items and changed placeholders', () => {
  const source = { media: [{ caption: 'Hello {{name}}' }, { caption: 'Second' }] }
  assert.doesNotThrow(() => validateLocale(source, { media: [{ caption: 'Hola {{name}}' }, { caption: 'Segundo' }] }))
  assert.throws(() => validateLocale(source, { media: [{ caption: 'Hola {{name}}' }] }))
  assert.throws(() => validateLocale(source, { media: [{ caption: 'Hola {{person}}' }, { caption: 'Segundo' }] }))
  assert.throws(() => validateLocale(source, { media: [{ caption: '' }, { caption: 'Segundo' }] }))
})
test('locale reconstruction retains arrays and refuses conflicting or unsafe paths', () => {
  assert.deepEqual(unflattenLocale({ 'media[0].label': 'One', 'media[1].label': 'Two' }), { media: [{ label: 'One' }, { label: 'Two' }] })
  assert.throws(() => unflattenLocale({ '__proto__.polluted': 'yes' }))
  assert.throws(() => unflattenLocale({ 'item': 'text', 'item.child': 'conflict' }))
})


test('locale validation distinguishes arrays from numeric-key objects', () => {
  assert.throws(() => validateLocale({ list: ['a'] }, { list: { '0': 'b' } }))
})
