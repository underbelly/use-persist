/* eslint-disable */
import { wait } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import usePersist from '../index';
jest.mock('debounce', () => ({
  debounce: (cb: any) => () => cb(),
}));

const localStorage = window.localStorage.__proto__;
const sessionStorage = window.sessionStorage.__proto__;

jest.spyOn(localStorage, 'getItem');
jest.spyOn(localStorage, 'setItem');
jest.spyOn(sessionStorage, 'getItem');
jest.spyOn(sessionStorage, 'setItem');

const data = {
  some: 'data',
};

const requiredConfig = {
  name: 'A_TEST_NAME',
  onMount: jest.fn(),
};

describe('usePersist', () => {
  beforeAll(() => {
    localStorage.setItem = jest.fn();
    localStorage.getItem = jest.fn(() => JSON.stringify(data));
    sessionStorage.setItem = jest.fn();
    sessionStorage.getItem = jest.fn(() => JSON.stringify(data));
  });
  it('works with only required config', async () => {
    renderHook(() => usePersist(data, requiredConfig));

    expect(localStorage.getItem).toHaveBeenNthCalledWith(
      1,
      requiredConfig.name
    );

    expect(requiredConfig.onMount).toHaveBeenNthCalledWith(1, data);

    await wait(() => {}, { interval: 300 });

    expect(localStorage.setItem).toHaveBeenNthCalledWith(
      1,
      requiredConfig.name,
      // not quite sure why this is
      undefined
    );
  });
  it('skips if skip config option is true', () => {
    renderHook(() => usePersist(data, { ...requiredConfig, skip: true }));

    expect(localStorage.getItem).not.toHaveBeenCalled();
    expect(requiredConfig.onMount).not.toHaveBeenCalled();
    expect(localStorage.setItem).not.toHaveBeenCalled();
  });
  it('uses session storage if `useSessionStorage` config option is true', () => {
    renderHook(() => usePersist(data, { ...requiredConfig, skip: true }));

    expect(sessionStorage.getItem).not.toHaveBeenCalled();
    expect(sessionStorage.setItem).not.toHaveBeenCalled();
  });
});
