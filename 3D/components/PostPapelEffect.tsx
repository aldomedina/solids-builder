import React from "react";
import PostPapel from "../effects/PostPapel";

const PostPapelEffect = () => {
  return (
    <PostPapel
      uBypass={false}
      uBlendMode={6}
      uBlendModeMix={0}
      uBlurInfluence={0.1}
      uBurnAmmount={0.1}
      uEdgeAlpha={0.01}
      uEdgeColor={"#000000"}
      uEdgeStrength={0.5}
      uGrainAmount={3}
      uNoiseAmp={0}
      uNoiseFreq={0}
      uPosterizeSteps={22}
      uPosterizeMix={0.14}
      uSeed={1}
    />
  );
};

export default PostPapelEffect;
