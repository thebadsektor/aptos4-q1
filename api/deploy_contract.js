const { AptosClient, AptosAccount, HexString, TxnBuilderTypes, BCS } = require("aptos");
const fs = require("fs");
require("dotenv").config();

const client = new AptosClient(process.env.APTOS_NODE_URL);
const account = new AptosAccount(HexString.ensure(process.env.PRIVATE_KEY).toUint8Array());

async function deployContract() {
    try {
        // Load the compiled bytecode from the file
        const bytecode = fs.readFileSync("contracts/build/NFTMarketplace/bytecode_modules/NFTMarketplace.mv");
        console.log("Bytecode loaded successfully:", bytecode);

        // Use `TransactionPayloadEntryFunction` to execute the contract deployment with raw bytes
        const payload = new TxnBuilderTypes.TransactionPayloadEntryFunction(
            TxnBuilderTypes.EntryFunction.natural(
                "0x1::code",
                "publish_module",
                [],
                [BCS.bcsSerializeBytes(bytecode)]
            )
        );
        console.log("Transaction payload created:", payload);

        // Get the account's current sequence number
        const accountInfo = await client.getAccount(account.address());
        console.log("Account info retrieved:", accountInfo);
        const sequenceNumber = BigInt(accountInfo.sequence_number);
        console.log("Sequence number:", sequenceNumber);

        // Build the raw transaction
        const rawTxn = await client.generateRawTransaction(account.address(), payload, {
            sequenceNumber,
            maxGasAmount: BigInt(10000),
            gasUnitPrice: BigInt(100),
            expirationTimestampSecs: BigInt(Math.floor(Date.now() / 1000) + 600),
        });
        console.log("Raw transaction created:", rawTxn);

        // Sign and submit the transaction
        const signedTxn = await client.signTransaction(account, rawTxn);
        console.log("Signed transaction:", signedTxn);

        const transactionResponse = await client.submitTransaction(signedTxn);
        console.log("Transaction submitted. Hash:", transactionResponse.hash);

        console.log("Transaction submitted. Awaiting confirmation...");

        // Wait for transaction confirmation
        const transactionResult = await client.waitForTransaction(transactionResponse.hash);
        console.log("Transaction result:", transactionResult);
        console.log("Contract deployed successfully:", transactionResponse.hash);

    } catch (error) {
        console.error("Error deploying contract:", error);
    }
}

deployContract().catch(console.error);
