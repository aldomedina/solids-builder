import Marquee from "react-fast-marquee";
import ConnectButton from "../ConnectButton";

import s from "./style.module.scss";

const Nav = () => {
  return (
    <div className={s.nav}>
      <Marquee autoFill className={s.marquee} direction="right">
        |
      </Marquee>
      <ConnectButton />
    </div>
  );
};

export default Nav;
