export const SUPPORTED_TOKENS = [
  //'0x521f9C7505005CFA19A8E5786a9c3c9c9F5e6f42', //wizards
  //'0x251b5F14A825C537ff788604eA1b58e49b70726f', // souls
  //'0x9690b63Eb85467BE5267A3603f770589Ab12Dc95', // warriors
  '0xBc1C0aDF6c7500d0E58c4da39609C0979078f4D4', // wizards
  '0xe60E17d9DF5A60dfAd40006323F652725C94d814', // souls
  '0xf731202A3cf7EfA9368C2d7bD613926f7A144dB5', // warriors
]

export const FRWC_WIZARDS_ADDRESS: string = SUPPORTED_TOKENS[0]
export const FRWC_SOULS_ADDRESS: string = SUPPORTED_TOKENS[1]
export const FRWC_WARRIORS_ADDRESS: string = SUPPORTED_TOKENS[2]

export function getBaseUrl(): string | undefined {
  const url = process.env.NEXT_PUBLIC_VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL;
  if (url) {
    return "https://" + url;
  }
};