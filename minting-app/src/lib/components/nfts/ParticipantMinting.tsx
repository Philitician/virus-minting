import { Button } from "@chakra-ui/react";
import React from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import contractAbi from "../../../abi/VirusNFT.json";
import { participatingVirusContract } from "../../../utils/constants";

const ParticipantMinting = () => {
  const { data, error, fetch } = useWeb3ExecuteFunction({
    abi: contractAbi.abi,
    contractAddress: participatingVirusContract,
    functionName: "mint",
  });
  return (
    <>
      <Button colorScheme="teal" onClick={() => fetch()}>
        Participant Minting
      </Button>
    </>
  );
};

export default ParticipantMinting;
