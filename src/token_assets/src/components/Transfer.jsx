import React, { useState } from "react";
import { token } from "../../../declarations/token/index";
import {Principal} from "@dfinity/principal";


function Transfer() {
  const [getWho, setGetWho] = useState("");
  const [getAmount, setGetAmount] = useState("");
  const [buttonChange, setButtonChange] = useState("");
  const [buttonIsDisabled, setButtonIsDisabled] = useState(false);
  const [resultIsHidden, setResultIsHidden] = useState(true);

  async function handleClick() {
    setResultIsHidden(true);
    // Kita convert ke Principal si getWho karena dia Text untuk menyesuaikan saat fetch data dan ke INT dari Text
    setButtonIsDisabled(true);
    const getWhoToPrincipal = Principal.fromText(getWho);
    const getAmountToINT = Number(getAmount);
    const result = await token.transfer(getWhoToPrincipal, getAmountToINT);
    setButtonChange(result);
    setButtonIsDisabled(false);
    setResultIsHidden(false);

  }

  return (
    <div className="window white">
      <div className="transfer">
        <fieldset>
          <legend>To Account:</legend>
          <ul>
            <li>
              <input
                type="text"
                id="transfer-to-id"
                value={getWho}
                onChange={(event)=> setGetWho(event.target.value)}
              />
            </li>
          </ul>
        </fieldset>
        <fieldset>
          <legend>Amount:</legend>
          <ul>
            <li>
              <input
                type="number"
                id="amount"
                value={getAmount}
                onChange={((event) => setGetAmount(event.target.value))}
              />
            </li>
          </ul>
        </fieldset>
        <p className="trade-buttons">
          <button disabled={buttonIsDisabled} id="btn-transfer" onClick={handleClick} >
            Transfer
          </button>
        </p>
        <p hidden={resultIsHidden}>{buttonChange}</p>
      </div>
    </div>
  );
}

export default Transfer;
