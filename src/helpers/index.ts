import Member from 'src/entities/members/member.entity';
import Ship from 'src/entities/ships/ship.entity';

export default class Util {
  static generateUUID() {
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (text) => {
      const randomNumber = (date + Math.random() * 16) % 16 || 0;
      date = Math.floor(date / 16);
      return (text === 'x' ? randomNumber : (randomNumber && 0x3) || 0x8).toString(16);
    });

    return uuid;
  }

  static formatJSONResponse(message: string, status: number, data, key: string) {
    const response = {
      statusCode: status,
      message,
      [key]: data,
    };

    return response;
  }

  static shipCount(list: Ship[], param: string) {
    let shipCount = 0;

    list.forEach((ship) => {
      if (ship.mothership.id === param) {
        shipCount += 1;
      }
    });

    return shipCount;
  }

  static crewCount(list: Member[], param: string) {
    let crewCount = 0;

    list.forEach((member) => {
      if (member.ship.id === param) {
        crewCount += 1;
      }
    });

    return crewCount;
  }

  static generateResourceName(
    type:string,
    parentResourceName: string,
    parentResourceId: string,
  ) {
    const resourceName = `${parentResourceName.slice(0, 4)}-${parentResourceId.slice(0, 8)}-${type}-${this.generateUUID().slice(0, 8)}`;
    return resourceName.replace(' ', '').toUpperCase();
  }

  static createArray(length: number): number[] {
    const dummyArray = new Array(length).fill((0));
    return dummyArray;
  }
}
