"use client";

import { SeoHead } from "@/components/seo-head";
import { motion } from "framer-motion";
import { Heart, Sparkles, Phone, Star, ArrowRight, Shield, Leaf } from "lucide-react";

const SCRIPT = [
  {
    heading: "Radical Acceptance",
    text: `Radical acceptance isn't about giving up — it's about finding peace with what is, exactly as it is right now. When we stop fighting reality and instead learn to embrace it with compassion, something remarkable happens: the suffering that comes from resistance begins to dissolve.`,
  },
  {
    heading: "You Are Enough, Exactly As You Are",
    text: `So many of us have been taught to measure our worth by productivity, perfection, or the approval of others. But true wellness begins the moment we stop needing to be different to deserve love — including love from ourselves. You are worthy not because of what you do, but because of who you are.`,
  },
  {
    heading: "Healing Is Not Linear",
    text: `Some days will feel like breakthroughs. Others will feel like you've gone backwards. Both are part of the journey. Healing doesn't happen in a straight line — it spirals, it circles back, it surprises you. Every step you take, even the smallest ones, moves you forward.`,
  },
  {
    heading: "Your Body Knows the Way",
    text: `When we learn to listen to our bodies — to honor the signals they send, to treat them with gentleness instead of criticism — we reconnect with an inner wisdom that has always been there, waiting for us to return home. Wellness is not a destination. It is a way of walking through life.`,
  },
  {
    heading: "You Deserve Support",
    text: `Asking for help is not weakness. It is one of the most courageous things a human being can do. In a world that glorifies pushing through, choosing to reach out — to say "I need support" — is an act of radical self-love. You do not have to carry this alone.`,
  },
];

const PILLARS = [
  { icon: Heart, label: "Emotional Wellness", desc: "Process difficult emotions with compassion and build lasting inner peace." },
  { icon: Leaf, label: "Mind-Body Integration", desc: "Reconnect with your body's wisdom through somatic and holistic practices." },
  { icon: Shield, label: "Radical Self-Acceptance", desc: "Release self-judgment and cultivate the love you have always deserved." },
  { icon: Star, label: "Personal Transformation", desc: "Move beyond survival mode into a life of genuine meaning and vitality." },
];

export function WellnessPage() {
  return (
      <>
      <SeoHead
        title="Dynamics Total Wellness — Private Consultations with Darlene Nicks"
        description="Discover radical acceptance and total wellness through private consultations. Healing, mind-body integration, and personal transformation with Darlene Nicks."
        keywords="wellness consultation, radical acceptance, emotional wellness, Dynamics Total Wellness, Darlene Nicks, holistic healing"
        canonicalPath="/wellness"
      />

      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50 via-purple-50 to-indigo-100 dark:from-rose-950/30 dark:via-purple-950/30 dark:to-indigo-950/40" />
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-300/40 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-300/40 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            <div className="inline-flex items-center gap-2 bg-rose-100/80 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-sm font-semibold px-4 py-2 rounded-full border border-rose-200/60 dark:border-rose-700/40 mb-8 backdrop-blur-sm">
              <Sparkles className="w-4 h-4" /> Dynamics Total Wellness
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-foreground leading-tight">
              Find Peace<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500">
                With What Is.
              </span>
            </h1>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              A safe, compassionate space for radical acceptance, emotional healing, and total wellness — guided by <strong>Darlene Nicks</strong>.
            </p>

            {/* CTA Button */}
            <motion.a
              href="tel:+1-800-WELLNESS"
              whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(168,85,247,0.35)" }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-rose-500 via-purple-500 to-indigo-500 text-white text-lg font-bold px-10 py-5 rounded-2xl shadow-2xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow cursor-pointer"
            >
              <Phone className="w-5 h-5" />
              Click here to schedule your private consultation
              <ArrowRight className="w-5 h-5" />
            </motion.a>

            <p className="text-sm text-muted-foreground mt-5">
              Confidential · Compassionate · Transformative
            </p>
          </motion.div>
        </div>
      </section>

      {/* Script / Message Section */}
      <section className="w-full py-24 bg-card border-y border-border">
        <div className="max-w-3xl mx-auto px-6">
          <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Heart className="w-10 h-10 text-rose-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-3">A Message From Darlene</h2>
            <p className="text-muted-foreground">On radical acceptance, healing, and coming home to yourself.</p>
          </motion.div>

          <div className="space-y-12">
            {SCRIPT.map((section, i) => (
              <motion.div key={section.heading}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative">
                <div className="flex gap-5">
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center text-white font-bold text-xs shadow-lg">
                      {i + 1}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-3 text-foreground">{section.heading}</h3>
                    <p className="text-muted-foreground leading-loose text-lg italic">
                      "{section.text}"
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div className="mt-16 p-8 rounded-3xl bg-gradient-to-br from-rose-50 to-purple-50 dark:from-rose-950/20 dark:to-purple-950/20 border border-rose-100 dark:border-rose-900/30 text-center"
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-2xl font-bold mb-2">— Darlene Nicks</p>
            <p className="text-muted-foreground text-sm">Certified Wellness Coach · Founder, Dynamics Total Wellness</p>
          </motion.div>
        </div>
      </section>

      {/* Pillars */}
      <section className="w-full py-24 bg-background">
        <div className="max-w-5xl mx-auto px-6">
          <motion.div className="text-center mb-14" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl font-bold mb-3">The Four Pillars of Total Wellness</h2>
            <p className="text-muted-foreground text-lg">A holistic approach to healing your whole self.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {PILLARS.map((pillar, i) => (
              <motion.div key={pillar.label}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="flex gap-5 p-7 rounded-3xl border border-border bg-card hover:border-rose-200/60 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-100 to-purple-100 dark:from-rose-900/30 dark:to-purple-900/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                  <pillar.icon className="w-6 h-6 text-rose-500" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">{pillar.label}</h3>
                  <p className="text-muted-foreground">{pillar.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="w-full py-24 bg-gradient-to-br from-rose-500 via-purple-600 to-indigo-600">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-white/70 text-sm font-semibold tracking-widest uppercase mb-4">Take the First Step</p>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              You deserve support.<br />You deserve healing.
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-xl mx-auto">
              Book your private, confidential consultation with Darlene Nicks and begin your journey toward total wellness.
            </p>
            <motion.a
              href="tel:+1-800-WELLNESS"
              whileHover={{ scale: 1.05, boxShadow: "0 25px 60px rgba(0,0,0,0.3)" }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-3 bg-white text-purple-700 font-bold text-lg px-10 py-5 rounded-2xl shadow-2xl hover:shadow-3xl transition-all">
              <Phone className="w-5 h-5" />
              Schedule Your Private Consultation
              <ArrowRight className="w-5 h-5" />
            </motion.a>
            <p className="text-white/50 text-xs mt-5">All sessions are 100% confidential. First session consultation available.</p>
          </motion.div>
        </div>
      </section>
      </>
  );
}
