import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import twitterLogo from "./assets/twitter-logo.svg";
import curiousCat from "./assets/cat-water.gif";
import "./App.css";
import SelectCharacter from "./components/select-character/SelectCharacter";
import Arena from "./components/arena/index";
import LoadingIndicator from "./components/loading-indicator/index";

import {
  CONTRACT_ADDRESS,
  transformCharacterData,
  TWITTER_HANDLE,
  TWITTER_LINK,
} from "./constants";
import myEpicGame from "./utils/MyEpicGame.json";

export default function App() {
  const [currentAccount, setCurrentAccount] = useState(null);
  const [characterNFT, setCharacterNFT] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const checkWalletConnected = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) {
        console.log("Make sure you have MetaMask!");
        return;
      } else {
        console.log("We have the ethereum object", ethereum);

        const accounts = await ethereum.request({ method: "eth_accounts" });

        if (accounts.length !== 0) {
          const account = accounts[0];
          console.log("Found an authorised account: ", account);
          setCurrentAccount(account);
        } else {
          console.log("No authorised account found");
        }
      }
    } catch (error) {
      console.log(error);
    }

    setIsLoading(false);
  };

  const connectWallet = async () => {
    try {
      const { ethereum } = window;

      if (!ethereum) {
        alert("Get MetaMask!");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });

      console.log("Connected", accounts[0]);
      setCurrentAccount(accounts[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return <LoadingIndicator />;
    }

    if (!currentAccount) {
      return (
        <div className="connect-wallet-container">
          <img src={curiousCat} alt="Curious cat jumping in water" />
          <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
          >
            Connect Wallet to Play!
          </button>
        </div>
      );
    } else if (currentAccount && !characterNFT) {
      return <SelectCharacter setCharacterNFT={setCharacterNFT} />;
    } else if (currentAccount && characterNFT) {
      return (
        <Arena characterNFT={characterNFT} setCharacterNFT={setCharacterNFT} />
      );
    }
  };

  useEffect(() => {
    setIsLoading(true);
    checkWalletConnected();
  }, []);

  useEffect(() => {
    const fetchNftMetadata = async () => {
      console.log("Checking for Character NFT on address: ", currentAccount);

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const gameContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        myEpicGame.abi,
        signer
      );

      const txn = await gameContract.checkUserNFT();
      if (txn.name) {
        console.log("User has character NFT");
        setCharacterNFT(transformCharacterData(txn));
      } else {
        console.log("No character NFT found");
      }

      setIsLoading(false);
    };

    if (currentAccount) {
      console.log("Current Account: ", currentAccount);
      fetchNftMetadata();
    }
  }, [currentAccount]);

  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header gradient-text">⚔️ Cataverse 13 ⚔️</p>
          <p className="sub-text">Help Kitty defeat the bath water!</p>
          {renderContent()}
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built by @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
}
