import { Button } from "@chakra-ui/react";
import React from "react";
import { useMoralis } from "react-moralis";

const DisconnectWallet = () => {
  const { logout } = useMoralis();
  return <Button onClick={() => logout()}>Disconnect</Button>;
};

export default DisconnectWallet;
