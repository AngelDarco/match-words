export default class TreeNode<T> {
  public word: T;
  public id: number;
  public left: TreeNode<T> | null;
  public right: TreeNode<T> | null;

  constructor(word: T, id: number) {
    this.word = word;
    this.id = id;
    this.left = null;
    this.right = null;
  }
}
