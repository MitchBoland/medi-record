import React from "react";
import { Image } from "@chakra-ui/react";

type Props = {
  image?: string;
};

export const BackgroundImage = ({ image }: Props) => {
  return (
    <>
      <Image
        src={image}
        alt="loginBackground"
        fill="true"
        objectFit="cover"
        position="absolute"
        minHeight="100vh"
        minWidth="100vw"
        maxHeight="100vh"
        maxWidth="100vw"
        zIndex="-1"
      />
    </>
  );
};

export default BackgroundImage;
