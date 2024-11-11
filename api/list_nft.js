const { AptosClient, AptosAccount } = require("aptos");
const client = new AptosClient(process.env.APTOS_NODE_URL);

async function listNFT(nft_id, price) {
    const payload = {
        function: "AptosNFTMarketplace::NFTMarketplace::list_for_sale",
        type_arguments: [],
        arguments: [nft_id, price],
    };
    const txn = await client.submitTransaction(payload);
    return txn.hash;
}

module.exports = { listNFT };