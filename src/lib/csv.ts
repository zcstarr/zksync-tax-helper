import * as csv from "fast-csv";
import { ethers } from "ethers";
import { ExtendedTokens, TokenInfo } from "zksync/build/types";
import { Transaction } from "./fetch";
import { getConfig } from "./config";

const padZero = (n: number): string => {
  if (n < 10) return `0${n}`;
  return `${n}`;
};
export const formatDate = (date: string): string => {
  const d = new Date(date);
  const mm = padZero(d.getMonth() + 1);
  const dd = padZero(d.getDate());
  const yyyy = d.getFullYear();
  const HH = padZero(d.getHours());
  const MM = padZero(d.getMinutes());
  const SS = padZero(d.getSeconds());
  return `${mm}/${dd}/${yyyy} ${HH}:${MM}:${SS}`;
};

export const getTokenById = (
  tokenSet: ExtendedTokens,
  tokenId: number
): TokenInfo | undefined => {
  const entry = Object.entries(tokenSet).find(
    ([, tokenInfo]) => tokenInfo.id === tokenId
  );
  return (entry && entry[1]) || undefined;
};
// Takes the tx and the set of tokens and the account address to resolve
// the transaction data.
export const formatData = (
  tx: Transaction,
  tokenSet: ExtendedTokens,
  analyzedAddress: string
): Record<string, string> => {
  const tokenInfo = getTokenById(tokenSet, tx.op.token);
  if (!tokenInfo) throw new Error(`could not resolve tokenId ${tx.op.token}`);
  const { symbol, decimals } = tokenInfo;
  const formattedValue = ethers.utils.formatUnits(tx.op.amount, decimals);
  const fee = ethers.utils.formatUnits(tx.op.fee, decimals);
  let rq = "";
  let sq = "";
  let rc = "";
  let sc = "";
  const feeCurrency = symbol;
  // Check the context of the user are they send or receiving
  if (tx.op.from.toLowerCase() === analyzedAddress.toLowerCase()) {
    // user is sending
    sq = formattedValue;
    sc = symbol;
  } else {
    // user is receiving
    rq = formattedValue;
    rc = symbol;
  }
  return {
    Date: formatDate(tx.createdAt),
    "Received Quantity": rq,
    "Received Currency": rc,
    "Sent Quantity": sq,
    "Sent Currency": sc,
    "Fee Amount": fee,
    "Fee Currency": feeCurrency,
    Tag: ""
  };
};

export const transformTransactions = async (
  txs: Transaction[],
  accountAddress: string
): Promise<void> => {
  const csvStream = csv.format({ headers: true });
  csvStream.pipe(process.stdout).on("end", () => process.exit());
  const config = await getConfig();
  const tokenSet = await config.provider.getTokens();
  txs.forEach((tx) => {
    switch (tx.op.type) {
    case "Transfer": {
      const csvData = formatData(tx, tokenSet, accountAddress);
      csvStream.write(csvData);
      break;
    }
    default: {
      // TODO atm only handling transfers;
      break;
    }
    }
  });
  csvStream.end();
};
