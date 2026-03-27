import { Router, type IRouter } from "express";
import { GetCurrencyRatesQueryParams, GetCurrencyRatesResponse } from "@workspace/api-zod";

const router: IRouter = Router();

// Static supplement for currencies not in ECB/Frankfurter (PKR, INR, BDT, etc.)
// These are updated periodically as fallback only for non-ECB currencies
const SUPPLEMENTAL_USD_RATES: Record<string, number> = {
  PKR: 278.50,
  INR: 83.95,
  BDT: 110.20,
  LKR: 320.50,
  NPR: 133.10,
  AFN: 71.50,
  MMK: 2100,
  VND: 24390,
  IDR: 15750,
  PHP: 56.30,
  THB: 35.10,
  MYR: 4.6540,
  NGN: 1580.00,
  KES: 129.50,
  GHS: 15.50,
  TZS: 2530,
  UGX: 3780,
  MAD: 10.04,
  DZD: 134.80,
  TND: 3.12,
  EGP: 48.50,
  KZT: 450.20,
  UAH: 41.20,
  ARS: 920.00,
  VEF: 36.50,
  UYU: 40.20,
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
    // Try ExchangeRate-API first (if key is active)
    const exchangeRateApiKey = process.env.EXCHANGE_RATE_API_KEY;
    if (exchangeRateApiKey) {
      try {
        const url = `https://v6.exchangerate-api.com/v6/${exchangeRateApiKey}/latest/${baseUpper}`;
        const response = await fetch(url, { signal: AbortSignal.timeout(5000) });
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
      } catch { /* fall through */ }
    }

    // Use Frankfurter (ECB data — live, free, no key needed)
    try {
      const frankfurterUrl = `https://api.frankfurter.app/latest?from=${baseUpper}`;
      const response = await fetch(frankfurterUrl, { signal: AbortSignal.timeout(5000) });
      if (response.ok) {
        const data = await response.json() as { base: string; rates: Record<string, number>; date: string };

        // Start with ECB rates
        const rates: Record<string, number> = { ...data.rates, [baseUpper]: 1 };

        // Supplement with non-ECB currencies, converting from USD base
        const usdRate = rates["USD"] ?? 1;
        for (const [code, usdValue] of Object.entries(SUPPLEMENTAL_USD_RATES)) {
          if (!rates[code]) {
            // Convert: 1 baseUpper = X USD, so 1 baseUpper = X * usdValue supplement
            rates[code] = parseFloat((usdRate * usdValue).toFixed(4));
          }
        }

        const result = GetCurrencyRatesResponse.parse({
          base: baseUpper,
          rates,
          timestamp: Math.floor(Date.now() / 1000),
        });
        res.json(result);
        return;
      }
    } catch { /* fall through */ }

    // Full static fallback (all currencies, USD-based)
    const STATIC_RATES: Record<string, number> = {
      USD: 1, EUR: 0.9199, GBP: 0.7697, JPY: 149.90, AUD: 1.5264,
      CAD: 1.3585, CHF: 0.8842, CNY: 7.2556, HKD: 7.7791, NZD: 1.6283,
      SEK: 10.3596, NOK: 10.5612, DKK: 6.8744, SGD: 1.3386, MYR: 4.6540,
      ...SUPPLEMENTAL_USD_RATES,
      AED: 3.6725, SAR: 3.7502, KWD: 0.3074, QAR: 3.6390, BHD: 0.3770,
      OMR: 0.3850, TRY: 33.50, ZAR: 18.63, RUB: 91.50, PLN: 4.02,
      HUF: 360.50, CZK: 22.80, RON: 4.58, ILS: 3.70, BRL: 5.70,
      MXN: 17.15, ARS: 920.00, CLP: 935.00, COP: 3950.00, PEN: 3.77,
    };

    const baseRate = STATIC_RATES[baseUpper] ?? 1;
    const convertedRates: Record<string, number> = {};
    for (const [code, rate] of Object.entries(STATIC_RATES)) {
      convertedRates[code] = parseFloat((rate / baseRate).toFixed(6));
    }

    res.json(GetCurrencyRatesResponse.parse({
      base: baseUpper,
      rates: convertedRates,
      timestamp: Math.floor(Date.now() / 1000),
    }));
  } catch (err) {
    req.log.error({ err }, "Currency API error");
    res.status(500).json({ error: "Failed to fetch currency rates" });
  }
});

export default router;
