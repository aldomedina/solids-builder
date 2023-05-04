import {
  ForwardedRef,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";
import { useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Vector3 } from "three";
import { getPartialV3 } from "@/utils";
import useOutputStore from "@/store/output-v2-store";

// eslint-disable-next-line react/display-name
const Controls = forwardRef((props, ref) => {
  const { position, target } = useOutputStore((s) => s.camera);
  const uNoiseAmp = useOutputStore((s) => s.uNoiseAmp);
  const uPosterizeSteps = useOutputStore((s) => s.uPosterizeSteps);
  const uPosterizeMix = useOutputStore((s) => s.uPosterizeMix);
  const uBurnAmmount = useOutputStore((s) => s.uBurnAmmount);
  const uBlurInfluence = useOutputStore((s) => s.uBlurInfluence);
  const uEdgeStrength = useOutputStore((s) => s.uEdgeStrength);
  const uNoiseFreq = useOutputStore((s) => s.uNoiseFreq);
  const uSeed = useOutputStore((s) => s.uSeed);
  const uEdgeAlpha = useOutputStore((s) => s.uEdgeAlpha);
  const uGrainAmount = useOutputStore((s) => s.uGrainAmount);
  const uEdgeColor = useOutputStore((s) => s.uEdgeColor);
  const explodeStrength = useOutputStore((s) => s.explodeStrength);
  const explodeAmplitude = useOutputStore((s) => s.explodeAmplitude);
  const noiseFreq = useOutputStore((s) => s.noiseFreq);

  const controlsRef = useRef<any>(null);
  useImperativeHandle(ref, () => ({
    getCameraDetails() {
      return getCameraDetails();
    },
  }));

  function getCameraDetails() {
    if (!controlsRef.current) return;
    const {
      target,
      object: { position },
    } = controlsRef.current;
    return { target: getPartialV3(target), position: getPartialV3(position) };
  }

  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.target = new Vector3(target.x, target.y, target.z);
    controlsRef.current.object.position.x = position.x;
    controlsRef.current.object.position.y = position.y;
    controlsRef.current.object.position.z = position.z;
    controlsRef.current.update();
  }, [position, target]);

  // ! TODO: REMOVE AND FIND FIX EFFECT HOTRELOADS
  useEffect(() => {
    if (!controlsRef.current) return;
    controlsRef.current.object.position.x += 0.001;
    controlsRef.current.update();
  }, [explodeStrength, explodeAmplitude, noiseFreq]);

  return (
    <OrbitControls
      //@ts-ignore
      ref={controlsRef}
    />
  );
});

export default Controls;
