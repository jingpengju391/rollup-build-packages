/* eslint-disable no-undef */
const { sum } = require('../packages/index')
test('sum success', () => {
  expect(sum(1, 2)).toBe(3)
})
