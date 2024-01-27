// @ts-expect-error - Not sure why this is breaking.
import fetchMock from 'fetch-mock-jest';
// @ts-expect-error - Types aren't here.
import { Headers, Request, Response } from 'node-fetch';
import { Blob } from 'node:buffer';

globalThis.structuredClone = structuredClone;

const originalEnv = process.env;

beforeEach(function () {
  jest.resetModules();
  global.fetch = fetchMock.sandbox();
  (global as any).Headers = Headers;
  (global as any).Request = Request;
  (global as any).Response = Response;
  (global as any).Blob = Blob;

  document.body.querySelector('#menus')?.remove();
  const menus = document.createElement('div');
  menus.id = 'menus';
  document.body.appendChild(menus);

  document.createRange = () => {
    const range = new Range();

    range.getBoundingClientRect = jest.fn();

    range.getClientRects = jest.fn(() => ({
      item: () => null,
      length: 0,
      [Symbol.iterator]: jest.fn(),
    }));

    return range;
  };

  global.ResizeObserver = jest.fn().mockImplementation(() => ({
    observe: jest.fn(),
    unobserve: jest.fn(),
    disconnect: jest.fn(),
  }));
});

afterEach(() => {
  jest.resetAllMocks();
  jest.restoreAllMocks();
  jest.clearAllTimers();
  jest.useRealTimers();
  fetchMock.mockReset();

  process.env = originalEnv;
});
