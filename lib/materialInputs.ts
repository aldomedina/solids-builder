export type TInputTypes = "range" | "checkbox";
export type TRangePreset = {
  max: number;
  min: number;
  step: number;
};
export type TPreset = TRangePreset;

export interface IInput {
  name: string;
  value: number;
  type: TInputTypes;
  presets: TPreset;
}

interface IMaterialInput {
  exploded: IInput[];
}

const materialInputs: IMaterialInput = {
  exploded: [
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
  ],
};

export default materialInputs;
