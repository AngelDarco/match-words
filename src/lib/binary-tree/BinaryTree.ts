import TreeNode from "./TreeNode";

export default class BinaryTree<T> {
  root: TreeNode<T> | null = null;

  insert(word: T, id: number) {
    const newNode = new TreeNode(word, id);
    if (!this.root) {
      this.root = newNode;
      return;
    }
    this.insertNode(this.root, newNode);
  }

  private insertNode(node: TreeNode<T>, newNode: TreeNode<T>) {
    if (newNode.word < node.word) {
      if (!node.left) node.left = newNode;
      else this.insertNode(node.left, newNode);
    } else {
      if (!node.right) node.right = newNode;
      else this.insertNode(node.right, newNode);
    }
  }

  deleteNode(id: number) {
    const node = this.find(id);
    if (!node) return;

    if (id < node.id) {
      console.log(node.id);
    }
  }

  find(id: number) {
    let node = this.root;
    while (node) {
      if (id === node.id) return node;
      node = id < node.id ? node.right : node.left;
    }
  }
}
