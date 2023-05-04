import { solidsAddress } from "@/lib/constants";
import { useContractDetails } from "@/utils";
import s from "./Creator.module.scss";
import Nav from "@/components/Nav";
import Layout from "@/containers/Layout";
import SolidsModal from "@/components/SolidsModal";
import BottomTools from "@/components/BottomTools";

import SolidControls from "@/components/SolidControls";
import CreatorScene from "@/3D/scenes/Creator";

const CreatorPage = () => {
  return (
    <Layout>
      <div className={s.main}>
        <div className={s.canvasWrapper}>
          <CreatorScene />
        </div>
        <SolidControls />
        <SolidsModal />
        <BottomTools />
      </div>
    </Layout>
  );
};

export default CreatorPage;
