// Define your models here.

export interface Model {
  id: string;
  label: string;
  apiIdentifier: string;
  description: string;
}

export const models: Array<Model> = [
  {
    id: 'gemini-2.0-flash-experimental',
    apiIdentifier: 'gemini-2.0-flash-experimental',
    label: 'Gemini 2.0 flash experimental',
    description: 'For complex, multi-step tasks',
  },
  {
    id: 'gemini-1.5-pro-latest',
    label: 'Gemini 1.5 pro latest',
    apiIdentifier: 'gemini-1.5-pro-latest',
    description: 'For complex, multi-step tasks',
  },
] as const;

export const DEFAULT_MODEL_NAME: string = 'gpt-4o-mini';
