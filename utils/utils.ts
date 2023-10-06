export const OneSecInNano = BigInt(1000000000);
export const OneHourInNano = BigInt(3600000000000);
export const OneDayInNano = BigInt(24) * OneHourInNano;
export const ICRCASSETLIST = ["ICP", "ckBTC"];

export enum AuthProvider {
  InternetIdentity = "internetIdentity",

  Plug = "plug",
}

export function truncatePrincipal(str?: string, maxLength?: number) {
  try {
    if (str!.length <= maxLength!) {
      return str; // No need to truncate if the string is already within or equal to the desired length
    }

    const ellipsis = "...";
    const leftPart = str!.slice(0, 5);
    const rightPart = str!.slice(-3); // Get the last `midpoint` characters
    return leftPart + ellipsis + rightPart;
  } catch (error) {
    console.log(error);
  }
}

export function isNumeric(input: string): boolean {
  return /^[+-]?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(input);
}
