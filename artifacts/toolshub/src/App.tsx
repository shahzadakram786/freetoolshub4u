import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";

// Page Imports
import { Home } from "@/pages/home";
import { Weather } from "@/pages/weather";
import { CurrencyConverter } from "@/pages/currency";
import { UrlShortener } from "@/pages/url-shortener";
import { AiDetector } from "@/pages/ai-detector";
import { YoutubeThumbnail } from "@/pages/youtube-thumbnail";
import { PasswordGenerator } from "@/pages/password-generator";
import { WordCounter } from "@/pages/word-counter";
import { QrGenerator } from "@/pages/qr-generator";
import { SocialDownloader } from "@/pages/social-downloader";
import { ImageToText } from "@/pages/image-to-text";
import { 
  CaseConverter, Base64Encoder, JsonFormatter, BmiCalculator, 
  AgeCalculator, PlagiarismChecker, Paraphraser 
} from "@/pages/generic-tools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/weather" component={Weather} />
      <Route path="/currency-converter" component={CurrencyConverter} />
      <Route path="/url-shortener" component={UrlShortener} />
      <Route path="/ai-detector" component={AiDetector} />
      <Route path="/youtube-thumbnail-downloader" component={YoutubeThumbnail} />
      <Route path="/password-generator" component={PasswordGenerator} />
      <Route path="/word-counter" component={WordCounter} />
      <Route path="/qr-code-generator" component={QrGenerator} />
      
      {/* Reused generic pages with props/components */}
      <Route path="/instagram-video-downloader">
        {() => <SocialDownloader platform="instagram" />}
      </Route>
      <Route path="/facebook-video-downloader">
        {() => <SocialDownloader platform="facebook" />}
      </Route>
      <Route path="/image-to-text" component={ImageToText} />

      {/* Misc Tools */}
      <Route path="/case-converter" component={CaseConverter} />
      <Route path="/base64" component={Base64Encoder} />
      <Route path="/json-formatter" component={JsonFormatter} />
      <Route path="/bmi-calculator" component={BmiCalculator} />
      <Route path="/age-calculator" component={AgeCalculator} />
      <Route path="/plagiarism-checker" component={PlagiarismChecker} />
      <Route path="/plagiarism-remover" component={Paraphraser} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
