export class Utils {
  static isValidUrl = (inputUrl: string): boolean => {
    try {
      new URL(inputUrl);
      return true;
    } catch {
      return false;
    }
  };

  static hasNoData = <T>(data: T[]): boolean => data.length === 0;
}
