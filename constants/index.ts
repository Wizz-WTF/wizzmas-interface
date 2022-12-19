export const FRWC_WIZARDS_ADDRESS: string = process.env.NEXT_PUBLIC_WIZARDS_CONTRACT_ADDRESS ?? "";
export const FRWC_SOULS_ADDRESS: string = process.env.NEXT_PUBLIC_SOULS_CONTRACT_ADDRESS ?? "";
export const FRWC_WARRIORS_ADDRESS: string = process.env.NEXT_PUBLIC_WARRIORS_CONTRACT_ADDRESS ?? "";

export function getBaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.NEXT_PUBLIC_SITE_URL;
  if (url) {
    return "https://" + url;
  }
};