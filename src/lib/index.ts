import { fetchAllTransactions } from "./fetch";
import { transformTransactions } from "./csv";

export * as csv from "./csv";
export * as fetch from "./fetch";
export * as config from "./config";

export const generateCSV = async (ethAddress: string): Promise<void> => {
  const txs = await fetchAllTransactions(ethAddress);
  transformTransactions(txs, ethAddress);
};

export default generateCSV;
