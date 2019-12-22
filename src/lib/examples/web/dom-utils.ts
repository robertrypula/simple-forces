// Copyright (c) 2018-2019 Robert Rypuła - https://github.com/robertrypula

export const createElement = (tag: string): HTMLElement => document.createElement(tag) as HTMLElement;
export const getById = (id: string): HTMLElement => document.getElementById(id) as HTMLElement;
export const getContext2dById = (id: string): CanvasRenderingContext2D =>
  (document.getElementById(id) as HTMLCanvasElement).getContext('2d');
export const getByIdInput = (id: string): HTMLInputElement => document.getElementById(id) as HTMLInputElement;
export const getByTagName = (tag: string): HTMLElement => document.getElementsByTagName(tag)[0] as HTMLElement;
