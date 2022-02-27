import { extendTheme } from "@chakra-ui/react";
import colors from "./colors";
import Button from "./components/button";
import fonts from "./fonts";

const customTheme = extendTheme({
  useSystemColorMode: false,
  fonts,
  colors,
  components: {
    Button,
  },
  initialColorMode: "dark",
});

export default customTheme;
