import { ThemeProvider } from "styled-components";
import { ReactNode } from "react";
import { coolTheme } from "./coolTheme";

type ThemeProviderProps = {
  children: ReactNode;
};

export default function Theme({ children }: ThemeProviderProps) {
  return <ThemeProvider theme={coolTheme}>{children}</ThemeProvider>;
}
