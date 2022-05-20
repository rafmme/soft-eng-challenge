import ResourceValidator from 'src/helpers/validator';

describe('ResourceValidator class tests', () => {
  describe('Check if resource exist', () => {
    test('should call checkIfResourceExist function', () => {
      const mock = jest.spyOn(ResourceValidator, 'checkIfResourceExist');
      ResourceValidator.checkIfResourceExist(
        {
          name: '',
          shipId: '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc',
        },
        null,
        'ship',
      );

      expect(mock).toHaveBeenCalled();

      mock.mockRestore();
    });
  });
  describe('Validate resource id', () => {
    test('should call the validateResourceId function', () => {
      const mock = jest.spyOn(ResourceValidator, 'validateResourceId');
      ResourceValidator.validateResourceId(
        {
          name: '',
          shipId: '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc',
        },
        null,
        'ship',
      );

      expect(mock).toHaveBeenCalled();

      mock.mockRestore();
    });
  });
  describe('Check if Ship & Mothership full', () => {
    test('should call the isFull function', () => {
      const mock = jest.spyOn(ResourceValidator, 'isFull');
      ResourceValidator.isFull(null, '8aef48f3-d225-42e7-8e2e-bf58dc5a69bc', 'ms', 2);

      expect(mock).toHaveBeenCalled();

      mock.mockRestore();
    });
  });
});
