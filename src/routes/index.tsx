import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import {
  ShieldCheck,
  FileText,
  Truck,
  CheckCircle2,
  Globe,
  Headphones,
  MessageCircle,
  Instagram,
  Smartphone,
  Lock,
  Sparkles,
  ClipboardCheck,
} from "lucide-react";
import iphoneHero from "@/assets/iphone-hero.jpg";
import iphone17ProMaxBlue from "@/assets/iphone-17-pro-max-blue.jpg";
import iphone17 from "@/assets/iphone-17.jpg";
import macbook from "@/assets/macbook.jpg";
import ipad from "@/assets/ipad.jpg";
import appleWatch from "@/assets/apple-watch.png";
import logoNewbox from "@/assets/logo-newbox.jpg";
import { AiChatWidget } from "@/components/ai-chat";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "NEWBOX — Apple Premium Store | iPhone, MacBook, iPad e Apple Watch" },
      {
        name: "description",
        content:
          "Especialistas Apple: iPhone, MacBook, iPad e Apple Watch lacrados e seminovos com 1 ano de garantia, nota fiscal e envio para todo o Brasil.",
      },
    ],
  }),
});

const WHATSAPP = "https://wa.me/5515996860369";
const INSTAGRAM = "https://www.instagram.com/newboxphones/";

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <Hero />
      <Showcase />
      <Benefits />
      <Trust />
      <CTA />
      <Footer />
      <AiChatWidget />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <img
            src={logoNewbox}
            alt="NEWBOX PHONES"
            className="h-8 md:h-10 w-auto rounded-md"
          />
        </a>
        <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
          <a href="#beneficios" className="hover:text-foreground transition">Benefícios</a>
          <a href="#confianca" className="hover:text-foreground transition">Confiança</a>
          <a href="#contato" className="hover:text-foreground transition">Contato</a>
        </nav>
        <a
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold hover:opacity-90 transition"
        >
          <MessageCircle className="w-4 h-4" /> Comprar
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "var(--gradient-hero)" }}
      />
      <div className="relative max-w-7xl mx-auto px-6 py-20 md:py-28 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted-foreground">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> Loja premium especializada Apple
          </span>
          <h1 className="mt-6 text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Especialistas Apple:{" "}
            <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              iPhone, MacBook, iPad e Apple Watch
            </span>{" "}
            com Garantia e Nota Fiscal
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            A NEWBOX é sua Apple Premium Store: produtos lacrados e seminovos com procedência,
            segurança e envio para todo o Brasil 🇧🇷
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Envio rápido <span className="text-primary">•</span> Seguro{" "}
            <span className="text-primary">•</span> Garantido
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Chip icon={<Truck className="w-3.5 h-3.5" />} label="Frete Nacional" />
            <Chip icon={<Lock className="w-3.5 h-3.5" />} label="Compra Segura" />
            <Chip icon={<FileText className="w-3.5 h-3.5" />} label="Nota Fiscal" />
            <Chip icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Garantia 12 Meses" />
            <Chip icon={<ClipboardCheck className="w-3.5 h-3.5" />} label="Compra Segura com contrato de recebimento" />
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
            >
              <Smartphone className="w-4 h-4" /> Comprar Agora
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Oficial
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
            >
              <Instagram className="w-4 h-4" /> Instagram
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-primary/20 to-transparent blur-3xl" />
          <img
            src={iphoneHero}
            alt="iPhone premium NEWBOX PHONES"
            className="relative rounded-[2rem] w-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function Chip({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs text-foreground">
      <span className="text-primary">{icon}</span>
      {label}
    </span>
  );
}

const benefits = [
  { icon: ShieldCheck, title: "1 Ano de Garantia", desc: "Cobertura completa por 12 meses em todos os aparelhos." },
  { icon: FileText, title: "Nota Fiscal", desc: "Compra documentada com total transparência." },
  { icon: Truck, title: "Envio para Todo Brasil", desc: "Logística rápida e segura de norte a sul." },
  { icon: CheckCircle2, title: "Revisados e Certificados", desc: "Cada aparelho passa por checagem técnica rigorosa." },
  { icon: Globe, title: "Loja 100% Online", desc: "Compre de onde estiver, com toda a comodidade." },
  { icon: Headphones, title: "Atendimento Especializado", desc: "Especialistas Apple prontos para te ajudar." },
  { icon: ClipboardCheck, title: "Compra Segura com contrato de recebimento", desc: "Contrato formalizado para sua total segurança e confiança na entrega." },
];

function Benefits() {
  return (
    <section id="beneficios" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-sm text-primary font-medium">Por que NEWBOX</p>
        <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight max-w-2xl">
          A experiência Apple com{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            segurança e confiança
          </span>
        </h2>
        <div className="mt-12 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="group rounded-2xl border border-border bg-card p-6 hover:border-primary/40 transition"
            >
              <div className="w-11 h-11 rounded-xl bg-primary/10 grid place-items-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition">
                <b.icon className="w-5 h-5" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{b.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Trust() {
  const items = [
    "Produtos Apple originais com procedência verificada",
    "Lacrados ou seminovos premium com bateria saudável",
    "Embalagem segura e rastreio em tempo real",
    "Suporte pós-venda durante toda a garantia",
  ];
  return (
    <section id="confianca" className="py-24 border-t border-border">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-sm text-primary font-medium">Procedência</p>
          <h2 className="mt-2 text-4xl md:text-5xl font-bold tracking-tight">
            Seu próximo produto Apple premium está aqui.
          </h2>
          <p className="mt-5 text-muted-foreground text-lg">
            Apple Premium com garantia, procedência e envio nacional. Cada detalhe pensado para
            você comprar com confiança total.
          </p>
          <ul className="mt-8 space-y-3">
            {items.map((i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                <span className="text-sm">{i}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="relative aspect-square rounded-3xl border border-border overflow-hidden bg-card">
          <div
            className="absolute inset-0"
            style={{ background: "var(--gradient-hero)" }}
          />
          <img
            src={iphone17ProMaxBlue}
            alt="iPhone 17 Pro Max Azul - procedência NEWBOX PHONES"
            width={1024}
            height={1024}
            loading="lazy"
            className="relative w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section id="contato" className="py-24 border-t border-border">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
          Pronto para o seu novo{" "}
          <span className="bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            iPhone?
          </span>
        </h2>
        <p className="mt-5 text-muted-foreground text-lg">
          Fale agora com um especialista NEWBOX e receba uma cotação personalizada.
        </p>
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-6 py-3 text-sm font-semibold hover:opacity-90 transition shadow-[var(--shadow-glow)]"
          >
            <Smartphone className="w-4 h-4" /> Comprar Agora
          </a>
          <a
            href={WHATSAPP}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
          >
            <MessageCircle className="w-4 h-4" /> WhatsApp Oficial
          </a>
          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-6 py-3 text-sm font-semibold hover:bg-secondary transition"
          >
            <Instagram className="w-4 h-4" /> Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <img src={logoNewbox} alt="NEWBOX PHONES" className="h-6 md:h-8 w-auto rounded" />
        <p>© {new Date().getFullYear()} NEWBOX PHONES. Todos os direitos reservados.</p>
        <div className="flex gap-5">
          <a href={WHATSAPP} target="_blank" rel="noreferrer" className="hover:text-foreground">WhatsApp</a>
          <a href={INSTAGRAM} target="_blank" rel="noreferrer" className="hover:text-foreground">Instagram</a>
        </div>
      </div>
    </footer>
  );
}
