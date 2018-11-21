jest.setMock("react-native", {
  NativeModules: {
    RNReachability: {
      isReachable: jest.fn().mockResolvedValue(true)
    }
  }
})

describe("Network", () => {
  const { isReachable } = require("../src")

  it("resolves a promise", () => {
    expect.assertions(1)
    return expect(isReachable()).resolves.toBe(true)
  })
})
