import Layout from "@/containers/Layout";
import Marquee from "react-fast-marquee";
import s from "./Home.module.scss";
import cn from "classnames";
import { outward } from "@/styles/fonts";

import Nav from "@/components/Nav";

export default function Home() {
  return (
    <Layout>
      <div className={s.main}>
        <Nav />
        <Marquee speed={30} autoFill className={s.marquee}>
          <h1 className={cn(outward.className, s.title)}> SOLIDS </h1>
        </Marquee>
        <Marquee
          speed={30}
          autoFill
          className={cn(s.marquee, s.secondMarquee)}
          direction="right"
        >
          <h1 className={cn(outward.className, s.title)}> BUILDER </h1>
        </Marquee>
        <div className={s.pitch}>
          <p>
            Design 3D spaces effortlessly using our web app. Utilize SOLIDS, a
            unique set of generative architecture art pieces, for enhancing your
            creation process. Enjoy a seamless user interface for a smooth and
            immersive user experience.
          </p>
        </div>
      </div>
    </Layout>
  );
}
