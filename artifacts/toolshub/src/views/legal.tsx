"use client";

import { SeoHead } from "@/components/seo-head";
import Link from "next/link";
import { Shield, FileText, Mail, Info, ExternalLink } from "lucide-react";

export function PrivacyPolicy() {
  return (
      <>
      <SeoHead
        title="Privacy Policy | ToolsHub"
        description="ToolsHub Privacy Policy — how we handle your data, what we collect, and your rights."
      />
      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Privacy Policy</h1>
            <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
          </div>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Overview</h2>
            <p className="text-muted-foreground leading-relaxed">
              ToolsHub ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you visit our website at freetoolshub4u.com (the "Service"). By using our Service, you agree to this policy.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. Information We Collect</h2>
            <div className="space-y-3 text-muted-foreground">
              <p><strong className="text-foreground">Usage Data:</strong> We may collect non-personally identifiable information such as browser type, pages visited, time spent, and referring URLs for analytics purposes.</p>
              <p><strong className="text-foreground">Uploaded Content:</strong> When you use image tools (Background Remover, Object Eraser), your images are sent to third-party AI APIs for processing. <strong className="text-foreground">We do not permanently store your uploaded images on our servers.</strong></p>
              <p><strong className="text-foreground">Cookies:</strong> We use minimal cookies to remember your theme preference (dark/light mode). We do not use tracking cookies.</p>
              <p><strong className="text-foreground">Location Data:</strong> The Weather tool may request your device's GPS coordinates. This data is used only to fetch your local weather and is never stored or shared.</p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To provide and improve our tools and services</li>
              <li>To process image requests via third-party APIs (Remove.bg, Replicate)</li>
              <li>To fetch live weather data via OpenWeatherMap API</li>
              <li>To display relevant advertisements via Google AdSense</li>
              <li>To analyze usage patterns and improve user experience</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Third-Party Services</h2>
            <p className="text-muted-foreground mb-3">We integrate with the following third-party services:</p>
            <div className="grid md:grid-cols-2 gap-3">
              {[
                { name: "Google AdSense", purpose: "Display advertisements", url: "https://policies.google.com/privacy" },
                { name: "OpenWeatherMap", purpose: "Real-time weather data", url: "https://openweathermap.org/privacy-policy" },
                { name: "Remove.bg", purpose: "AI background removal", url: "https://www.remove.bg/privacy" },
                { name: "Replicate", purpose: "AI image inpainting", url: "https://replicate.com/privacy" },
                { name: "Frankfurter / ECB", purpose: "Live currency exchange rates", url: "https://www.ecb.europa.eu/privacy" },
              ].map((s) => (
                <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                  className="flex items-start gap-2 p-3 rounded-xl border border-border hover:border-primary/40 transition-colors group">
                  <ExternalLink className="w-4 h-4 mt-0.5 text-muted-foreground group-hover:text-primary shrink-0" />
                  <div>
                    <p className="font-medium text-sm">{s.name}</p>
                    <p className="text-xs text-muted-foreground">{s.purpose}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">5. Data Retention</h2>
            <p className="text-muted-foreground">
              We do not store personal data. Uploaded images are processed in real-time and discarded immediately after processing. Usage analytics data is anonymized and aggregated.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">6. Your Rights (GDPR / CCPA)</h2>
            <p className="text-muted-foreground mb-2">Depending on your location, you may have the right to:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Access the personal data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of non-essential data collection</li>
              <li>Lodge a complaint with your local data protection authority</li>
            </ul>
            <p className="text-muted-foreground mt-2">To exercise these rights, contact us at <a href="mailto:privacy@toolshub.app" className="text-primary hover:underline">privacy@toolshub.app</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">7. Changes to This Policy</h2>
            <p className="text-muted-foreground">
              We may update this Privacy Policy from time to time. We will notify you of significant changes by updating the date at the top of this page. Your continued use of ToolsHub after changes constitutes acceptance of the updated policy.
            </p>
          </section>
        </div>
      </div>
      </>
  );
}

export function TermsOfService() {
  return (
      <>
      <SeoHead
        title="Terms of Service | ToolsHub"
        description="ToolsHub Terms of Service — rules, acceptable use, and your agreement with us."
      />
      <div className="w-full max-w-4xl mx-auto px-4 py-16">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/30 flex items-center justify-center">
            <FileText className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Terms of Service</h1>
            <p className="text-muted-foreground text-sm">Last updated: March 2026</p>
          </div>
        </div>

        <div className="space-y-8">
          {[
            {
              title: "1. Acceptance of Terms",
              content: "By accessing or using ToolsHub, you agree to be bound by these Terms of Service. If you do not agree, please do not use our services."
            },
            {
              title: "2. Use of Service",
              content: "ToolsHub provides free online tools for personal and commercial use. You agree not to misuse the service, attempt to bypass rate limits, use automated bots to overload our servers, or use tools to process illegal content."
            },
            {
              title: "3. Intellectual Property",
              content: "All content on ToolsHub (logos, blog posts, tool interfaces) is owned by ToolsHub or its licensors. You may not reproduce or redistribute our content without permission. Content you upload or create using our tools remains your property."
            },
            {
              title: "4. Disclaimer of Warranties",
              content: "ToolsHub is provided 'as is' without warranties of any kind. We do not guarantee 100% uptime, accuracy of all data (exchange rates, weather), or fitness for any particular purpose. Use at your own risk."
            },
            {
              title: "5. Limitation of Liability",
              content: "ToolsHub shall not be liable for any indirect, incidental, or consequential damages arising from your use of the service, including data loss, business interruption, or financial losses."
            },
            {
              title: "6. Third-Party Services",
              content: "Our tools connect to third-party APIs. We are not responsible for the availability, accuracy, or privacy practices of these services. Their terms and privacy policies apply to data they process."
            },
            {
              title: "7. Prohibited Use",
              content: "You may not use ToolsHub to process illegal images (CSAM, non-consensual intimate images), infringe copyrights, harass others, or conduct activities that violate applicable laws."
            },
            {
              title: "8. Advertising",
              content: "ToolsHub displays advertisements via Google AdSense to support our free service. These ads are served by Google and governed by their advertising policies."
            },
            {
              title: "9. Changes to Terms",
              content: "We reserve the right to modify these terms at any time. Continued use of ToolsHub after changes constitutes acceptance of the modified terms."
            },
            {
              title: "10. Contact",
              content: "For any questions regarding these Terms, contact us at legal@toolshub.app."
            },
          ].map((section) => (
            <section key={section.title}>
              <h2 className="text-xl font-bold mb-2">{section.title}</h2>
              <p className="text-muted-foreground leading-relaxed">{section.content}</p>
            </section>
          ))}
        </div>
      </div>
      </>
  );
}

export function AboutPage() {
  return (
      <>
      <SeoHead
        title="About ToolsHub — Free Online Tools for Everyone"
        description="Learn about ToolsHub, our mission to provide free, fast, and private online tools for everyone."
      />
      <div className="w-full max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="w-20 h-20 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Info className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">About ToolsHub</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We believe everyone deserves access to powerful tools without paywalls, signups, or tracking.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            { num: "20+", label: "Free Tools", desc: "From AI image editing to live currency conversion" },
            { num: "100%", label: "Free Forever", desc: "No subscriptions, no hidden fees, ever" },
            { num: "0", label: "Signups Required", desc: "Just open, use, and go" },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-8 rounded-2xl bg-card border border-border">
              <p className="text-5xl font-bold text-primary mb-2">{stat.num}</p>
              <p className="font-bold text-lg mb-1">{stat.label}</p>
              <p className="text-muted-foreground text-sm">{stat.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              ToolsHub was built out of frustration with tool sites that bombard you with ads, require sign-ups for basic features, or charge monthly fees for things that should be free.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our goal is simple: provide every tool you might need online — from AI-powered image editing to real-time currency conversion — completely free, with no signup required and your privacy protected.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">What We Offer</h2>
            <ul className="space-y-3">
              {[
                "AI Background Remover & Object Eraser",
                "Live weather with GPS detection",
                "Real-time currency converter (60+ currencies)",
                "Plagiarism checker & article rewriter",
                "AI content detector",
                "YouTube & social media tools",
                "Developer utilities (JSON, Base64, QR codes)",
                "Blog with guides & tutorials",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-muted-foreground text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="p-8 rounded-2xl bg-primary/5 border border-primary/20 text-center">
          <h2 className="text-xl font-bold mb-2">Have a suggestion?</h2>
          <p className="text-muted-foreground mb-4">We're always adding new tools. Let us know what you'd like to see next.</p>
          <Link href="/contact" className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-xl font-medium hover:bg-primary/90 transition-colors">
            <Mail className="w-4 h-4" /> Contact Us
          </Link>
        </div>
      </div>
      </>
  );
}

export function ContactPage() {
  return (
      <>
      <SeoHead
        title="Contact ToolsHub — Get in Touch"
        description="Contact the ToolsHub team for support, tool suggestions, advertising inquiries, or partnership opportunities."
      />
      <div className="w-full max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-950/30 flex items-center justify-center mx-auto mb-4">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>
          <h1 className="text-4xl font-bold mb-3">Contact Us</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Have a question, tool suggestion, or business inquiry? We'd love to hear from you.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { icon: "💬", title: "General Support", email: "hello@toolshub.app", desc: "Questions about any tool" },
            { icon: "📢", title: "Advertising", email: "ads@toolshub.app", desc: "Ad placements & sponsorships" },
            { icon: "🔒", title: "Privacy / Legal", email: "privacy@toolshub.app", desc: "DMCA, GDPR, data requests" },
          ].map((c) => (
            <div key={c.title} className="p-6 rounded-2xl border border-border bg-card text-center hover:border-primary/40 transition-colors">
              <span className="text-3xl mb-3 block">{c.icon}</span>
              <h3 className="font-bold mb-1">{c.title}</h3>
              <a href={`mailto:${c.email}`} className="text-primary text-sm hover:underline block mb-1">{c.email}</a>
              <p className="text-xs text-muted-foreground">{c.desc}</p>
            </div>
          ))}
        </div>

        <div className="p-8 rounded-2xl bg-card border border-border">
          <h2 className="text-xl font-bold mb-6">Send a Message</h2>
          <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); alert("Thanks for your message! We'll reply within 48 hours."); }}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium block mb-1.5">Your Name</label>
                <input type="text" required placeholder="John Doe" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all" />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1.5">Email Address</label>
                <input type="email" required placeholder="john@example.com" className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Subject</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm transition-all">
                <option>General Question</option>
                <option>Tool Suggestion</option>
                <option>Bug Report</option>
                <option>Advertising / Partnership</option>
                <option>Privacy / DMCA</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Message</label>
              <textarea required rows={5} placeholder="Tell us how we can help..." className="w-full px-4 py-2.5 rounded-xl border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-all resize-none" />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold hover:bg-primary/90 transition-colors">
              Send Message
            </button>
          </form>
        </div>
      </div>
      </>
  );
}
