export type Input = {
  items: { idProduct: number; quantity: number }[];
};

export default interface StockGateway {
  decrementStock(input: Input): Promise<void>;
}
