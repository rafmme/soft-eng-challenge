export default class Util {
  /**
   * @description A function that generates a UUID string
   * @returns {string} uuid
   */
  static generateUUID(): string {
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (text) => {
      const randomNumber = (date + Math.random() * 16) % 16 || 0;
      date = Math.floor(date / 16);
      return (text === 'x' ? randomNumber : (randomNumber && 0x3) || 0x8).toString(16);
    });

    return uuid;
  }

  /**
   * @description A function that formats the JSON object gotten from the controllers' results
   * @param {string} message - text
   * @param {number} status - HTTP status code
   * @param {object} data - request response
   * @param {object} key
   * @returns {object} formatted response
   */
  static formatJSONResponse(message: string, status: number, data, key: string) {
    const response = {
      statusCode: status,
      message,
      [key]: data,
    };

    return response;
  }

  /**
   * @description A function that counts the number of ships in a mothership
   * @param {Ship[]} list- list of all Ship entities
   * @param {string} param - id (UUID) to use
   * @returns {number} number of ships
   */
  static shipCount(list, param: string): number {
    let shipCount = 0;

    list.forEach((ship) => {
      const {
        mothership: { id },
      } = ship;
      if (id === param) {
        shipCount += 1;
      }
    });

    return shipCount;
  }

  /**
   * @description A function that counts the number of crew members in a ship
   * @param {Member[]} list- list of all crew members entities
   * @param {string} param - id (UUID) to use
   * @returns {number} number of crew members
   */
  static crewCount(list, param: string): number {
    let crewCount = 0;

    list.forEach((member) => {
      const {
        ship: { id },
      } = member;
      if (id === param) {
        crewCount += 1;
      }
    });

    return crewCount;
  }

  /**
   * @description A function that generates a name for an entity
   * @param {string} type - type of entity
   * @param {string} parentResourceName - name of entity's parent
   * @param {string} parentResourceId - id of entity's parent
   * @returns {string} random unique generated name
   */
  static generateResourceName(
    type: string,
    parentResourceName: string,
    parentResourceId: string,
  ): string {
    const resourceName = `${parentResourceName.slice(0, 4)}-${parentResourceId.slice(
      0,
      8,
    )}-${type}-${Util.generateUUID().slice(0, 8)}`;
    return resourceName.replace(' ', '').toUpperCase();
  }

  /**
   * @description A function that generates and fills an array
   * @param {number} length - length of array to create
   * @returns {number[]} random unique generated name
   */
  static createArray(length: number): number[] {
    const dummyArray = new Array(length).fill(0);
    return dummyArray;
  }
}
