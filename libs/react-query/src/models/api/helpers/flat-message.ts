// import i18next from 'i18next';

// export const FlatMessage = <
//   T extends object = any,
//   K extends keyof T = keyof T
// >(
//   arr: string[]
// ): { [key in K]?: string } => {
//   const res = arr.map(mes => {
//     const kv = mes.split('|') as [string, string];
//     return [kv[0], i18next.t(kv[1], { ns: 'backend-form-errors' })];
//   });
//   return Object.fromEntries(res);
// };
export {};
