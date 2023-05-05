import { solidsAddress } from "@/lib/constants";
import { useContractDetails } from "@/utils";
import s from "./Creator.module.scss";
import Nav from "@/components/Nav";
import Layout from "@/containers/Layout";
import SolidsModal from "@/components/SolidsModal";
import BottomTools from "@/components/BottomTools";

import FloatingPanels from "@/components/FloatingPanels";
import CreatorScene from "@/3D/scenes/Creator";
import EffectsModal from "@/components/EffectsModal";

const CreatorPage = () => {
  return (
    <Layout>
      <div className={s.main}>
        <div className={s.canvasWrapper}>
          <CreatorScene />
        </div>
        <FloatingPanels />
        <SolidsModal />
        <BottomTools />
        <EffectsModal />
      </div>
    </Layout>
  );
};

export default CreatorPage;
