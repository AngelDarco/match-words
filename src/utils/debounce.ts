export function debounce<M extends (...args: unknown[]) => unknown>(
  callback: (...args: Parameters<M>) => void
) {
  let id: ReturnType<typeof setTimeout>;
  return function (...args: Parameters<M>) {
    clearTimeout(id);
    id = setTimeout(() => callback(...args), 2000);
  };
}
