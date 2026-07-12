import { createFileRoute } from "@tanstack/react-router";
import { Mail, Phone, MapPin, Clock, MessageCircle, Instagram, Twitter, Facebook } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({ meta: [
    { title: "Contact EtiSkin — Get In Touch" },
    { name: "description", content: "Reach the EtiSkin team for support, partnerships, or dermatologist consultation. We reply within 24 hours." },
    { property: "og:title", content: "Contact EtiSkin" },
  ]}),
});

const channels = [
  { icon: Mail, title: "Email us", value: "hello@etiskin.ng", sub: "We reply within 24 hours", href: "mailto:hello@etiskin.ng" },
  { icon: Phone, title: "Call us", value: "+234 800 384 7546", sub: "Mon–Sat, 9am – 7pm WAT", href: "tel:+2348003847546" },
  { icon: MessageCircle, title: "WhatsApp", value: "Chat with our team", sub: "Fast replies during business hours", href: "https://wa.me/2348003847546" },
  { icon: MapPin, title: "Visit us", value: "12 Ademola Adetokunbo Cres.", sub: "Victoria Island, Lagos", href: "#" },
];

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      {/* Compact hero */}
      <section className="bg-gradient-hero text-white py-14 md:py-16">
        <div className="mx-auto max-w-4xl px-4 md:px-8 text-center">
          <div className="eyebrow text-gold mb-2">Get In Touch</div>
          <h1 className="text-3xl md:text-5xl font-serif font-semibold">We'd Love to Hear from You</h1>
          <p className="mt-3 opacity-80 max-w-xl mx-auto text-sm md:text-base">
            Questions about a product? Need skincare advice? Our team is ready to help.
          </p>
        </div>
      </section>

      {/* Channel cards */}
      <section className="mx-auto max-w-6xl px-4 md:px-8 -mt-8 md:-mt-10 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {channels.map(({ icon: Icon, title, value, sub, href }) => (
            <a key={title} href={href} className="group bg-card border border-border rounded-xl p-4 md:p-5 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all">
              <div className="h-10 w-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-3 group-hover:bg-primary group-hover:text-primary-foreground transition">
                <Icon className="h-5 w-5" />
              </div>
              <div className="text-xs uppercase tracking-wider text-muted-foreground">{title}</div>
              <div className="font-serif font-semibold text-sm md:text-base leading-tight mt-1 line-clamp-1">{value}</div>
              <div className="text-xs text-muted-foreground mt-1">{sub}</div>
            </a>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 md:px-8 py-14 grid lg:grid-cols-[1fr_1.3fr] gap-10">
        {/* Left column */}
        <div>
          <div className="eyebrow mb-2">Our Studio</div>
          <h2 className="font-serif text-2xl md:text-3xl font-semibold">Come say hello</h2>
          <p className="text-muted-foreground text-sm mt-3 leading-relaxed">
            Prefer face-to-face? Book a free 15-minute skin consultation at our Lagos studio. Walk-ins are welcome, but appointments get priority.
          </p>

          <div className="mt-5 rounded-xl overflow-hidden border border-border shadow-soft aspect-[4/3]">
            <iframe
              title="EtiSkin location"
              className="w-full h-full"
              loading="lazy"
              src="https://www.openstreetmap.org/export/embed.html?bbox=3.4145%2C6.4265%2C3.4265%2C6.4365&layer=mapnik&marker=6.4315%2C3.4205"
            />
          </div>

          <div className="mt-5 flex items-center gap-3 text-sm">
            <Clock className="h-4 w-4 text-primary" />
            <span className="text-muted-foreground">Mon–Sat · 9:00am – 7:00pm WAT</span>
          </div>

          <div className="mt-6">
            <div className="text-xs font-semibold uppercase tracking-wider mb-2">Follow us</div>
            <div className="flex gap-2">
              {[Instagram, Twitter, Facebook].map((I, i) => (
                <a key={i} href="#" className="h-10 w-10 rounded-full border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition">
                  <I className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => { e.preventDefault(); setSent(true); toast.success("Message sent — we'll reply within 24 hours."); (e.currentTarget as HTMLFormElement).reset(); }}
          className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-soft"
        >
          <h2 className="text-xl md:text-2xl font-serif font-semibold">Send us a message</h2>
          <p className="text-sm text-muted-foreground mt-1">All fields required. We respond within one business day.</p>

          <div className="mt-6 grid sm:grid-cols-2 gap-4">
            <Field label="First name" name="first" />
            <Field label="Last name" name="last" />
            <Field label="Email" name="email" type="email" className="sm:col-span-2" />

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider">I'm reaching out about</label>
              <select required className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary">
                <option value="">Choose a topic…</option>
                <option>Product question</option>
                <option>Order support</option>
                <option>Dermatologist consultation</option>
                <option>Partnership / Wholesale</option>
                <option>Something else</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="text-xs font-semibold uppercase tracking-wider">Message</label>
              <textarea name="message" required rows={5} placeholder="Tell us what's on your mind…"
                className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary resize-none" />
            </div>
          </div>

          <button disabled={sent} className="mt-6 w-full bg-primary text-primary-foreground font-semibold py-3 rounded-md hover:bg-primary/90 transition disabled:opacity-60">
            {sent ? "Message Sent ✓" : "Send Message"}
          </button>
        </form>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", className = "" }: { label: string; name: string; type?: string; className?: string }) {
  return (
    <div className={className}>
      <label className="text-xs font-semibold uppercase tracking-wider">{label}</label>
      <input type={type} name={name} required
        className="mt-1 w-full px-3 py-2.5 rounded-md bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary" />
    </div>
  );
}
