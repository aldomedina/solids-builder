import palettes from "@/lib/palettes";

export type TMaterial = "exploded" | "original";

export interface IExploded {
  palette: string[];
  strength: number;
  amplitude: number;
  frequency: number;
  animated: boolean;
}

export interface ISolidState {
  material: TMaterial;
  exploded: IExploded;
}

const init: ISolidState = {
  material: "original",
  exploded: {
    palette: palettes[0],
    strength: 0.5,
    amplitude: 0.5,
    frequency: 0.5,
    animated: false,
  },
};

export default init;
