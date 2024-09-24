import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { ApiKeyCreds, Chain, ClobClient } from "../src";

dotenvConfig({ path: resolve(__dirname, "../.env") });

async function main() {
    const wallet = new ethers.Wallet(`${process.env.PK}`);
    const chainId = parseInt(`${process.env.CHAIN_ID || Chain.AMOY}`) as Chain;
    console.log(`Address: ${await wallet.getAddress()}, chainId: ${chainId}`);

    const host = process.env.CLOB_API_URL || "http://localhost:8080";
    const creds: ApiKeyCreds = {
        key: `${process.env.CLOB_API_KEY}`,
        secret: `${process.env.CLOB_SECRET}`,
        passphrase: `${process.env.CLOB_PASS_PHRASE}`,
    };
    const clobClient = new ClobClient(host, chainId, wallet, creds);

    // Send it to the server
    const resp = await clobClient.cancelOrders([
        "0x7ce769d075f4f1263603fde09862f5998f5e6ae4a39a16f3780f0bd708d3fc1c",
    ]);
    console.log(resp);
    console.log(`Done!`);
    /*

  bids: [ { price: '0.5', size: '66240' } ],
  asks: [
    { price: '0.56', size: '1000' },
    { price: '0.55', size: '9701387.74' }
     */
}

main();
