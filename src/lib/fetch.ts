import { exit } from "process";
import { getConfig } from "./config";
// Newer or older than the ID of the from
type Direction = "older" | "newer";
type Limit = number;

// This type is used to signal if the transaction should be fetched from the latest and the direction
type From = "latest" | string;
type AccountIdOrAddress = string;

export interface TransactionFetcher {
  (
    accountIdOrAddress: AccountIdOrAddress,
    from: From,
    limit: Limit,
    direction: Direction
  ): Promise<void>;
}
type OpType = "Transfer" | "Deposit";

export interface Signature {
  pubKey: string;
  signature: string;
}

export interface Op {
  type: OpType;
  accountId: number;
  from: string;
  to: string;
  token: number;
  amount: string;
  fee: string;
  nonce: number;
  validFrom: number;
  validUntil: number;
  signature: Signature;
}

export interface Transaction {
  txHash: string;
  blockIndex: number;
  blockNumber: number;
  op: Op;
  status: string;
  failReason: null;
  createdAt: string;
}

export interface PaginationOptions {
  from: string;
  limit: number;
  direction: Direction;
  count: number;
}

export interface TransactionList {
  list: Transaction[];
  pagination: PaginationOptions;
}

export const fetchTransaction = async (
  accountIdOrAddress: AccountIdOrAddress,
  from: From,
  limit: Limit,
  direction: Direction
): Promise<TransactionList> => {
  const { provider } = await getConfig();
  const transactionAddr = `${provider.address}/accounts/${accountIdOrAddress}/transactions?from=${from}&limit=${limit}&direction=${direction}`;
  const { result } = await provider.get(transactionAddr);
  return result as TransactionList;
};

export const fetchAllTransactions = async (
  accountIdOrAddress: AccountIdOrAddress
): Promise<Transaction[]> => {
  let totalList: Transaction[] = [];
  let nextHash = "";
  const pageLimit = 100;
  try {
    const initialList = await fetchTransaction(
      accountIdOrAddress,
      "latest",
      pageLimit,
      "older"
    );
    const { list, pagination } = initialList;
    totalList = totalList.concat(list);
    // Check to make sure you have data
    if (list.length === 0) return [];
    const totalTxCount = pagination.count;
    let fetchedTxCount = list.length;
    nextHash = list[list.length - 1].txHash;
    while (fetchedTxCount < totalTxCount) {
      // eslint-disable-next-line no-await-in-loop
      const txList = (
        // eslint-disable-next-line no-await-in-loop
        await fetchTransaction(accountIdOrAddress, nextHash, pageLimit, "older")
      ).list;

      // Here we must remove the first entry from our list because the initial hash is inclusive not exclusive
      // we will double count otherwise
      totalList = totalList.concat(txList.slice(1));

      if (txList.length === 0) return totalList;
      nextHash = txList[txList.length - 1].txHash;
      fetchedTxCount += txList.length;
    }
    return totalList;
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error("Terrible failure see error", e);
    exit(1);
  }
  return [];
};
