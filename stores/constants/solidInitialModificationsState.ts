export type TMaterial = "exploded" | "original";

export interface IExploded {
  strength: number;
  amplitude: number;
  frequency: number;
}

export interface ISolidState {
  material: TMaterial;
  exploded: IExploded;
}

const init: ISolidState = {
  material: "original",
  exploded: {
    strength: 0.5,
    amplitude: 0.5,
    frequency: 0.5,
  },
};

export default init;
