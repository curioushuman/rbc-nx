import { Loggable, LoggableError, LoggableInfo, LoggableLogger } from '..';

@Loggable('Test')
abstract class TestLoggableAbstract {
  @LoggableError()
  testError() {
    console.log('testError');
    throw new Error('Test error');
  }

  @LoggableInfo()
  testInfo() {
    console.log('testInfo');
  }
}

class TestLoggable extends TestLoggableAbstract {
  constructor() {
    super();
  }
}

describe('Loggable', () => {
  describe('Decorating a class', () => {
    let testLoggable: TestLoggable;
    beforeAll(() => {
      testLoggable = new TestLoggable();
    });

    test('Then it should add a logger property to the class', () => {
      // expect(testLoggable.logger).toBeDefined();
      expect(
        Object.prototype.hasOwnProperty.call(testLoggable, 'logger')
      ).toBeTruthy();
    });

    test('Then it should add a currentContext method to the class', () => {
      expect('currentContext' in testLoggable).toBeTruthy();
    });

    test('Then it should add a setContext method to the class', () => {
      expect('setContext' in testLoggable).toBeTruthy();
    });

    test('Then it should add a handleError method to the class', () => {
      expect('handleError' in testLoggable).toBeTruthy();
    });

    test('Then it should add a handleInfo method to the class', () => {
      expect('handleInfo' in testLoggable).toBeTruthy();
    });
  });

  describe('Decorating a method', () => {
    let testLoggable: TestLoggable;

    beforeEach(() => {
      testLoggable = new TestLoggable();
      jest.clearAllMocks();
    });
    describe('When logging an error within a method', () => {
      test('Then it should call the original method', () => {
        const spy = jest.spyOn(console, 'log');
        try {
          testLoggable.testError();
        } catch (error) {
          // DO NOTHING
        }
        expect(spy).toBeCalledWith('testError');
      });
      test('Then it should log an error', () => {
        const logErrorSpy = jest.spyOn(LoggableLogger.prototype, 'error');
        try {
          testLoggable.testError();
        } catch (error) {
          expect(logErrorSpy).toBeCalled();
        }
      });
      test('Then it should throw the error again', (done) => {
        try {
          testLoggable.testError();
        } catch (error) {
          done();
        }
      });
    });
    describe('When logging information', () => {
      test('Then it should log some info', () => {
        const logInfoSpy = jest.spyOn(LoggableLogger.prototype, 'log');
        testLoggable.testInfo();
        expect(logInfoSpy).toBeCalled();
      });
      test('Then it should call the original method', () => {
        const spy = jest.spyOn(console, 'log');
        testLoggable.testInfo();
        expect(spy).toBeCalledWith('testInfo');
      });
    });
  });
});
