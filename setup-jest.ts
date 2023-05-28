import 'jest-preset-angular/setup-jest';
// eslint-disable-next-line @typescript-eslint/no-var-requires
expect.extend(require('jest-extended'));

// https://github.com/valor-software/ng2-charts/issues/1352#issuecomment-1004399618
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));
