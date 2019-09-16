export type Matcher = RegExp;
export type Matchers = {
  keyword?: Matcher;
  [k: string]: Matcher;
};
