import membersMockData from 'test/mockData/members.mock';
import shipsMockData from 'test/mockData/ships.mock';
import Util from '../../src/helpers/index';

describe('Util helper class tests', () => {
  describe('GenerateUUID function', () => {
    test('should successfully generate a UUID string', () => {
      expect(typeof Util.generateUUID()).toBe('string');
    });
  });

  describe('Format JSON Response function', () => {
    test('should format JSON response accordingly', () => {
      expect(Util.formatJSONResponse('All ships', 200, shipsMockData, 'ships')).toEqual({
        message: 'All ships',
        statusCode: 200,
        ships: shipsMockData,
      });
    });
  });

  describe('Ship Count function', () => {
    test('should return the number of ships attached to a mothership', () => {
      expect(Util.shipCount(shipsMockData, 'f367db4c-c1b9-4880-aee6-afc130a95cf0')).toEqual(2);
    });
  });

  describe('Crew Member Count function', () => {
    test('should return the number of crew member attached to a ship', () => {
      expect(Util.crewCount(membersMockData, '10684b86-3782-490a-86af-bd3eed0f998e')).toEqual(1);
    });
  });

  describe('Generate Resource name function', () => {
    test('should generate a random unique resource name', () => {
      expect(
        Util.generateResourceName('ship', 'MS GEV', 'f367db4c-c1b9-4880-aee6-afc130a95cf0').startsWith('MSG'),
      ).toEqual(true);
    });
  });

  describe('Create Array function', () => {
    test('should create an array of given length', () => {
      expect(Util.createArray(5).length).toEqual(5);
    });
  });
});
