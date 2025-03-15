import arcjet, { detectBot, shield, tokenBucket } from "@arcjet/node";
import { ARCJET_KEY, NODE_ENV } from "../config/env.js";

const rules = [
  shield({ mode: "LIVE" }),

  ...(NODE_ENV === "production"
    ? [
        detectBot({
          mode: "LIVE",
          allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
      ]
    : []), // Disable detectBot in development

  tokenBucket({
    mode: "LIVE",
    refillRate: 1,
    interval: 5,
    capacity: 3,
    scope: ["ip.src"],
  }),
];

const aj = arcjet({
  key: ARCJET_KEY,
  characteristics: ["ip.src"],
  rules,
});

export default aj;
