// @ts-nocheck
import * as web3 from '@solana/web3.js';

// Create connection
function createConnection(url = "https://api.testnet.solana.com") {
    return new web3.Connection(url);
}

// Generate account
import * as bip39 from 'bip39';
import nacl from 'tweetnacl';

export async function generateAccount(mnemonic) {
    const secret = mnemonic || await generateMnemonic();
    const seed = await bip39.mnemonicToSeed(secret);
    const keyPair = nacl.sign.keyPair.fromSeed(seed.slice(0, 32));
    return {
        mnemonic: secret,
        account: new web3.Account(keyPair.secretKey)
    }
}

export async function generateMnemonic() {
    return bip39.generateMnemonic();
}


// Get balance
export async function getBalance(publicKey) {
    const connection = createConnection();

    return await connection.getBalance(getPublicKey(publicKey));
}

export function getPublicKey(publicKey) {
    return new web3.PublicKey(publicKey)
}

// Send transaction
export async function sendTransaction(account, recipientPublicKey, recipientAmount) {
    console.log(account, recipientPublicKey, recipientAmount)
    const transaction = new web3.Transaction().add(web3.SystemProgram.transfer({
        fromPubkey: account._publicKey,
        toPubkey: new web3.PublicKey(recipientPublicKey),
        lamports: recipientAmount,
    }));
    const connection = createConnection();

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [account]
    );

    return signature;
}

// Get history
// https://solana-labs.github.io/solana-web3.js/class/src/connection.js~Connection.html#instance-method-getConfirmedSignaturesForAddress
export async function getHistory(publicKey, options = { limit: 20 }) {
    const connection = createConnection();

    return connection.getConfirmedSignaturesForAddress2.getBalance(publicKey, options);
}

// Airdrop request
// lamports is 0.000000001 of SOL
export async function requestAirdrop(publicKey, lamports = 1000000) {
    const connection = createConnection();

    return connection.requestAirdrop(getPublicKey(publicKey), lamports)
}