import { Data, Lang } from "../types";
/**
 * This class is used to get the data from the database
 *@param url - the main url of the database
 */
export default class FetchData {
  private url: string;

  constructor(url: string) {
    this.url = url;
  }

  private async fetchData(url: string) {
    const response = await fetch(url);
    return await response.json();
  }

  /**
   *
   * @param lang the current user language abreviation e.g. "de" | "en"
   * @returns an object with the data of the current language
   */
  getCurrentLanguage(lang: Lang): Promise<Data> {
    const path = `${this.url}/${lang}.json`;
    return this.fetchData(path);
  }

  /**
   *
   * @param lang the target user language abreviation e.g. "de" | "en"
   * @returns an object with the data of the target language
   */
  getTargetLanguage(lang: Lang): Promise<Data> {
    const path = `${this.url}/${lang}.json`;
    return this.fetchData(path);
  }
}
