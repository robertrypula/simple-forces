// Copyright (c) 2018 Robert Rypuła - https://github.com/robertrypula

export const getTime = (): number => {
  return (new Date().getTime()) / 1000;
};

export const format = (value: number, toFixed: number = 3, factor: number = 1): string => {
  return (value / factor).toFixed(toFixed);
};
