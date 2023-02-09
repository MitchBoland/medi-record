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
      //brand red
      100: "#D34E4C",
      200: "#D63230",
      //brand green
      300: "#41B58A",
      400: "#32936F",
      500: "#297A5C",
      //brand blue
      600: "#8790F3",
      700: "#636DD8",
      800: "#5762D5",
      900: "#3D49D0",
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
        submit: {
          backgroundColor: "brand.800",
          color: "white",
          width: "120px",
          height: "36px",
          fontSize: "14px",
          margin: "5px",
          transition: "0.2s background-color ease-in-out",
          border: "1px solid",
          borderColor: "brand.700",
          _hover: {
            backgroundColor: "brand.700",
          },
        },
        link: {
          color: "brand.600",
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
