// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

/*tslint:disable:no-bitwise*/

export const getTime = (): number => {
  return new Date().getTime() / 1000;
};

export const formatNumber = (value: number, toFixed: number = 3, factor: number = 1): string => {
  return (value / factor).toFixed(toFixed);
};

export const formatTime = (seconds: number): string => {
  const result: string[] = [];
  const fractionMultiplier = Math.pow(1e3, 3);
  const ranges = [
    [365 * 24 * 60 * 60, 0, ' year', ' years', false],
    [24 * 60 * 60, 3, ' day', ' days', false],
    [60 * 60, 2, 'h', 'h', false],
    [60, 2, 'm', 'm', false],
    [1, 2, 's', 's', false],
    [Math.pow(1e3, 2), 3, 'ms ', 'ms', true],
    [Math.pow(1e3, 1), 3, 'μs ', 'μs', true],
    [Math.pow(1e3, 0), 3, 'ns ', 'ns', true]
  ];
  let integerPart: number = Math.floor(seconds);
  let fractionPartMultiplied: number = Math.floor((seconds - integerPart) * fractionMultiplier);

  ranges.forEach(range => {
    let value: number;

    if (range[4]) {
      value = Math.floor(fractionPartMultiplied / +range[0]);
      fractionPartMultiplied -= value * +range[0];
    } else {
      value = Math.floor(integerPart / +range[0]);
      integerPart -= value * +range[0];
    }
    result.push(`${padStart(value, 10, +range[1])}${value === 1 ? range[2] : range[3]}`);
  });

  return result.join(' ');
};

export const padStart = (value: number, radix: number, length: number, fillWith = '0'): string => {
  const result: string = (value >> 0).toString(radix);
  const missingCharacters = length - result.length;

  return missingCharacters > 0 ? fillWith.repeat(missingCharacters) + result : result;
};
