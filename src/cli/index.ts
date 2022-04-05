#!/usr/bin/env node
import { Command } from "commander";
import { ethers } from "ethers";
import { generateCSV } from "../lib";

const program = new Command();

program
  .name("zktax-csv")
  .description("Generate a csv of your zksync txs in a cointracker compatible way")
  .requiredOption(
    "-a, --addr <address>",
    "input your zksync address format in standard 0xeFa..."
  )
  .addHelpCommand()
  .action(async (args) => {
    const ethAddress = args.addr;
    ethers.utils.getAddress(ethAddress);
    generateCSV(ethAddress);
  })
  .version("0.0.0-alpha");

program.parse();
