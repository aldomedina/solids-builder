import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";
import { Vector2, Uniform, WebGLRenderTarget } from "three";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { CopyShader } from "three/examples/jsm/shaders/CopyShader";
import { blurShaderPass } from "./blurShaderPass";
import { getPaperShaderPass } from "./getPaperShaderPass";
import { IPostPapel } from "@/stores/effects/effects";

interface PostPapelProps extends IPostPapel {}

const PostPapel = ({
  uNoiseAmp,
  uPosterizeSteps,
  uPosterizeMix,
  uBurnAmmount,
  uBlurInfluence,
  uEdgeStrength,
  uNoiseFreq,
  uSeed,
  uEdgeAlpha,
  uGrainAmount,
  uEdgeColor,
  uBlendMode,
  uBlendModeMix,
  uBypass,
}: PostPapelProps) => {
  const { gl, scene, camera, size } = useThree((s) => s);
  const target = new WebGLRenderTarget(size.width / 4.0, size.height / 4.0);
  const renderScene = new RenderPass(scene, camera);

  const composer = new EffectComposer(gl, target);

  const paperShaderPass = getPaperShaderPass({
    uNoiseAmp,
    uPosterizeSteps,
    uPosterizeMix,
    uBurnAmmount,
    uBlurInfluence,
    uEdgeStrength,
    uNoiseFreq,
    uSeed,
    uEdgeAlpha,
    uGrainAmount,
    uEdgeColor,
    uBlendMode,
    uBlendModeMix,
    uBypass,
  });

  const blurPass = new ShaderPass(blurShaderPass, "tDiffuse");
  const copyPass = new ShaderPass(CopyShader);

  blurPass.renderToScreen = false;
  blurPass.needsSwap = true;

  composer.addPass(renderScene);
  composer.addPass(blurPass);
  composer.addPass(copyPass);

  blurPass.material.uniforms.resolution = new Uniform(
    new Vector2(target.width, target.height)
  );
  composer.renderToScreen = false;

  const composerFinal = new EffectComposer(gl);
  const finalPass = new ShaderPass(paperShaderPass, "tDiffuse");
  finalPass.material.uniforms["tBlured"].value = target.texture;
  finalPass.material.uniforms.resolution = new Uniform(
    new Vector2(size.width, size.height)
  );
  composerFinal.addPass(renderScene);
  composerFinal.addPass(finalPass);

  composerFinal.renderToScreen = true;

  finalPass.material.uniforms.uTexelSize.value = [
    1.0 / size.width,
    1.0 / size.height,
  ];
  finalPass.material.uniforms.uResolution = new Uniform(
    new Vector2(size.width, size.height)
  );

  useEffect(() => {
    finalPass.uniforms.uBlurInfluence.value = 0.5 - uBlurInfluence;
    composer.render();
    composerFinal.render();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    uNoiseAmp,
    uEdgeStrength,
    uNoiseFreq,
    uSeed,
    uEdgeAlpha,
    uGrainAmount,
    uBurnAmmount,
    uPosterizeSteps,
    uPosterizeMix,
    uEdgeColor,
    uBlurInfluence,
    uBlendMode,
    uBlendModeMix,
    uBypass,
  ]);

  useFrame(() => {
    composer.render();
    composerFinal.render();
  }, 1);

  return null;
};

export default PostPapel;
