import { forwardRef, useImperativeHandle } from "react";
import { useThree } from "@react-three/fiber";

// eslint-disable-next-line react/display-name
const ScreenShotHandler = forwardRef((props, ref) => {
  const { gl, camera, controls } = useThree((state) => state);

  useImperativeHandle(ref, () => ({
    saveOutput() {
      return saveOutput();
    },
  }));

  function saveOutput() {
    const { domElement } = gl;
    const { width, height } = domElement;

    const body = domElement.toDataURL("image/webp");

    return { body, width, height };
  }

  return null;
});

export default ScreenShotHandler;
