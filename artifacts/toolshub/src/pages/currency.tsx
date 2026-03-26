import { useState, useMemo } from "react";
import { Layout } from "@/components/layout";
import { SeoHead } from "@/components/seo-head";
import { Card, Input, Button, Select, Label } from "@/components/ui";
import { ArrowRightLeft } from "lucide-react";
import { useGetCurrencyRates } from "@workspace/api-client-react";
import { CURRENCIES } from "@/lib/currencies";

export function CurrencyConverter() {
  const [amount, setAmount] = useState<number>(1);
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");

  const { data: ratesData, isLoading } = useGetCurrencyRates({ base: from }, { query: { enabled: !!from } });

  const convertedAmount = useMemo(() => {
    if (!ratesData || !ratesData.rates[to]) return 0;
    return amount * ratesData.rates[to];
  }, [amount, to, ratesData]);

  const handleSwap = () => {
    setFrom(to);
    setTo(from);
  };

  return (
    <Layout>
      <SeoHead title="Currency Converter" description="Live currency converter with full country names. Convert USD, EUR, PKR, INR and 50+ currencies." />
      
      <div className="w-full max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold mb-4">Currency Converter</h1>
          <p className="text-muted-foreground">Real-time exchange rates for over 50 global currencies.</p>
        </div>

        <Card className="p-6 md:p-10 shadow-2xl border-primary/10">
          <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 items-end">
            
            <div className="space-y-3">
              <Label>Amount</Label>
              <Input 
                type="number" 
                min="0"
                value={amount || ''} 
                onChange={(e) => setAmount(Number(e.target.value))}
                className="text-lg font-bold"
              />
              <Label className="mt-4 block">From Currency</Label>
              <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </Select>
            </div>

            <div className="flex justify-center pb-2 md:pb-3">
              <Button variant="outline" size="icon" onClick={handleSwap} className="rounded-full shadow-md hover:border-primary">
                <ArrowRightLeft className="w-5 h-5 text-primary" />
              </Button>
            </div>

            <div className="space-y-3">
              <Label>Converted Amount</Label>
              <div className="h-12 w-full rounded-xl border-2 border-transparent bg-muted/50 px-4 py-2 text-lg font-bold flex items-center">
                {isLoading ? "Converting..." : convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 4 })}
              </div>
              <Label className="mt-4 block">To Currency</Label>
              <Select value={to} onChange={(e) => setTo(e.target.value)}>
                {CURRENCIES.map(c => (
                  <option key={c.code} value={c.code}>{c.name}</option>
                ))}
              </Select>
            </div>

          </div>

          {!isLoading && ratesData && (
            <div className="mt-10 p-6 bg-muted/30 rounded-2xl text-center border border-border/50">
              <p className="text-sm text-muted-foreground mb-2">Current Exchange Rate</p>
              <p className="text-2xl font-bold">
                1 {from} = {ratesData.rates[to]?.toFixed(4)} {to}
              </p>
            </div>
          )}
        </Card>

        <div className="ad-banner mt-12">
          [ Ad Placeholder ]
        </div>
      </div>
    </Layout>
  );
}
