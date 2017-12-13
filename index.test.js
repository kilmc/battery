import { generate } from './index';


const inputClasses = [
  "flex", "border", "w100p", "h11", "px3-lg",
  "mb2", "items-center", "rounded", "border-grey-500", "hover-shadow",
  "focus-green-700-md", "pointer", "t0", "r-5", "hide",
  "block-sm", "py0", "bg-transparent", "absolute", "h100p",
  "bg-grey-100_95", "z1"
];

test('generate', () => {
  expect(generate('mt basis')).toBe('{"mt":{"margin-top":""},"basis":{"flex-basis":""}}');
});

