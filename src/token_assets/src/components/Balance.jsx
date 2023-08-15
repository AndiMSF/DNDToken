import React, { useState } from "react";
import {Principal} from "@dfinity/principal"
import {token} from "../../../declarations/token"
function Balance() {
  const [inputUser, setInputUser] = useState("");
  const [uangOrangTsb, setUangOrangTsb] = useState("");
  const [symbolAndi, setSymbolAndi] = useState("");
  const [isHidden, setIsHidden] = useState(true);

  

  async function handleClick() {
    // karena inputan user itu berupa string, kita ingin convert ke principal
    const orang = Principal.fromText(inputUser);
    const balance = await token.balanceOf(orang);
    const symbol = await token.getSymbol();
    console.log("Id : "+orang+" mempunyai uang sebesar : "+balance);
    // Dari integer ke string
    setUangOrangTsb(balance.toLocaleString());
    setSymbolAndi(symbol);
    setIsHidden(false);
  }


  return (
    <div className="window white">
      <label>Check account token balance:</label>
      <p>
        <input
          id="balance-principal-id"
          type="text"
          placeholder="Enter a Principal ID"
          value={inputUser}
          onChange={(event) => setInputUser(event.target.value)}
        />
      </p>
      <p className="trade-buttons">
        <button
          id="btn-request-balance"
          onClick={handleClick}
        >
          Check Balance
        </button>
      </p>
      <p hidden={isHidden}>This account has a balance of {uangOrangTsb} {symbolAndi}</p>
    </div>
  );
}

export default Balance;
