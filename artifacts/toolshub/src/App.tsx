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
import { BgRemover } from "@/pages/bg-remover";
import { ObjectEraser } from "@/pages/object-eraser";
import { BlogIndex } from "@/pages/blog/index";
import { BlogPost } from "@/pages/blog/post";
import {
  CaseConverter, Base64Encoder, JsonFormatter, BmiCalculator,
  AgeCalculator, PlagiarismChecker, Paraphraser
} from "@/pages/generic-tools";
import { PrivacyPolicy, TermsOfService, AboutPage, ContactPage } from "@/pages/legal";
import { WellnessPage } from "@/pages/wellness";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      {/* Data Tools */}
      <Route path="/weather" component={Weather} />
      <Route path="/currency-converter" component={CurrencyConverter} />

      {/* Image Tools */}
      <Route path="/bg-remover" component={BgRemover} />
      <Route path="/object-eraser" component={ObjectEraser} />
      <Route path="/image-to-text" component={ImageToText} />
      <Route path="/youtube-thumbnail-downloader" component={YoutubeThumbnail} />

      {/* Text & AI Tools */}
      <Route path="/url-shortener" component={UrlShortener} />
      <Route path="/ai-detector" component={AiDetector} />
      <Route path="/plagiarism-checker" component={PlagiarismChecker} />
      <Route path="/plagiarism-remover" component={Paraphraser} />
      <Route path="/word-counter" component={WordCounter} />

      {/* Generators */}
      <Route path="/password-generator" component={PasswordGenerator} />
      <Route path="/qr-code-generator" component={QrGenerator} />

      {/* Social Downloaders */}
      <Route path="/instagram-video-downloader">
        {() => <SocialDownloader platform="instagram" />}
      </Route>
      <Route path="/facebook-video-downloader">
        {() => <SocialDownloader platform="facebook" />}
      </Route>

      {/* Misc / Converter Tools */}
      <Route path="/case-converter" component={CaseConverter} />
      <Route path="/base64" component={Base64Encoder} />
      <Route path="/json-formatter" component={JsonFormatter} />
      <Route path="/bmi-calculator" component={BmiCalculator} />
      <Route path="/age-calculator" component={AgeCalculator} />

      {/* Blog */}
      <Route path="/blog" component={BlogIndex} />
      <Route path="/blog/:slug">
        {(params) => <BlogPost slug={params.slug} />}
      </Route>

      {/* Legal & Company */}
      <Route path="/privacy-policy" component={PrivacyPolicy} />
      <Route path="/terms-of-service" component={TermsOfService} />
      <Route path="/about" component={AboutPage} />
      <Route path="/contact" component={ContactPage} />
      <Route path="/wellness" component={WellnessPage} />

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
