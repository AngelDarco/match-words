export default class Debounce {
  private id: ReturnType<typeof setTimeout> | null = null;
  private delay = 500;

  execute<T extends (...args: unknown[]) => void>(
    callback: (...args: Parameters<T>) => void,
    delay?: number,
    ...args: Parameters<T>
  ) {
    this.clear();
    this.id = setTimeout(() => {
      callback(...args);
    }, delay || this.delay);
  }

  clear() {
    if (this.id) return clearTimeout(this.id);
  }
}
