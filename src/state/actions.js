// @flow
export const TEXT_CHANGED = 'TEXT_CHANGED';

export function textAction(text: string) {
  return {
    text,
    type: TEXT_CHANGED,
  };
}

export type TextAction = {
  text: string,
  type: string
}
