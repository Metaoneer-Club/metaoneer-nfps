import React, { useState } from "react";
import Payments from "metaoneer-payment";

const TOKEN_ID = 2;
const BUY_COUNT = 101;

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openHandler = () => {
    setIsOpen(true);
  };

  const closeHandler = () => {
    setIsOpen(false);
  };

  return (
    <div>
      <button onClick={openHandler}>Open Payment</button>
      {isOpen && (
        <Payments
          tokenId={TOKEN_ID}
          buyCount={BUY_COUNT}
          close={closeHandler}
        />
      )}
    </div>
  );
}

export default App;

// src/App.js
