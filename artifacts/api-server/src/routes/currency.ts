import { Router, type IRouter } from "express";
import { GetCurrencyRatesQueryParams, GetCurrencyRatesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

const FALLBACK_RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  PKR: 278.5,
  INR: 83.1,
  CNY: 7.24,
  AUD: 1.53,
  CAD: 1.36,
  CHF: 0.89,
  MYR: 4.65,
  SGD: 1.34,
  HKD: 7.82,
  NZD: 1.63,
  SEK: 10.41,
  NOK: 10.56,
  DKK: 6.89,
  ZAR: 18.63,
  BRL: 4.97,
  MXN: 17.15,
  AED: 3.67,
  SAR: 3.75,
  KWD: 0.31,
  BHD: 0.38,
  OMR: 0.38,
  QAR: 3.64,
  EGP: 30.9,
  TRY: 30.5,
  RUB: 91.5,
  IDR: 15650,
  THB: 35.1,
  VND: 24390,
  PHP: 56.3,
  BDT: 110.2,
  LKR: 320.5,
  NPR: 133.1,
  AFN: 71.5,
  MMK: 2100,
  KES: 152.3,
  NGN: 1580,
  GHS: 12.5,
  TZS: 2530,
  UGX: 3780,
  MAD: 10.04,
  DZD: 134.8,
  TND: 3.12,
  UAH: 38.2,
  PLN: 4.02,
  HUF: 360.5,
  CZK: 22.8,
  RON: 4.58,
  HRK: 6.93,
  ILS: 3.7,
  KZT: 450.2,
};

router.get("/currency/rates", async (req, res) => {
  const query = GetCurrencyRatesQueryParams.safeParse(req.query);
  if (!query.success) {
    res.status(400).json({ error: "Base currency code is required" });
    return;
  }

  const { base } = query.data;
  const baseUpper = base.toUpperCase();

  try {
    const apiKey = process.env.EXCHANGE_RATE_API_KEY;

    if (apiKey) {
      const url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${baseUpper}`;
      const response = await fetch(url);

      if (response.ok) {
        const data = await response.json() as Record<string, unknown>;
        if (data.result === "success") {
          const result = GetCurrencyRatesResponse.parse({
            base: baseUpper,
            rates: data.conversion_rates as Record<string, number>,
            timestamp: Math.floor(Date.now() / 1000),
          });
          res.json(result);
          return;
        }
      }
    }

    const baseRate = FALLBACK_RATES[baseUpper] || 1;
    const convertedRates: Record<string, number> = {};
    for (const [code, rate] of Object.entries(FALLBACK_RATES)) {
      convertedRates[code] = parseFloat((rate / baseRate).toFixed(6));
    }

    const result = GetCurrencyRatesResponse.parse({
      base: baseUpper,
      rates: convertedRates,
      timestamp: Math.floor(Date.now() / 1000),
    });
    res.json(result);
  } catch (err) {
    req.log.error({ err }, "Currency API error");
    res.status(500).json({ error: "Failed to fetch currency rates" });
  }
});

export default router;
