import got from "got";
import { DateTime } from "luxon";

const dhlURL = "http://www.dhl-usa.com/en/express/shipping/shipping_advice/express_fuel_surcharge.html";

export async function handler(): Promise<number> {
  const { body } = await got.get(dhlURL, {
    maxRedirects: 3,
    responseType: "text",
  });

  const today = DateTime.local().toISODate();
  const matches: RegExpMatchArray | null = body.match(/>([\d.]+)%<.td>/);

  console.log(today);
  if (!matches || matches.length < 2) {
    throw new Error("Surcharge not found");
  }

  return parseFloat(matches[1]);
}

export default {
  handler,
};
