// @flow

export const toDecimal = (value: number, round: number = 2): number =>
  value && +value.toFixed(round);

export const toPercentile = (value: number, round: number = 2): string =>
  (value ? `${value && (value * 100).toFixed(round)}%` : "");

// TODO
export const toMoney = (value: number | string, c: number = 2, d: string = ".", t: string = ","): string => {
  let n = +value;
  c = (Number.isNaN(Math.abs(+c))) ? 2 : Math.abs(+c);
  const s = n < 0 ? "-" : "";
  const i = `${parseInt(n = Math.abs(+n || 0).toFixed(c), 10)}`;
  const j = (i.length > 3) ? i.length % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "")
    + i.substr(j).replace(/(\d{3})(?=\d)/g, `$1${t}`)
    + (c ? d + Math.abs(+n - +i).toFixed(c).slice(2) : "");
};
