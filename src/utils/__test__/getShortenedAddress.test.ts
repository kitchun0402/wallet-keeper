import { getShortenedAddress } from '../getShortenedAddress'

describe('getShortenedAddress', () => {
  it('should return a shortened address with default trim values', () => {
    const address = '0x1234567890abcdef'
    const expected = '0x1234...cdef'
    const result = getShortenedAddress(address)
    expect(result).toEqual(expected)
  })

  it('should return a shortened address with custom trim values', () => {
    const address = '0x1234567890abcdef'
    const trimStart = 4
    const trimEnd = 8
    const expected = '0x12...90abcdef'
    const result = getShortenedAddress(address, trimStart, trimEnd)
    expect(result).toEqual(expected)
  })
})
