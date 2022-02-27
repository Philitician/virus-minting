import { Button } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useWeb3ExecuteFunction } from "react-moralis";
import contractAbi from "../../../abi/VirusNFT.json";
import { participatingVirusContract } from "../../../utils/constants";

const Minting = () => {
  const { data, error, fetch, isFetching, isLoading } = useWeb3ExecuteFunction({
    abi: contractAbi.abi,
    contractAddress: participatingVirusContract,
    functionName: "mint()",
  });
  useEffect(() => {
    console.log("data", data);
    console.log("error", error);
  }, [data, error]);
  return (
    <>
      <Button colorScheme="teal" onClick={() => fetch()}>
        Mint
      </Button>
    </>
  );
};

export default Minting;
