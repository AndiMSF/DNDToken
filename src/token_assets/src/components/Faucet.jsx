import React, { useState } from "react";
import { token, canisterId, createActor } from "../../../declarations/token/index";
import { AuthClient } from "@dfinity/auth-client"

function Faucet() {
  const [buttonText, setButtonText] = useState("I want!");
  const [buttonDisabled, setButtonDisabled] = useState(false);

  async function handleClick(event) {
    setButtonDisabled(true);

    const authClient = await AuthClient.create();
    const identity = await authClient.getIdentity();

    const authenticatedCanister = createActor(canisterId, {
      agentOptions: {
        identity,
      },
    });

    const result = await authenticatedCanister.payOut();
    setButtonText(result);
  }

  return (
    <div className="blue window">
      <h2>
        <span role="img" aria-label="tap emoji">
          ✨
        </span>
        LETS START!
      </h2>
      <label>Get your free DND tokens here! Claim 10,000 DND coins to your account.</label>
      <p className="trade-buttons">
        <button disabled={buttonDisabled} id="btn-payout" onClick={handleClick}>
          {buttonText}
        </button>
      </p>
    </div>
  );
}

export default Faucet;
