export function useUtils() {
  function parseCurrency(value: number) {
    return value.toLocaleString("pt-br", {
      currency: "BRL",
      style: "currency",
    });
  }

  return { parseCurrency };
}
