import useEffectsStore from "@/stores/effects";
import { IEffect } from "@/stores/effects/effects";
import React from "react";
import PostPapelEffect from "./PostPapelEffect";

const Effects = () => {
  const effects = useEffectsStore((s) => {
    const obj = {};
    if (!s.effects.size) return {};
    s.effects.forEach((el) => {
      obj[id] = el.params;
    });
    return obj;
  });

  return <>{effects.postpapel && <PostPapelEffect />}</>;
};

export default Effects;
