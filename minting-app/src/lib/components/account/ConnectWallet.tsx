import { Button } from "@chakra-ui/react";
import React from "react";
import { useMoralis } from "react-moralis";

interface ConnectButtonProps {
  size?: "md" | "xl";
}

const ConnectWallet = ({ size = "md" }: ConnectButtonProps) => {
  const { authenticate } = useMoralis();
  return (
    <>
      <Button fontSize={size} onClick={() => authenticate()}>
        Connect
      </Button>
    </>
  );
};

export default ConnectWallet;
