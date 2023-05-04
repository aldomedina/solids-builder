import Head from "next/head";

import s from "./style.module.scss";
import cn from "classnames";
import { apfel } from "@/styles/fonts";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <>
      <Head>
        <title>SOLIDS BUILDER</title>
        <meta name="description" content="Solids Builder" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={cn(s.layout, apfel.className)}>{children}</div>
    </>
  );
};

export default Layout;
