import { ethers } from "ethers";
import { config as dotenvConfig } from "dotenv";
import { resolve } from "path";
import { Chain, ClobClient } from "../src";

dotenvConfig({ path: resolve(__dirname, "../.env") });

async function main() {
    const wallet = new ethers.Wallet(`${process.env.PK}`);
    const chainId = parseInt(`${process.env.CHAIN_ID || Chain.AMOY}`) as Chain;
    console.log(`Address: ${await wallet.getAddress()}, chainId: ${chainId}`);

    const host = process.env.CLOB_API_URL || "http://localhost:8080";
    const clobClient = new ClobClient(host, chainId, wallet);

    console.log(
        await clobClient.getLastTradePrice(
            "52114319501245915516055106046884209969926127482827954674443846427813813222426", // NO
        ),
    );
    console.log(
        await clobClient.getLastTradePrice(
            "71321045679252212594626385532706912750332728571942532289631379312455583992563", // YES
        ),
    );
}

main();
