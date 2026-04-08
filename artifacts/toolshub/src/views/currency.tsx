"use client";

import { useState, useMemo, useEffect } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button, Select, Label } from "@/components/ui";
import { ArrowRightLeft, RefreshCw, TrendingUp } from "lucide-react";
import { useGetCurrencyRates } from "@workspace/api-client-react";
import { CURRENCIES } from "@/lib/currencies";

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("PKR");
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const { data: ratesData, isLoading, dataUpdatedAt, refetch } = useGetCurrencyRates(
    { base: from },
    {
      query: {
        enabled: !!from,
        refetchInterval: 60 * 1000,
        staleTime: 30 * 1000,
      } as any
    }
  );

  useEffect(() => {
    if (dataUpdatedAt) setLastUpdated(new Date(dataUpdatedAt));
  }, [dataUpdatedAt]);

  const convertedAmount = useMemo(() => {
    if (!ratesData || !ratesData.rates[to]) return 0;
    return amount * ratesData.rates[to];
  }, [amount, to, ratesData]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  const popularPairs = [
    { from: "USD", to: "PKR", label: "USD → PKR" },
    { from: "USD", to: "INR", label: "USD → INR" },
    { from: "EUR", to: "USD", label: "EUR → USD" },
    { from: "GBP", to: "USD", label: "GBP → USD" },
    { from: "USD", to: "AED", label: "USD → AED" },
    { from: "USD", to: "SAR", label: "USD → SAR" },
  ];

  return (
    <Layout>
      <SeoHead
        title="Live Currency Converter - Real-Time Exchange Rates | ToolsHub"
        description="Convert currencies with live exchange rates. USD to PKR, EUR to USD, and 60+ currency pairs. Auto-refreshes every minute for accuracy."
        keywords="currency converter, exchange rates, USD to PKR, USD to INR, live forex rates"
      />

      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 mb-4">
            <TrendingUp className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Live Currency Converter</h1>
          <p className="text-muted-foreground">Real-time exchange rates for 60+ currencies. Rates refresh every minute.</p>
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {popularPairs.map((pair) => (
            <button
              key={pair.label}
              onClick={() => { setFrom(pair.from); setTo(pair.to); }}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all ${from === pair.from && to === pair.to ? "bg-primary text-primary-foreground border-primary" : "bg-muted hover:bg-muted/80 border-border"}`}
            >
              {pair.label}
            </button>
          ))}
        </div>

        <Card className="p-6 md:p-10 shadow-xl border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
            <div className="space-y-3">
              <Label>Amount</Label>
              <Input
                type="number"
                min="0"
                value={amount || ""}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-lg font-bold h-12"
              />
              <Label className="mt-4 block">From Currency</Label>
              <Select value={from} onChange={(e) => setFrom(e.target.value)} className="h-12">
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </Select>
            </div>

            <div className="flex justify-center pb-2">
              <Button variant="outline" size="icon" onClick={handleSwap} className="rounded-full shadow-md w-12 h-12">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Converted Amount</Label>
              <div className="h-12 w-full rounded-xl border-2 border-primary/20 bg-primary/5 px-4 py-2 text-lg font-bold flex items-center text-primary">
                {isLoading ? "Loading..." : convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </div>
              <Label className="mt-4 block">To Currency</Label>
              <Select value={to} onChange={(e) => setTo(e.target.value)} className="h-12">
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </Select>
            </div>
          </div>

          {!isLoading && ratesData && (
            <div className="mt-8 p-5 bg-muted/30 rounded-2xl text-center border border-border/50">
              <p className="text-xs text-muted-foreground mb-1">Current Exchange Rate</p>
              <p className="text-2xl font-bold">
                1 {from} = <span className="text-primary">{ratesData.rates[to]?.toFixed(4)}</span> {to}
              </p>
              <div className="flex items-center justify-center gap-2 mt-3">
                <p className="text-xs text-muted-foreground">
                  {lastUpdated ? `Rates as of ${lastUpdated.toLocaleTimeString()}` : "Loading rates..."}
                </p>
                <button onClick={() => refetch()} className="text-xs text-primary hover:underline flex items-center gap-1">
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>
            </div>
          )}
        </Card>

        <div className="mt-8 ad-banner p-5 rounded-xl bg-muted/30 border text-center text-muted-foreground text-sm">
          
        </div>

        {ratesData && (
          <div className="mt-10">
            <h2 className="text-xl font-bold mb-4">Live Rates vs {from}</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {["USD", "EUR", "GBP", "PKR", "INR", "AED", "SAR", "JPY", "CNY", "AUD", "CAD", "TRY"].filter(c => c !== from).map((code) => {
                const curr = CURRENCIES.find(c => c.code === code);
                const rate = ratesData.rates[code];
                return rate ? (
                  <div key={code} className="p-3 bg-card border border-border rounded-xl">
                    <p className="text-xs text-muted-foreground">{curr?.name || code}</p>
                    <p className="font-bold mt-1">{rate.toLocaleString(undefined, { maximumFractionDigits: 4 })}</p>
                  </div>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
