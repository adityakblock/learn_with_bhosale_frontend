import './App.css';
import { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import * as web3sol from '@solana/web3.js';
import {
  Program, Provider, web3
} from '@project-serum/anchor';

import * as anchor from '@project-serum/anchor';

import * as spl from '@solana/spl-token';

import idl from './myidl.json';

import { getPhantomWallet } from '@solana/wallet-adapter-wallets';
import { useWallet, WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { min } from 'bn.js';
import { copyFileSync } from 'fs';
import { off } from 'process';


let tokenRentAddress = new anchor.web3.PublicKey("2qQtjjVgVvkAd6DH6qpv6uqn4sv13iwmkfpeFPSEmA1e");


const wallets = [
  /* view list of available wallets at https://github.com/solana-labs/wallet-adapter#wallets */
  getPhantomWallet()
]

const { SystemProgram, Keypair } = web3;
/* create an account  */
const baseAccount = Keypair.generate();
const opts = {
  preflightCommitment: "processed"
}
const programID = new PublicKey(idl.metadata.address);
console.log('address of program', programID.toString());

//let offer = anchor.web3.Keypair.generate();
let offerMk = new anchor.web3.PublicKey("FHG3A3rVypd5W89NGwZJEDeMy4rhaJPawpBeAyUHkDUH");


let nftPubKey = new anchor.web3.PublicKey("ENx7QVpBQGVFbPYZWb6tbHgXNsaVkQmjCGhAUbwNucNW");



function App() {
  const [supply, setSupply] = useState(null);
  const [price, setPrice] = useState(null);
  const [number, setNumber] = useState(1);
  const wallet = useWallet();

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    const network = "https://api.devnet.solana.com";
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    );
    return provider;
  }

  async function firstFunction() {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())

    console.log(program.provider);

    const [dataAcc, dataAccbump] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("meta_data")
      ],
      program.programId
    )


    
    offerMk = program.provider.wallet.publicKey;
    const accounts = {
      data: dataAcc,
      deployer: program.provider.wallet.publicKey,
      tokenProgram:spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram:anchor.web3.SystemProgram.programId,
      rent:anchor.web3.SYSVAR_RENT_PUBKEY,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    }
  


    const tx = await program.rpc.new( {
      accounts: accounts,
      signers: []
    })
    console.log(tx);

    // while ((await program.provider.connection.getSignatureStatus(tx)).value.confirmations === 0) {
    //   // console.log('sign status', await program.provider.connection.getSignatureStatus(tx1));
    // }



    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  }



  async function viewFunction() {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())

    console.log(program.provider);

    const [dataAcc, dataAccbump] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("meta_data")
      ],
      program.programId
    )


    
    offerMk = program.provider.wallet.publicKey;
    const accounts = {
      data: dataAcc,
      viewer: program.provider.wallet.publicKey,
      tokenProgram:spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram:anchor.web3.SystemProgram.programId,
      rent:anchor.web3.SYSVAR_RENT_PUBKEY,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    }
  


    const tx = await program.rpc.viewData( {
      accounts: accounts,
      signers: []
    })
    console.log(tx);

    // while ((await program.provider.connection.getSignatureStatus(tx)).value.confirmations === 0) {
    //   // console.log('sign status', await program.provider.connection.getSignatureStatus(tx1));
    // }



    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  }


  async function addFunction() {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())

    console.log(program.provider);

    const [dataAcc, dataAccbump] = await anchor.web3.PublicKey.findProgramAddress(
      [
        Buffer.from("meta_data")
      ],
      program.programId
    )


    
    offerMk = program.provider.wallet.publicKey;
    const accounts = {
      data: dataAcc,
      adder: program.provider.wallet.publicKey,
      tokenProgram:spl.TOKEN_PROGRAM_ID,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      systemProgram:anchor.web3.SystemProgram.programId,
      rent:anchor.web3.SYSVAR_RENT_PUBKEY,
      clock: anchor.web3.SYSVAR_CLOCK_PUBKEY,
    }
    
    let inc_val = new anchor.BN(10);


    const tx = await program.rpc.incrementData(inc_val, { 
      accounts: accounts,
      signers: []
    })
    console.log(tx);

    // while ((await program.provider.connection.getSignatureStatus(tx)).value.confirmations === 0) {
    //   // console.log('sign status', await program.provider.connection.getSignatureStatus(tx1));
    // }



    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  }


  async function BuyToken() {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())

    console.log(program.provider);


    console.log('wallet ', program.provider.wallet.publicKey.toString())

 
    let NFTTokenMint = nftPubKey;
    let NFTTokenAccount = await spl.Token.getAssociatedTokenAddress(
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      spl.TOKEN_PROGRAM_ID,
      NFTTokenMint,
      program.provider.wallet.publicKey,
    );
      let temp = new anchor.web3.PublicKey("FHG3A3rVypd5W89NGwZJEDeMy4rhaJPawpBeAyUHkDUH");
    const [offerBufferAddress, offerBufferAddressBump] = await anchor.web3.PublicKey.findProgramAddress(
      [temp.toBuffer(), NFTTokenMint.toBuffer()],
      program.programId
    );

    console.log("Offer BUffer Address is", offerBufferAddress.toString())
    

    const [escrowedMakerTokens, escrowedMakerTokensBump] = await anchor.web3.PublicKey.findProgramAddress(
      [offerBufferAddress.toBuffer()],
      program.programId
    );

    console.log('address where token is curently living', escrowedMakerTokens.toString())


    const accounts = {
      offer:offerBufferAddress,
      escrowedMakerTokens: escrowedMakerTokens,
      makerMint:NFTTokenMint,
      offerMaker:offerMk,
      offerTaker: program.provider.wallet.publicKey,
      offerTakersMakerTokens:NFTTokenAccount,
      tokenProgram:spl.TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      tokenrent: tokenRentAddress,
    }
    //console.log(accounts.rent.toString(), accounts.tokenProgram.toString(), accounts.systemProgram.toString(), accounts.associatedTokenProgram.toString());

    let offerTakerAmount = new anchor.BN(10 ** 9);
    const tx = await program.rpc.accept( offerBufferAddressBump, {
      accounts: accounts,
      signers: []
    });
    console.log(tx);

    // while ((await program.provider.connection.getSignatureStatus(tx)).value.confirmations === 0) {
    //   // console.log('sign status', await program.provider.connection.getSignatureStatus(tx1));
    // }



    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  }

  async function CancelListing() {

    const provider = await getProvider();
    const program = new Program(idl, programID, provider);
    console.log(program.programId.toString())

    console.log(program.provider);


    console.log('wallet ', program.provider.wallet.publicKey.toString())

    let NFTTokenMint = nftPubKey;
    let NFTTokenAccount = await spl.Token.getAssociatedTokenAddress(
      spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      spl.TOKEN_PROGRAM_ID,
      NFTTokenMint,
      program.provider.wallet.publicKey,
    );

    let temp = new anchor.web3.PublicKey("FHG3A3rVypd5W89NGwZJEDeMy4rhaJPawpBeAyUHkDUH");
    const [offerBufferAddress, offerBufferAddressBump] = await anchor.web3.PublicKey.findProgramAddress(
      [temp.toBuffer(), NFTTokenMint.toBuffer()],
      program.programId
    );

    console.log("Offer BUffer Address is", offerBufferAddress.toString())
    

    const [escrowedMakerTokens, escrowedMakerTokensBump] = await anchor.web3.PublicKey.findProgramAddress(
      [offerBufferAddress.toBuffer()],
      program.programId
    );


    const accounts = {
      offer:offerBufferAddress,
      offerMaker: program.provider.wallet.publicKey,
      offerMakersMakerTokens:NFTTokenAccount,
      makerMint: NFTTokenMint,
      escrowedMakerTokens: escrowedMakerTokens,
      tokenProgram:spl.TOKEN_PROGRAM_ID,
      systemProgram: anchor.web3.SystemProgram.programId,
      associatedTokenProgram: spl.ASSOCIATED_TOKEN_PROGRAM_ID,
      rent: anchor.web3.SYSVAR_RENT_PUBKEY,
      tokenrent: tokenRentAddress,
    }
    //console.log(accounts.rent.toString(), accounts.tokenProgram.toString(), accounts.systemProgram.toString(), accounts.associatedTokenProgram.toString());
    const tx = await program.rpc.cancel( offerBufferAddressBump, {
      accounts: accounts,
      signers: []
    });
    console.log(tx);

    // while ((await program.provider.connection.getSignatureStatus(tx)).value.confirmations === 0) {
    //   // console.log('sign status', await program.provider.connection.getSignatureStatus(tx1));
    // }



    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  }




  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>

          <button onClick={firstFunction}>Initiali Filed</button>
          <br/>
          <br/>
          <br/>
          <button onClick={viewFunction}>View</button>
          <br/>
          <br/>
          <br/>
          <button onClick={addFunction}>Increment Data</button>

        </div>
      </div>
    );
  }
}

const AppWithProvider = () => (
  <ConnectionProvider endpoint="https://api.devnet.solana.com">
    <WalletProvider wallets={wallets} autoConnect>
      <WalletModalProvider>
        <App />
      </WalletModalProvider>
    </WalletProvider>
  </ConnectionProvider>
)

export default AppWithProvider;