export const OneSecInNano = BigInt(1000000000);
export const OneHourInNano = BigInt(3600000000000);
export const OneDayInNano = BigInt(24) * OneHourInNano;

export enum AuthProvider {
  InternetIdentity = "internetIdentity",

  Plug = "plug",
}
