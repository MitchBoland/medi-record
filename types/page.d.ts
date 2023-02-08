import { NextPage } from "next";

export type Page<P = {}> = NextPage<P> & {
  // You can disable whichever you don't need
  authPage?: boolean;
  homePage?: boolean;
};
