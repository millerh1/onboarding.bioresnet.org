import type { DeepPartial, Theme } from "@chakra-ui/react";

/** extend additional color here */
const extendedColors: DeepPartial<
  Record<string, Theme["colors"]["blackAlpha"]>
> = {
  brand: {
    50: "#85E0B4",
    100: "#85E0B4",
    200: "#85E0B4",
    300: "#85E0B4",
    400: "#85E0B4",
    500: "#85E0B4",
    600: "#85E0B4",
    700: "#85E0B4",
    800: "#85E0B4",
    900: "#85E0B4",
  },
};

/** override chakra colors here */
const overridenChakraColors: DeepPartial<Theme["colors"]> = {};

const colors = {
  ...overridenChakraColors,
  ...extendedColors,
};

export default colors;
