import { Box, Image, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useMoralis, useMoralisWeb3Api } from "react-moralis";
import { participatingVirusContract } from "../../../utils/constants";
import { IMetadata, INFT } from "./INFT";

const DisplayNFTs = () => {
  const { user, isAuthenticated } = useMoralis();
  const {
    account: { getNFTsForContract },
  } = useMoralisWeb3Api();
  const [ownedVirusNFTs, setOwnedVirusNFTs] = useState<INFT[]>([]);
  useEffect(() => {
    if (!isAuthenticated) return;

    const serialize = (metadataRaw: string) => {
      const metadata: IMetadata = JSON.parse(metadataRaw);
      return metadata;
    };

    const getNFTs = async () => {
      const address = user?.attributes.accounts[0] ?? "";
      const { result: participatingNFTs } = await getNFTsForContract({
        token_address: participatingVirusContract,
        address,
        chain: "mumbai",
      });
      const nfts: INFT[] =
        participatingNFTs?.map((nft) => {
          const metadata = serialize(nft.metadata ?? "");
          return {
            ...nft,
            metadata,
          };
        }) ?? [];
      // const { result: pioneeringNFTs } = await getNFTsForContract({
      //   token_address: pioneeringVirusContract,
      //   address,
      // });
      setOwnedVirusNFTs([...nfts]);
      // setOwnedVirusNFTs(participatingNFTs);
    };
    getNFTs();
  }, [isAuthenticated]);

  return <Box>{ownedVirusNFTs && ownedVirusNFTs?.map(NFTCard)}</Box>;
};

const NFTCard = ({
  metadata: { name, image, achievement },
  token_uri,
}: INFT) => {
  const imageUrl = createImageUrl(image, token_uri ?? "");
  return (
    <Box maxWidth={512} py={5}>
      <Text fontSize="xl">{name}</Text>
      <Text>{achievement}</Text>
      <Image sx={{ minHeight: 512, minWidth: 512 }} src={imageUrl} alt={name} />
    </Box>
  );
};

const createImageUrl = (image: string, token_uri: string) => {
  const baseUrl = token_uri.split("/ipfs/")[0];
  const imageIdUrl = image.split("ipfs://")[1];
  return `${baseUrl}/ipfs/${imageIdUrl}`;
};

export default DisplayNFTs;
