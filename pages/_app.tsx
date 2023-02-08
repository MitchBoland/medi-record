import { FC } from "react";
import type { AppProps } from "next/app";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { SiteLayout } from "../components/BaseLayout/SiteLayout";
import { Page } from "../types/page";
// reset css to be the same in every browser
import "reset-css";

const theme = extendTheme({
  colors: {
    brand: {
      100: "#3c99fa",
      200: "#3991ed",
      300: "#3588de",
      400: "#3280d1",
      500: "#2f78c4",
      600: "#2c70b8",
      700: "#2a69ac",
      800: "#153e75",
      900: "#1a365d",
    },
    gray: {
      100: "#F5F5F5",
      200: "#EEEEEE",
      300: "#E0E0E0",
      400: "#BDBDBD",
      500: "#9E9E9E",
      600: "#757575",
      700: "#616161",
      800: "#424242",
      900: "#212121",
    },
  },
  components: {
    Button: {
      variants: {
        link: {
          ":focus": {
            outline: "none",
            boxShadow: "none",
          },
        },
      },
    },
  },
});

// this should give a better typing
type Props = AppProps & {
  Component: Page;
};

const App: FC<Props> = ({ Component, pageProps }) => {
  const isAuthPage = !!Component.authPage;
  return (
    <ChakraProvider theme={theme}>
      {isAuthPage ? (
        <Component {...pageProps} />
      ) : (
        <SiteLayout>
          <Component {...pageProps} />
        </SiteLayout>
      )}
    </ChakraProvider>
  );
};

export default App;
