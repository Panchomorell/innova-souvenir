import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BookOpen,
  CalendarDays,
  ExternalLink,
  FileText,
  GraduationCap,
  Link2,
  MapPin,
  PlayCircle,
  Scale,
  Search,
  Sparkles
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
    title: "Derecho y tecnología: las tensiones que desafían al poder judicial"
  },
  {
    speaker: "Gustavo Perez Villar",
    title: "Agenda de innovación de la Suprema Corte"
  },
  {
    speaker: "Nestor Antonio Trabucco",
    title: "Búsqueda de la eficiencia en la gestión de los procesos judiciales: trazabilidad y métricas"
  },
  {
    speaker: "Federico Alvarez Larrondo",
    title: "Cavilaciones sobre el futuro de la Justicia a partir de la IA generativa Agentica"
  },
  {
    speaker: "Guillermo Schor Landman",
    title: "Reglamentación de la IA"
  },
  {
    speaker: "Ezequiel Andres Valicenti",
    title: "Emociones, inteligencia artificial y protección de la persona consumidora"
  },
  {
    speaker: "Mario Adaro",
    title: "Inno ¿Vamos? La necesidad de un nuevo liderazgo judicial"
  },
  {
    speaker: "Yazmin Belen Quiroga - Pablo Casas",
    title: "Inteligencia artificial e innovación judicial: la experiencia de AymurAI en el Juzgado Penal 10 de la Ciudad de Buenos Aires"
  },
  {
    speaker: "Panel Infolab: Bruno Costanzo - Juan Gummy",
    title: "Mirada interdisciplinaria: IA y deepfakes - Uso de IA para la búsqueda de jurisprudencia"
  },
  {
    speaker: "Maria Candela Ruano - Evelyn Haupt - Macarena Picardi - Natacha Holzinger",
    title: "El algoritmo en disputa: lo que la IA revela sobre la desigualdad de género"
  },
  {
    speaker: "Gabriel Hernan Quadri",
    title: "Perfiles humanos necesarios en tiempos de inteligencia artificial"
  },
  {
    speaker: "Mariana Sanchez Caparrós",
    title: "No todo es un agente (ni tiene que serlo): gobernar el ecosistema de la IA agéntica en la Justicia"
  },
  {
    speaker: "Francisco Morell Otamendi",
    title: "Tecno-ingeniería legal; diseño de necesidades y las herramientas agénticas"
  },
  {
    speaker: "Taller Ing. Microsoft",
    title: "Agentes de IA con Microsoft Copilot para asistencia a la gestión judicial"
  },
  {
    speaker: "Julio Conte-Grand",
    title: "La gestión como un proceso de innovación continua centrada en las personas"
  }
];

const tabs = [
  { id: "clases", label: "Clases preparatorias", icon: GraduationCap },
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
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-judicial-sky/30 bg-judicial-sky/10 px-3 py-1 text-sm font-semibold text-judicial-sky">
            <Sparkles className="h-4 w-4" />
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

function TabButton({ active, icon: Icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-16 flex-1 items-center justify-center gap-3 rounded-lg border px-4 text-base font-black transition sm:flex-none sm:px-7 ${
        active
          ? "border-judicial-blue bg-judicial-blue text-white shadow-lg shadow-blue-900/20"
          : "border-judicial-line bg-white text-judicial-navy hover:border-judicial-sky hover:bg-judicial-mist"
      }`}
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
                    {item.archivo ? "Ver App" : "Abrir"} <ExternalLink className="h-4 w-4" />
                  </a>
                )}
                {item.archivo && (
                  <a
                    href={item.archivo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center gap-1 rounded-lg border border-judicial-line bg-white px-3 py-2 text-sm font-bold text-judicial-navy transition hover:border-judicial-sky hover:bg-judicial-mist"
                  >
                    Archivo: <ExternalLink className="h-4 w-4" />
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
  return (
    <div className="space-y-5">
      <div className="rounded-lg border border-judicial-sky/40 bg-white p-5">
        <p className="text-3xl font-black uppercase tracking-wide text-red-600 sm:text-4xl">Próximamente</p>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600">
          Las presentaciones y materiales de estas charlas se irán incorporando al repositorio digital.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {talks.map((item) => (
          <article
            key={`${item.speaker}-${item.title}`}
            className="min-h-44 rounded-lg border border-judicial-line bg-white p-5 shadow-sm"
          >
            <p className="text-sm font-black uppercase tracking-wide text-judicial-blue">
              {item.speaker}
            </p>
            <h3 className="mt-3 text-lg font-black leading-snug text-judicial-navy">
              {item.title}
            </h3>
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
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {tabs.map((tab) => (
          <TabButton
            key={tab.id}
            active={activeTab === tab.id}
            icon={tab.icon}
            label={tab.label}
            onClick={() => setActiveTab(tab.id)}
          />
        ))}
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
