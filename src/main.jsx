import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileText,
  Link2,
  MapPin,
  PlayCircle,
  Scale,
  Search,
  Sparkles,
  Youtube
} from "lucide-react";
import { GOOGLE_SHEETS_CSV_URL, LOCAL_REPOSITORY_CSV } from "./config";
import "./styles.css";

const classes = [
  {
    name: "Laura Conti",
    url: "https://youtu.be/hBxLRN0W3fE?si=lIRz1ioliDT6hL-Q"
  },
  {
    name: "Francisco Morell Otamendi",
    url: "https://youtu.be/WeBCjswfYkc?si=8AmvtaqPwO6ClnzM"
  },
  {
    name: "Gabriel Hernán Quadri",
    url: "https://youtu.be/4xQPbQTtLRA?si=lQFL3dZy3dKg72DB"
  }
];

const fallbackRepositories = [
  {
    titulo: "Analizador de Fallos",
    detalle: "Analiza sentencias judiciales y genera resumen de hechos, fundamentos jurídicos y cuestiones relevantes.",
    tipo: "Aplicacion",
    link: "https://chatgpt.com/g/g-6942d7970c3c8191a754f16b051ecc80-analizador-de-fallos-amfm",
    responsable: "Laboratorio IA - Asociación de Magistrados y Funcionarios de Morón"
  }
];

const talks = [
  {
    speaker: "Sergio Torres",
    title: "Derecho y tecnología: las tensiones que desafían al poder judicial",
    links: [{ label: "Link", url: "https://www.scba.gov.ar/institucional/nota.asp?id=59247&veradjuntos=no" }]
  },
  {
    speaker: "Gustavo Perez Villar",
    title: "Agenda de innovación de la Suprema Corte",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/1lhwmvT-QI9pD3bpQlgO2jNJQFb-srJXB/edit?usp=drive_link&ouid=103949310233042808469&rtpof=true&sd=true" }]
  },
  {
    speaker: "Nestor Antonio Trabucco",
    title: "Búsqueda de la eficiencia en la gestión de los procesos judiciales: trazabilidad y métricas",
    links: [
      { label: "Presentación Trabucco", url: "https://drive.google.com/file/d/1ahzeOAYX9OH6tjofoJOGRdT_2zNVeaZx/view?usp=sharing" },
      { label: "Presentación Gabriel Gil", soon: true }
    ]
  },
  {
    speaker: "Federico Alvarez Larrondo",
    title: "Cavilaciones sobre el futuro de la Justicia a partir de la IA generativa Agentica",
    links: [{ label: "Presentación", soon: true }]
  },
  {
    speaker: "Guillermo Schor Landman",
    title: "Reglamentación de la IA",
    links: [{ label: "Presentación", url: "https://drive.google.com/file/d/1QSL_FA6ELytcIxHQpd7BFCuip5vh1kJ5/view?usp=sharing" }]
  },
  {
    speaker: "Ezequiel Andres Valicenti",
    title: "Emociones, inteligencia artificial y protección de la persona consumidora",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/17GM4P7lrVRFJCy4tN61nP3ykwzxd3haa/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" }]
  },
  {
    speaker: "Mario Adaro",
    title: "Inno ¿Vamos? La necesidad de un nuevo liderazgo judicial",
    links: [{ label: "Presentación", url: "https://www.canva.com/design/DAHLbTEzD9I/o9sZFeGc5t6Kt1WjMAJgCQ/edit" }]
  },
  {
    speaker: "Yazmin Belen Quiroga - Pablo Casas",
    title: "Inteligencia artificial e innovación judicial: la experiencia de AymurAI en el Juzgado Penal 10 de la Ciudad de Buenos Aires",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/1fgGCBUC0T7_7dhxq3Kq59E3ipGbrQd86/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" }]
  },
  {
    speaker: "Panel Infolab: Bruno Constanzo - Juan Gummy",
    title: "Mirada interdisciplinaria: IA y deepfakes - Uso de IA para la búsqueda de jurisprudencia",
    links: [
      { label: "Presentación Constanzo", url: "https://drive.google.com/file/d/1odZiyNWt-TD4Z6sy8Z14gdXKqAJRR-uD/view?usp=drive_link" },
      { label: "Presentación Gumy", url: "https://drive.google.com/file/d/1gnLKZ8srF0i41YZY5jFcXrT_q1TP6WVV/view?usp=sharing" }
    ]
  },
  {
    speaker: "Maria Candela Ruano - Evelyn Haupt - Macarena Picardi - Natacha Holzinger",
    title: "El algoritmo en disputa: lo que la IA revela sobre la desigualdad de género",
    links: [{ label: "Presentación", url: "https://drive.google.com/file/d/1qu8h1kB4H-KZcF7tRfbOqCHGyGSA6kMT/view?usp=sharing" }]
  },
  {
    speaker: "Gabriel Hernan Quadri",
    title: "Perfiles humanos necesarios en tiempos de inteligencia artificial",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/1M1T-wIDQi5T2t8RY5Uy9-_VUWW3CWLTt/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" }]
  },
  {
    speaker: "Mariana Sanchez Caparrós",
    title: "No todo es un agente (ni tiene que serlo): gobernar el ecosistema de la IA agéntica en la Justicia",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/1YXgnvztPq7aG93wR2TDYcq5uPQ_pkv9C/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" }]
  },
  {
    speaker: "Francisco Morell Otamendi",
    title: "Tecno-ingeniería legal; diseño de necesidades y las herramientas agénticas",
    links: [
      { label: "Presentación", url: "https://canva.link/t55pm2digfmmztc" }
    ]
  },
  {
    speaker: "Taller Ing. Microsoft",
    title: "Agentes de IA con Microsoft Copilot para asistencia a la gestión judicial",
    links: [
      { label: "Presentación 1", url: "https://docs.google.com/presentation/d/1L4DuFDqEsGPW-Q0cAA9MtAz-27vywWsm/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" },
      { label: "Presentación Freire", soon: true }
    ]
  },
  {
    speaker: "Julio Conte-Grand",
    title: "La gestión como un proceso de innovación continua centrada en las personas",
    links: [{ label: "Presentación", url: "https://docs.google.com/presentation/d/1RZYTVTSl65upyDQi3gmv8KIQ8FVBFR3M/edit?usp=sharing&ouid=113413225707369128631&rtpof=true&sd=true" }]
  },
  {
    speaker: "Panel Judiciales que Innovan",
    title: "",
    featured: true,
    links: [
      { label: "Innovaciones en la investigación - Sabrina Lamperti", url: "https://drive.google.com/file/d/1aHgEMwKxyRH8sFTOi2x2MEe5guyPeNHx/view?usp=drivesdk" },
      { label: "Chatbot - Juzgado Civil y Comercial n° 14 MdP", soon: true },
      { label: "Vínculos - María Laura Luccini", url: "https://vinculos.cloud/presentacion/" },
      { label: "Presentación - Juan Manuel Rilo", soon: true }
    ]
  }
];

const tabs = [
  { id: "clases", label: "Clases preparatorias", icon: Youtube },
  { id: "repositorio", label: "Repositorio", icon: BookOpen },
  { id: "charlas", label: "Material de las charlas", icon: FileText }
];

function normalize(value) {
  return String(value || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function detectDelimiter(line) {
  return (line.match(/;/g) || []).length >= (line.match(/,/g) || []).length ? ";" : ",";
}

function parseCsv(text) {
  const firstLine = text.split(/\r?\n/).find((line) => line.trim()) || "";
  const delimiter = detectDelimiter(firstLine);
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === delimiter && !quoted) {
      row.push(cell.trim());
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell.trim());
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell.trim());
  if (row.some(Boolean)) rows.push(row);

  const headers = rows.shift()?.map((header) => normalize(header).replace(/\s+/g, "")) || [];
  return rows
    .map((cells) => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = cells[index] || "";
      });
      return {
        titulo: item.titulo || item.title || "Recurso sin título",
        detalle: item.detalle || item.descripcion || item.description || "",
        tipo: item.tipo || item.categoria || "Repositorio",
        link: item.link || item.url || "#",
        archivo: item.archivo || item.file || item.documento || "",
        linkLabel: item.linklabel || item.etiquetalink || "",
        archivoLabel: item.archivolabel || item.etiquetaarchivo || "",
        qr: item.qr || "",
        responsable: item.responsable || item.autor || item.equipo || ""
      };
    })
    .filter((item) => item.titulo || item.link);
}

function Header() {
  return (
    <header className="sticky top-0 z-30 border-b border-white/10 bg-judicial-ink/90 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src="/assets/logo-cmfbsas.png"
            alt="Colegio de Magistrados y Funcionarios del Poder Judicial de la Provincia de Buenos Aires"
            className="h-12 w-12 shrink-0 rounded-md bg-white object-contain p-1"
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold uppercase tracking-wide text-judicial-sky">
              Innova-Souvenir
            </p>
            <p className="max-w-[680px] text-sm font-medium text-white sm:text-base">
              Innovación y Gestión Judicial - Mar del Plata 2026
            </p>
          </div>
        </div>
        <div className="hidden max-w-xs items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-right text-xs font-medium text-judicial-mist md:flex">
          <Scale className="h-5 w-5 shrink-0 text-judicial-sky" />
          Comisión de Innovación y Gestión del Colegio de Magistrados y Funcionarios PBA
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative overflow-hidden bg-judicial-ink text-white">
      <div className="network-field" aria-hidden="true" />
      <div className="mx-auto grid min-h-[620px] w-full max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[.72fr_1.28fr] lg:py-20">
        <div className="relative z-10">
          <div className="mb-7 inline-flex max-w-sm items-center gap-3 rounded-lg border border-judicial-sky/40 bg-judicial-sky/15 px-6 py-5 text-2xl font-black leading-tight text-judicial-sky shadow-judicial sm:text-3xl">
            <Sparkles className="h-8 w-8 shrink-0" />
            Souvenir de las Primeras Jornadas
          </div>
          <div className="rounded-lg border border-white/10 bg-white/10 p-5 backdrop-blur">
            <img
              src="/assets/logo-cmfbsas.png"
              alt=""
              className="mb-5 h-20 w-20 rounded-md bg-white object-contain p-1"
            />
            <p className="text-sm font-semibold uppercase tracking-wide text-judicial-sky">
              Comisión de Innovación y Gestión
            </p>
            <p className="mt-2 text-sm leading-relaxed text-judicial-mist">
              Colegio de Magistrados y Funcionarios del Poder Judicial de la Provincia de Buenos Aires.
            </p>
          </div>
        </div>

        <div className="relative z-10">
          <div className="overflow-hidden rounded-lg border border-white/10 bg-white/10 shadow-judicial backdrop-blur-lg">
            <img
              src="/assets/jornadas-mdq.png"
              alt="Flyer Jornadas de Innovación"
              className="aspect-[1.18] w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function TabButton({ active, icon: Icon, label, onClick, tone }) {
  const toneClasses = {
    clases: active
      ? "border-red-300 bg-red-100 text-red-800 shadow-lg shadow-red-950/10"
      : "border-red-100 bg-red-50 text-red-700 hover:border-red-200 hover:bg-red-100",
    repositorio: active
      ? "border-slate-500 bg-slate-700 text-white shadow-lg shadow-slate-950/15"
      : "border-slate-200 bg-slate-100 text-slate-700 hover:border-slate-300 hover:bg-slate-200",
    charlas: active
      ? "border-cyan-400 bg-cyan-100 text-cyan-800 shadow-lg shadow-cyan-950/10"
      : "border-cyan-100 bg-cyan-50 text-cyan-700 hover:border-cyan-200 hover:bg-cyan-100"
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-16 flex-1 items-center justify-center gap-3 rounded-lg border px-4 text-base font-black transition sm:flex-none sm:px-7 ${toneClasses[tone]}`}
    >
      <Icon className="h-4 w-4" />
      {label}
    </button>
  );
}

function ClassTab() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {classes.map((item) => (
        <a
          key={item.name}
          href={item.url}
          target="_blank"
          rel="noreferrer"
          className="group rounded-lg border border-judicial-line bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-judicial-sky hover:shadow-judicial"
        >
          <PlayCircle className="mb-8 h-11 w-11 text-judicial-blue transition group-hover:scale-105" />
          <h3 className="text-xl font-black text-judicial-navy">{item.name}</h3>
          <p className="mt-2 text-sm text-slate-600">Ver clase en YouTube</p>
        </a>
      ))}
    </div>
  );
}

function RepositoryTab() {
  const [repositories, setRepositories] = useState(fallbackRepositories);
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("Cargando repositorio de herramientas...");

  useEffect(() => {
    const source = GOOGLE_SHEETS_CSV_URL || LOCAL_REPOSITORY_CSV;

    async function loadRepositories() {
      try {
        const response = await fetch(`${source}${source.includes("?") ? "&" : "?"}v=${Date.now()}`);
        if (!response.ok) throw new Error("No se pudo leer el CSV");
        const text = await response.text();
        const items = parseCsv(text);
        if (!items.length) throw new Error("El CSV no tiene filas válidas");
        setRepositories(items);
        setStatus(`Cargados ${items.length} recursos desde ${GOOGLE_SHEETS_CSV_URL ? "Google Sheets" : "CSV local basado en la planilla"}.`);
      } catch (error) {
        setStatus("No se pudo cargar el CSV. Se muestra un recurso de ejemplo.");
        console.warn(error);
      }
    }

    loadRepositories();
  }, []);

  const visibleRepositories = useMemo(() => {
    const needle = normalize(query);
    return repositories.filter((item) =>
      normalize([item.titulo, item.detalle, item.tipo, item.responsable].join(" ")).includes(needle)
    );
  }, [query, repositories]);

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-h-12 flex-1 items-center gap-2 rounded-lg border border-judicial-line bg-white px-3">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-judicial-navy outline-none placeholder:text-slate-400"
            placeholder="Buscar por título, descripción o responsable"
          />
        </div>
        <p className="text-sm font-semibold text-slate-500">{status}</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {visibleRepositories.map((item) => (
          <article
            key={`${item.titulo}-${item.link}`}
            className="rounded-lg border border-judicial-line bg-white p-5 shadow-sm"
          >
            <div className="mb-4 flex items-start justify-between gap-3">
              <span className="rounded-full bg-judicial-mist px-3 py-1 text-xs font-black uppercase text-judicial-blue">
                {item.tipo}
              </span>
              <Link2 className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="text-xl font-black text-judicial-navy">{item.titulo}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.detalle}</p>
            <div className="mt-5 flex flex-col gap-3 border-t border-judicial-line pt-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-xs font-bold uppercase text-slate-500">
                Creado por {item.responsable || "equipo del evento"}
              </span>
              <div className="flex flex-wrap gap-2">
                {item.link && item.link !== "#" && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-lg bg-judicial-navy px-3 py-2 text-sm font-bold text-white transition hover:bg-judicial-blue"
                  >
                    {item.linkLabel || (item.archivo ? "Ver App" : "Abrir")} <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {item.archivo && (
                  <a
                    href={item.archivo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-judicial-line bg-white px-3 py-2 text-sm font-bold text-judicial-navy transition hover:border-judicial-sky hover:bg-judicial-mist"
                  >
                    {item.archivoLabel || "Archivo:"} <ExternalLink className="h-4 w-4" />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function TalksTab() {
  const [notice, setNotice] = useState("");

  return (
    <div className="space-y-5">
      {notice && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-black uppercase tracking-wide text-red-700">
          {notice}
        </div>
      )}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {talks.map((item) => (
          <article
            key={`${item.speaker}-${item.title}`}
            className={`min-h-52 rounded-lg border p-5 shadow-sm ${
              item.featured
                ? "border-cyan-200 bg-cyan-50 md:col-span-2 xl:col-span-3"
                : "border-judicial-line bg-white"
            }`}
          >
            <div className={item.featured ? "flex items-center gap-3" : ""}>
              {item.featured && (
                <img
                  src="/assets/logo-cmfbsas.png"
                  alt=""
                  className="h-10 w-10 rounded-md bg-white object-contain p-1"
                />
              )}
              <p className={`text-sm font-black uppercase tracking-wide ${item.featured ? "text-cyan-800" : "text-judicial-blue"}`}>
                {item.speaker}
              </p>
            </div>
            {item.title && (
              <h3 className="mt-3 text-lg font-black leading-snug text-judicial-navy">
                {item.title}
              </h3>
            )}
            <div className={`mt-5 flex flex-wrap gap-2 ${item.featured ? "gap-3" : ""}`}>
              {item.links.map((link) =>
                link.soon ? (
                  <button
                    key={`${item.speaker}-${link.label}`}
                    type="button"
                    onClick={() => setNotice("Próximamente")}
                    className={`${item.featured ? "min-h-12 px-4" : "min-h-10 px-3"} inline-flex items-center justify-center rounded-lg border border-red-200 bg-red-50 text-sm font-black text-red-700 transition hover:bg-red-100`}
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    key={`${item.speaker}-${link.label}`}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`${item.featured ? "min-h-12 px-4" : "min-h-10 px-3"} inline-flex items-center justify-center rounded-lg bg-judicial-navy text-sm font-black text-white transition hover:bg-judicial-blue`}
                  >
                    {link.label}
                  </a>
                )
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function ContentTabs() {
  const [activeTab, setActiveTab] = useState("clases");

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6 sm:py-16">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href="https://d5d47d45-ac39-416c-bfe1-4835d95a23aa.usrfiles.com/ugd/3a5938_6ad6761b534f4d79829515a783fe0653.pdf"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-16 flex-1 items-center justify-center rounded-lg border border-judicial-navy bg-judicial-navy px-4 text-base font-black text-white shadow-lg shadow-blue-950/20 transition hover:bg-judicial-blue sm:flex-none sm:px-8"
        >
          PROGRAMA
        </a>
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            icon={tab.icon}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
            tone={tab.id}
          />
        ))}
        <a
          href="https://innovalab.pjm.gob.ar/"
          target="_blank"
          rel="noreferrer"
          className="flex min-h-20 flex-1 flex-col items-center justify-center gap-1 rounded-lg border border-cyan-200 bg-gradient-to-r from-violet-400 via-cyan-400 to-emerald-300 px-5 text-base font-black text-white shadow-lg shadow-cyan-950/15 transition hover:brightness-105 sm:flex-none sm:px-7"
        >
          <span className="flex items-center gap-2">
            <img src="/assets/innova-hub-logo.svg" alt="" className="h-10 w-12 object-contain" />
            INNOVA-HUB
          </span>
          <span className="text-xs font-bold leading-tight text-white/90">
            Repositorio JusLab. Compartí tu idea
          </span>
        </a>
      </div>

      <div className="rounded-lg border border-judicial-line bg-slate-50 p-4 shadow-judicial sm:p-6">
        {activeTab === "clases" && <ClassTab />}
        {activeTab === "repositorio" && <RepositoryTab />}
        {activeTab === "charlas" && <TalksTab />}
      </div>
    </section>
  );
}

function App() {
  return (
    <div className="min-h-screen bg-white text-judicial-ink">
      <Header />
      <main>
        <Hero />
        <ContentTabs />
      </main>
      <footer className="border-t border-judicial-line bg-slate-50 px-4 py-8 text-center text-sm font-medium text-slate-500">
        Innova-Souvenir · Innovación y Gestión Judicial · Mar del Plata 2026
      </footer>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
