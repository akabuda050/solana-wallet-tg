// @ts-nocheck
import * as web3 from '@solana/web3.js';

// Create connection
export function createConnection(url = "https://api.testnet.solana.com") {
    return new web3.Connection(url, 'confirmed');
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
export async function getBalance(connection, publicKey) {
    return await connection.getBalance(getPublicKey(publicKey));
}

export function getPublicKey(publicKey) {
    return new web3.PublicKey(publicKey)
}

// Send transaction
export async function sendTransaction(connection, account, recipientPublicKey, recipientAmount) {
    console.log(account, recipientPublicKey, recipientAmount)
    const transaction = new web3.Transaction().add(web3.SystemProgram.transfer({
        fromPubkey: new web3.PublicKey(account._publicKey),
        toPubkey: new web3.PublicKey(recipientPublicKey),
        lamports: recipientAmount,
    }));

    const signature = await web3.sendAndConfirmTransaction(
        connection,
        transaction,
        [{
            publicKey: new web3.PublicKey(account._publicKey),
            secretKey: account._secretKey
        }]
    );

    return signature;
}

// Get history
// https://solana-labs.github.io/solana-web3.js/class/src/connection.js~Connection.html#instance-method-getConfirmedSignaturesForAddress
export async function getHistory(connection, publicKey, options = { limit: 5, before: undefined }) {
    const transactions = await connection.getConfirmedSignaturesForAddress2(publicKey, options);
    const mappedTransactions = await Promise.all(transactions.map(async (t) => {
        const trans = await getTransaction(connection, t.signature);
        console.log(trans);
        const account = trans?.transaction.message.getAccountKeys();

        const itsMine = account?.get(0)?.toBase58() === publicKey.toBase58();

        const preBalance = itsMine ? trans?.meta?.preBalances[0] : trans?.meta?.preBalances[1] || 0;
        const postBalance = itsMine ? trans?.meta?.postBalances[0] : trans?.meta?.postBalances[1] || 0;
        
        return {
            tsig: t.signature,
            balance: postBalance,
            amount: itsMine ? preBalance - postBalance : postBalance - preBalance,
            accounts: trans?.transaction.message.getAccountKeys().staticAccountKeys.map(a => {
                return a.toBase58()
            }),
            itsMine,
        };
    }));
    console.log(mappedTransactions)

    return mappedTransactions;
}

export async function getTransaction(connection, sig) {
    return await connection.getTransaction(sig);
}

// Airdrop request
// lamports is 0.000000001 of SOL
export async function requestAirdrop(connection, publicKey, lamports = 1000000) {
    return connection.requestAirdrop(getPublicKey(publicKey), lamports)
}