jest.setMock('react-native', {
  NativeModules: {
    RNReachability: {
      isReachable: jest.fn().mockResolvedValue(1)
    }
  }
})

describe('Network', () => {
  const Network = require('../index')

  it('resolves a promise', () => {
    expect.assertions(1)
    return expect(Network.isReachable()).resolves.toBe(true)
  })
})
