import { Word } from "../types";

export default class HandlerData {
  /**
   * @param data the array to shuffle
   * @returns the shuffled array
   */
  static random<T>(data: T[]) {
    if (!data || data.length === 0) return data;
    return data.sort(() => Math.random() - 0.5);
  }

  /**
   *
   * @param data the array to cut
   * @param slice the number of elements to cut
   * @returns a sliced array with the specified number of elements
   */
  static cut<T>(data: T[], slice: number) {
    if (!data || data.length === 0) return data;
    return data.slice(0, slice);
  }

  /**
   *
   * @param arr1 the array to replace an element
   * @param id the id of the element to remove
   * @param element the element to replace
   * @returns the new array with the element replaced
   */
  static replace<T>(arr1: T[], id: number, element: T) {
    if (!id || arr1.length === 0 || !element) return [];

    const newArr = [...arr1];
    const i = arr1.findIndex((el) => (el as Word).id === id);

    newArr[i] = element;

    return newArr;
  }
}
