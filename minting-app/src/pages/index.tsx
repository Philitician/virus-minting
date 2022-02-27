import { Box, Stack, Text } from "@chakra-ui/react";
import DisplayNFTs from "lib/components/nfts/DisplayNFTs";
import Minting from "lib/components/nfts/Minting";
import { useMoralis } from "react-moralis";

const Home = () => {
  const { isAuthenticated } = useMoralis();
  return (
    <Box>
      {!isAuthenticated && (
        <Text fontSize="xl">Please connect your wallet!</Text>
      )}
      {isAuthenticated && (
        <Stack direction="column" alignItems="center">
          <Minting />
          <DisplayNFTs />
        </Stack>
      )}
    </Box>
  );
};

export default Home;
