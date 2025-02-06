export default class LinkedList {
  head: Node | null = null;
  tail: Node | null = null;
  size: number;

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }
}
