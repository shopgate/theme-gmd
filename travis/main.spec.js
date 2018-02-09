/*
 * *
 *  * Copyright (c) 2017-present, Shopgate, Inc. All rights reserved.
 *  *
 *  * This source code is licensed under the Apache 2.0 license found in the
 *  * LICENSE file in the root directory of this source tree.
 *
 */
const { CmdOptimistic, CmdMasterBranch } = require('./modules/Cmd.mock');

let mockedCmd;
/**
 * MockedCmd factory.
 */
jest.mock('./modules/Cmd', () => mockedCmd);

describe('Travis before_script - on feature branch', () => {
  let main;
  let consoleLogSpy;
  let consoleErrorSpy;
  beforeEach(() => {
    jest.resetModules();
    // eslint-disable-next-line global-require
    main = require('./main');
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
  });
  afterEach(() => {
    consoleLogSpy.mockReset();
    consoleErrorSpy.mockReset();
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });
  describe('Feature branch', () => {
    mockedCmd = CmdOptimistic;
    it('should finish the whole process', (done) => {
      main()
        .then(() => {
          expect(consoleLogSpy).toHaveBeenCalledTimes(15);
          expect(consoleErrorSpy).toHaveBeenCalledTimes(0);
          done();
        })
        .catch((err) => {
          throw err;
        });
    });
  });
  describe('Master branch', () => {
    beforeAll(() => {
      mockedCmd = CmdMasterBranch;
    });
    it('should abort early', (done) => {
      main()
        .then(() => {
          throw Error('Did resolve.');
        })
        .catch((err) => {
          expect(consoleLogSpy).toHaveBeenCalledTimes(2);
          expect(err.message).toBe('Master should not be linked');
          done();
        });
    });
  });
});