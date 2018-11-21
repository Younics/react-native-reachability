import React from "react"
import renderer from "react-test-renderer"

jest.setMock("react-native", {
  NativeModules: {
    RNReachability: {
      startListener: jest.fn((hostname, port, timeout) => {
        if (typeof hostname !== "string")
          throw Error("Hostname is not a string")
        if (typeof port !== "number" || port < 1)
          throw Error("Port is not a number or is less than 0")
        if (typeof timeout !== "number" || timeout < 1)
          throw Error("Timeout is not a number or is less than 0")
      }),
      stopListener: jest.fn(),
      isReachable: jest.fn().mockResolvedValue(true)
    }
  },
  DeviceEventEmitter: {
    addListener: jest.fn()
  },
  Platform: {
    OS: "android"
  }
})

describe("isReachable", () => {
  const { isReachable } = require("../src")

  it("resolves a promise", () => {
    expect.assertions(1)
    expect(isReachable()).resolves.toBe(true)
  })
})

describe("Network component", () => {
  const { Network } = require("../src")

  it("renders without throwing", () => {
    const tree = renderer.create(<Network />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})
