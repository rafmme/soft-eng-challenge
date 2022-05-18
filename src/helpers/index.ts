export default class Util {
  static generateUUID() {
    let date = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (text) => {
      const randomNumber = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (text == 'x' ? randomNumber : (randomNumber & 0x3) | 0x8).toString(16);
    });

    return uuid;
  }
}
