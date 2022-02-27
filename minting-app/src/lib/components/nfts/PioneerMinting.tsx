import { Button, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import { pioneeringVirusContract } from "utils/constants";
import pioneeringAbi from "../../../abi/PioneeringVirusNFT.json";

const PioneerMinting = () => {
  const mintFunction = usePioneerContract("mint");
  const isWhitelistedFunction = usePioneerContract("isWhitelisted");
  const hasMintedFunction = usePioneerContract("hasMinted");
  const { account, user } = useMoralis();
  const [hasMinted, setHasMinted] = useState(false);
  const [isWhitelisted, setIsWhitelisted] = useState(false);
  const { alreadyMintedToast, notWhitelistedToast } = useToasts();

  const mintPioneerVirus = async () => {
    if (!isWhitelisted) return notWhitelistedToast();
    if (hasMinted) return alreadyMintedToast();
    const mintTx = await mintFunction.fetch();
  };

  useEffect(() => {
    if (!account && !user?.getUsername) return;

    const handleIsWhitelisted = async () => {
      const isWhitelisted = (await isWhitelistedFunction.fetch()) as boolean;
      setIsWhitelisted(isWhitelisted);
    };

    const handleHasMinted = async () => {
      const hasMinted = (await hasMintedFunction.fetch()) as boolean;
      setHasMinted(hasMinted);
    };

    handleIsWhitelisted();
    handleHasMinted();
  }, [account, user?.getUsername()]);

  return (
    <>
      <Button colorScheme="purple" onClick={mintPioneerVirus}>
        Pioneer Minting
      </Button>
    </>
  );
};

const useToasts = () => {
  const toast = useToast();
  const notWhitelistedToast = () => {
    toast({
      title: "Not Whitelisted",
      description: "You must be whitelisted to mint pioneer viruses.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  const alreadyMintedToast = () => {
    toast({
      title: "Already Minted",
      description: "You have already minted your pioneer virus.",
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };
  return { notWhitelistedToast, alreadyMintedToast };
};

const usePioneerContract = (functionName: string) => {
  return useWeb3ExecuteFunction({
    abi: pioneeringAbi.abi,
    contractAddress: pioneeringVirusContract,
    functionName,
  });
};

export default PioneerMinting;
