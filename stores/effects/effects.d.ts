export type TEffect = "postpapel" | "placeholder";

export interface IEffect {
  id: TEffect;
  params: IPostPapel | IPlaceHolderEffect;
}

export type IEffects = Map<string, IEffect>;

export interface IPlaceHolderEffect {}

export interface IPostPapel {
  uNoiseAmp: number;
  uPosterizeSteps: number;
  uPosterizeMix: number;
  uBurnAmmount: number;
  uBlurInfluence: number;
  uEdgeStrength: number;
  uNoiseFreq: number;
  uSeed: number;
  uEdgeAlpha: number;
  uGrainAmount: number;
  uEdgeColor: string;
  uBlendMode: number;
  uBlendModeMix: number;
  uBypass: boolean;
}
