import { ColorScheme, extendTheme } from "@vechaiui/react";
import { colors } from "@vechaiui/react";

export const day: ColorScheme = {
  id: "day",
  type: "light",
  colors: {
    bg: {
      base: colors.gray["800"],
      fill: colors.gray["900"],
    },
    text: {
      foreground: colors.gray["100"],
      muted: colors.gray["300"],
    },
    primary: colors.teal,
    neutral: colors.gray,
  },
};

export const night: ColorScheme = {
  id: "night",
  type: "dark",
  colors: {
    bg: {
      base: colors.coolGray["900"],
      fill: colors.coolGray["900"],
    },
    text: {
      foreground: colors.coolGray["100"],
      muted: colors.coolGray["300"],
    },
    primary: colors.cyan,
    neutral: colors.coolGray,
  },
};

export const vechaiTheme = extendTheme({
  cursor: "pointer",
  colorSchemes: {
    day,
    night,
  },
});
