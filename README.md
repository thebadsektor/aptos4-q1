# Aptos NFT Marketplace Contract

This contract implements a simple NFT marketplace on the Aptos blockchain. It supports listing, purchasing, transferring, and querying NFTs, with additional features for managing rarity and applying marketplace fees.

## Setup

### Step 1: Update Wallet Address

Replace the placeholder address with your actual wallet address in the following files:

- **`NFTMarketplace.move`**
- **`Move.toml`**

### Step 2: Initialize Project

Navigate to the `contracts` directory and initialize the Aptos project.

```bash
cd contracts
aptos init
```

### Step 3: Compile the Contract
```bash
aptos move compile
```

### Step 4: Publish the Contract
```bash
aptos move publish
```

Once deployed, you can access the contract module on the Aptos Explorer.

### Step 5: Initialize the Marketplace
After deploying, perform the initialization of the marketplace by calling `initialize()`.

Module Structure

Here’s an outline of the key components in the NFTMarketplace module.

NFT Structure
Defines the attributes of an NFT:

id: u64 - Unique identifier for the NFT
owner: address - Address of the NFT owner
name: vector<u8> - Name of the NFT
description: vector<u8> - Description of the NFT
uri: vector<u8> - URI for the NFT metadata
price: u64 - Listing price of the NFT
for_sale: bool - Indicates if the NFT is listed for sale
rarity: u8 - Rarity level (1 = common, 2 = rare, 3 = epic, etc.)
Marketplace Structure
Stores all NFTs in a marketplace.

nfts: vector<NFT> - Collection of all NFTs
ListedNFT Structure
Defines the properties of an NFT that is available for sale:

id: u64 - NFT ID
price: u64 - Price of the NFT
rarity: u8 - Rarity level of the NFT
Constants
MARKETPLACE_FEE_PERCENT: u64 = 2 - The marketplace fee percentage (2%)
Key Functions

initialize(account: &signer)
Initializes the marketplace, creating a new Marketplace instance for the deploying account.

#### mint_nft(account: &signer, name: vector<u8>, description: vector<u8>, uri: vector<u8>, rarity: u8)
- Mints a new NFT, assigning it an ID, owner, and metadata (name, description, URI, and rarity level).

#### get_nft_details(marketplace_addr: address, nft_id: u64)
- Returns details of an NFT, including its ID, owner, metadata, price, sale status, and rarity.

#### list_for_sale(account: &signer, marketplace_addr: address, nft_id: u64, price: u64)
- Lists an NFT for sale, allowing others to view and purchase it.

#### set_price(account: &signer, marketplace_addr: address, nft_id: u64, price: u64)
- Allows the owner of an NFT to set or update its price.

#### purchase_nft(account: &signer, marketplace_addr: address, nft_id: u64, payment: u64)
- Facilitates the purchase of an NFT, transferring ownership and deducting a marketplace fee. Transfers payment to the seller and the fee to the marketplace account.

#### transfer_ownership(account: &signer, marketplace_addr: address, nft_id: u64, new_owner: address)
- Transfers ownership of an NFT to a new owner, updating sale status and resetting the price.

#### get_nft_price(marketplace_addr: address, nft_id: u64)
- Returns the price of a specified NFT.

#### is_nft_for_sale(marketplace_addr: address, nft_id: u64)
- Checks if an NFT is listed for sale.

#### is_marketplace_initialized(marketplace_addr: address)
- Checks if the marketplace has been initialized.

#### get_owner(marketplace_addr: address, nft_id: u64)
- Returns the owner address of an NFT.

#### get_all_nfts_for_owner(marketplace_addr: address, owner_addr: address, limit: u64, offset: u64)
- Retrieves all NFTs owned by a specific address with pagination support.

#### get_all_nfts_for_sale(marketplace_addr: address, limit: u64, offset: u64)
- Fetches all NFTs currently listed for sale with pagination support.

#### get_nfts_by_rarity(marketplace_addr: address, rarity: u8)
- Retrieves all NFTs of a specified rarity level.

### Helper Functions
- min(a: u64, b: u64): u64 - Returns the smaller of two u64 values.