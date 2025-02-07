import { Node } from "./Node";

export default class LinkedList<T> {
  private head: Node<T> | null = null;
  private size: number;

  constructor() {
    this.head = null;
    this.size = 0;
  }

  add(value: T) {
    const node = new Node(value);
    if (!this.head) {
      this.head = node;
    } else {
      let currNode = this.head;

      while (currNode.next) {
        currNode = currNode.next;
      }

      currNode.next = node;
    }

    this.size++;
  }

  remove(value: T) {
    if (!this.head) return;

    this.size--;

    if (this.head.value === value) {
      this.head = this.head.next;
      return;
    }

    let currNode: Node<T> | null = this.head;

    while (currNode?.next && currNode.next?.value !== value) {
      currNode = currNode.next;
    }

    if (currNode.next) {
      currNode.next = currNode.next.next;
    }
  }

  print() {
    let currNode = this.head;
    const arr = [];
    while (currNode) {
      arr.push(currNode.value);
      currNode = currNode.next;
    }
    return arr;
  }

  length() {
    return this.size;
  }
}
