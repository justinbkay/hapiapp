// import got from "got";
import axios from "axios";
import { DateTime } from "luxon";

const dhlURL = "";

export async function handler(): Promise<number> {
  const today = DateTime.local().toISODate();
  let rate = 0;
  await axios
    .get(dhlURL)
    .then((response) => {
      console.log(today);
      const matches: RegExpMatchArray | null = String(response.data).match(/>([\d.]+)%<.td>/);
      if (matches !== null) {
        rate = parseFloat(matches[1]);
      } else {
        rate = -1;
      }
    })
    .catch((error) => {
      throw error;
    });
  return rate;
}

export default {
  handler,
};
