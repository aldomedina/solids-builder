import palettes from "./palettes";

export type TInputTypes = "range" | "checkbox" | "palette";
export type TRangePreset = {
  max: number;
  min: number;
  step: number;
};
export type TPreset = TRangePreset;

export interface IInput {
  name: string;
  value: number | boolean | string | string[];
  type: TInputTypes;
  presets?: TPreset;
  options?: any[];
}

interface IMaterialInput {
  exploded: IInput[];
}

const materialInputs: IMaterialInput = {
  exploded: [
    {
      name: "palette",
      value: palettes[0],
      type: "palette",
      options: palettes,
    },
    {
      name: "strength",
      value: 0.5,
      type: "range",
      presets: {
        max: 10,
        min: 0,
        step: 0.01,
      },
    },
    {
      name: "amplitude",
      value: 0.5,
      type: "range",
      presets: {
        max: 10,
        min: 0,
        step: 0.01,
      },
    },
    {
      name: "frequency",
      value: 0.5,
      type: "range",
      presets: {
        max: 10,
        min: 0,
        step: 0.01,
      },
    },
    {
      name: "animated",
      value: false,
      type: "checkbox",
    },
  ],
};

export default materialInputs;
