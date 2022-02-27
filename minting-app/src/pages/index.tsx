import { Box, Stack, Text } from "@chakra-ui/react";
import DisplayNFTs from "lib/components/nfts/DisplayNFTs";
import ParticipantMinting from "lib/components/nfts/ParticipantMinting";
import PioneerMinting from "lib/components/nfts/PioneerMinting";
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
          <Stack direction="row">
            <PioneerMinting />
            <ParticipantMinting />
          </Stack>
          <DisplayNFTs />
        </Stack>
      )}
    </Box>
  );
};

export default Home;
