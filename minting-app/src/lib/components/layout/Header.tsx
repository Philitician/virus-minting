import { Box, Flex, Heading } from "@chakra-ui/react";
import Link from "next/link";
import { useMoralis } from "react-moralis";
import ConnectWallet from "../account/ConnectWallet";
import DisconnectWallet from "../account/DisconnectWallet";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  const { isAuthenticated } = useMoralis();
  return (
    <Flex as="header" width="full" align="center">
      <Heading as="h1" size="md">
        <Link href="/">Virus NFT Minting</Link>
      </Heading>
      <Box marginLeft="auto">
        {!isAuthenticated && <ConnectWallet />}
        {isAuthenticated && <DisconnectWallet />}
        <ThemeToggle />
      </Box>
    </Flex>
  );
};

export default Header;
