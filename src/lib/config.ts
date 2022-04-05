import { RestProvider } from "zksync";
import * as zksync from "zksync";

export interface Config {
  provider: RestProvider;
}

let config: Config;
export async function getConfig(): Promise<Config> {
  if (config === undefined) {
    const provider = await zksync.getDefaultRestProvider("mainnet");
    config = { provider };
  }
  return config;
}
