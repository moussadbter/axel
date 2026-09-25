"use client";

import {
  Activity,
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Bell,
  Building2,
  ChevronDown,
  CircleHelp,
  Droplets,
  FileText,
  Fuel,
  Gauge,
  LayoutDashboard,
  Menu,
  MoreHorizontal,
  Search,
  Settings,
  ShieldCheck,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const chartData = [
  { time: "00h", stock: 112, sortie: 3 },
  { time: "04h", stock: 109, sortie: 3 },
  { time: "08h", stock: 98, sortie: 11 },
  { time: "12h", stock: 87, sortie: 11 },
  { time: "16h", stock: 74, sortie: 13 },
  { time: "20h", stock: 66, sortie: 8 },
  { time: "24h", stock: 62, sortie: 4 },
];

const nav = [
  { label: "Vue d’ensemble", icon: LayoutDashboard },
  { label: "Livraisons", icon: Truck },
  { label: "Stocks & cuves", icon: Fuel },
  { label: "Pompes", icon: Gauge },
  { label: "Alertes", icon: AlertTriangle, badge: 3 },
  { label: "Rapports", icon: FileText },
];

const tanks = [
  { name: "Cuve A · Gasoil", level: 72, volume: "21 640 L", capacity: "30 000 L", color: "#f4a621" },
  { name: "Cuve B · Super", level: 48, volume: "9 680 L", capacity: "20 000 L", color: "#22a66a" },
  { name: "Cuve C · Gasoil", level: 18, volume: "3 610 L", capacity: "20 000 L", color: "#e96552" },
];

const deliveries = [
  { ref: "LIV-0925-018", truck: "CI 4821 MD", driver: "K. Diabaté", volume: "44 810 L", status: "En transit", tone: "blue", time: "Arrivée · 14:35" },
  { ref: "LIV-0925-017", truck: "CI 1938 AB", driver: "S. Coulibaly", volume: "32 000 L", status: "Réconciliée", tone: "green", time: "Aujourd’hui · 08:42" },
  { ref: "LIV-0924-016", truck: "CI 7704 KT", driver: "A. Koné", volume: "44 420 L", status: "Écart détecté", tone: "red", time: "Hier · 17:16" },
];

function Logo() {
  return (
    <div className="logo">
      <div className="logo-mark">
        <span />
        <span />
        <span />
      </div>
      <div className="logo-copy">
        <strong>SUD</strong>
        <small>CONTRACTORS</small>
      </div>
    </div>
  );
}

function Tanker() {
  const levels = [96, 94, 91, 92, 93, 94, 93];
  return (
    <div className="tanker-wrap">
      <div className="tanker">
        <div className="tank-shell">
          {levels.map((level, index) => (
            <div className="compartment" key={index}>
              <div className="liquid" style={{ height: `${level}%` }} />
              <span>{index + 1}</span>
            </div>
          ))}
        </div>
        <div className="cab">
          <div className="window" />
          <div className="cab-line" />
        </div>
        <div className="wheels">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="tanker-legend">
        <span>7 compartiments</span>
        <span><i /> Niveau mesuré</span>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <section className="hero-row">
        <div>
          <div className="eyebrow">VENDREDI 25 SEPTEMBRE</div>
          <h1>Bonjour, Moussa <span>👋🏾</span></h1>
          <p>Voici l’état de vos opérations carburant aujourd’hui.</p>
        </div>
        <div className="hero-actions">
          <button className="ghost-button"><FileText size={17} /> Exporter</button>
          <button className="primary-button"><span>+</span> Nouvelle livraison</button>
        </div>
      </section>

      <section className="metrics-grid">
        <Metric icon={Droplets} label="Stock total" value="34 930 L" delta="+4,2%" note="depuis hier" type="positive" />
        <Metric icon={Truck} label="Livraisons actives" value="2" delta="1 en transit" note="1 en dépotage" type="neutral" />
        <Metric icon={Activity} label="Volume livré · sept." value="186 400 L" delta="+12,8%" note="vs mois dernier" type="positive" />
        <Metric icon={AlertTriangle} label="Écarts à traiter" value="3" delta="-840 L" note="valeur cumulée" type="alert" />
      </section>

      <section className="main-grid">
        <article className="panel live-delivery">
          <div className="panel-head">
            <div>
              <div className="title-line">
                <h2>Livraison en cours</h2>
                <span className="live-pill"><i /> En direct</span>
              </div>
              <p>GESTOCI Vridi → Station Riviera 3</p>
            </div>
            <button className="icon-button"><MoreHorizontal size={20} /></button>
          </div>
          <div className="delivery-id">
            <div className="round-icon"><Truck size={20} /></div>
            <div><strong>CI 4821 MD</strong><small>LIV-0925-018 · K. Diabaté</small></div>
            <div className="delivery-volume"><strong>44 810 L</strong><small>sur 45 000 L chargés</small></div>
          </div>
          <Tanker />
          <div className="progress-copy"><span>Progression du trajet</span><strong>68%</strong></div>
          <div className="progress"><i /></div>
          <div className="route">
            <div><i className="route-dot start" /><strong>GESTOCI Vridi</strong><small>Départ · 12:08</small></div>
            <div className="route-time"><Truck size={15} /> 24 min restantes</div>
            <div className="route-destination"><i className="route-dot finish" /><strong>Riviera 3</strong><small>Arrivée · 14:35</small></div>
          </div>
        </article>

        <article className="panel alert-panel">
          <div className="panel-head">
            <div><h2>Alertes récentes</h2><p>3 alertes nécessitent votre attention</p></div>
            <button className="text-button">Tout voir</button>
          </div>
          <div className="alerts">
            <AlertRow level="critical" title="Variation de volume détectée" desc="-420 L · Camion CI 7704 KT" time="Il y a 18 min" />
            <AlertRow level="warning" title="Niveau de cuve faible" desc="Cuve C · Gasoil à 18%" time="Il y a 1 h" />
            <AlertRow level="info" title="Écart de rapprochement" desc="-0,7% · Livraison LIV-0924-016" time="Hier, 17:24" />
          </div>
          <div className="alert-footer"><ShieldCheck size={16} /> Dernière synchronisation il y a 12 sec.</div>
        </article>
      </section>

      <section className="lower-grid">
        <article className="panel stock-panel">
          <div className="panel-head">
            <div><h2>Niveaux des cuves</h2><p>Volumes mesurés en temps réel</p></div>
            <button className="text-button">Gérer les cuves</button>
          </div>
          <div className="tank-list">
            {tanks.map((tank) => (
              <div className="tank-row" key={tank.name}>
                <div className="mini-tank"><i style={{ height: `${tank.level}%`, background: tank.color }} /></div>
                <div className="tank-info">
                  <div><strong>{tank.name}</strong><span>{tank.level}%</span></div>
                  <div className="tank-bar"><i style={{ width: `${tank.level}%`, background: tank.color }} /></div>
                  <small>{tank.volume} <em>/ {tank.capacity}</em></small>
                </div>
              </div>
            ))}
          </div>
        </article>

        <article className="panel chart-panel">
          <div className="panel-head">
            <div><h2>Évolution du stock</h2><p>Volume total des dernières 24 heures</p></div>
            <button className="select-button">24 heures <ChevronDown size={14} /></button>
          </div>
          <div className="chart-wrap">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 12, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="stockFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eda62d" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#eda62d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf0f2" vertical={false} />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} unit="k" />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e7e9e8", fontSize: 12 }} />
                <Area type="monotone" dataKey="stock" stroke="#eda62d" strokeWidth={2.5} fill="url(#stockFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>

      <article className="panel deliveries-panel">
        <div className="panel-head">
          <div><h2>Dernières livraisons</h2><p>Suivi et rapprochement des volumes transportés</p></div>
          <button className="text-button">Voir toutes les livraisons</button>
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>RÉFÉRENCE</th><th>CAMION / CHAUFFEUR</th><th>VOLUME MESURÉ</th><th>DATE</th><th>STATUT</th><th /></tr></thead>
            <tbody>
              {deliveries.map((item) => (
                <tr key={item.ref}>
                  <td><strong>{item.ref}</strong></td>
                  <td><div className="truck-cell"><span><Truck size={16} /></span><div><strong>{item.truck}</strong><small>{item.driver}</small></div></div></td>
                  <td><strong>{item.volume}</strong></td>
                  <td>{item.time}</td>
                  <td><span className={`status ${item.tone}`}><i />{item.status}</span></td>
                  <td><button className="icon-button"><MoreHorizontal size={18} /></button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

function Metric({ icon: Icon, label, value, delta, note, type }: { icon: typeof Droplets; label: string; value: string; delta: string; note: string; type: string }) {
  return (
    <article className={`metric-card ${type}`}>
      <div className="metric-top"><span className="metric-icon"><Icon size={20} /></span><button><MoreHorizontal size={18} /></button></div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>{type === "positive" && <ArrowUpRight size={13} />}{type === "alert" && <ArrowDownRight size={13} />}<b>{delta}</b> {note}</small>
    </article>
  );
}

function AlertRow({ level, title, desc, time }: { level: string; title: string; desc: string; time: string }) {
  return (
    <div className={`alert-row ${level}`}>
      <span className="alert-icon"><AlertTriangle size={17} /></span>
      <div><strong>{title}</strong><p>{desc}</p><small>{time}</small></div>
      <ChevronDown className="alert-chevron" size={16} />
    </div>
  );
}

function Placeholder({ title }: { title: string }) {
  return (
    <div className="placeholder">
      <span><Activity size={30} /></span>
      <p>MODULE PRO FUEL</p>
      <h1>{title}</h1>
      <div className="placeholder-card">
        <ShieldCheck size={34} />
        <h2>Vue prête pour la démonstration</h2>
        <p>Ce module reprendra les données en temps réel, les filtres par station et les droits associés à votre profil.</p>
        <button className="primary-button">Configurer le module</button>
      </div>
    </div>
  );
}

export default function Home() {
  const [active, setActive] = useState("Vue d’ensemble");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const selectNav = (label: string) => {
    setActive(label);
    setSidebarOpen(false);
  };

  return (
    <div className="app-shell">
      {sidebarOpen && <button aria-label="Fermer le menu" className="mobile-overlay" onClick={() => setSidebarOpen(false)} />}
      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <Logo />
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}><X size={20} /></button>
        </div>
        <div className="product-name"><span><Droplets size={17} /></span><div><strong>ProFuel Control</strong><small>Pilotage carburant</small></div></div>
        <nav>
          <p>PILOTAGE</p>
          {nav.map(({ label, icon: Icon, badge }) => (
            <button className={active === label ? "active" : ""} onClick={() => selectNav(label)} key={label}>
              <Icon size={19} /><span>{label}</span>{badge && <em>{badge}</em>}
            </button>
          ))}
          <p>ADMINISTRATION</p>
          <button onClick={() => selectNav("Utilisateurs")} className={active === "Utilisateurs" ? "active" : ""}><Users size={19} /><span>Utilisateurs</span></button>
          <button onClick={() => selectNav("Paramètres")} className={active === "Paramètres" ? "active" : ""}><Settings size={19} /><span>Paramètres</span></button>
        </nav>
        <div className="support-card"><CircleHelp size={21} /><strong>Besoin d’aide ?</strong><p>Notre équipe support est disponible.</p><button>Contacter le support</button></div>
        <div className="sidebar-user"><span>MD</span><div><strong>Moussa Diabaté</strong><small>Administrateur</small></div><MoreHorizontal size={18} /></div>
      </aside>

      <main>
        <header>
          <button className="menu-button" onClick={() => setSidebarOpen(true)}><Menu size={22} /></button>
          <button className="station-select"><span><Building2 size={17} /></span><div><small>STATION ACTIVE</small><strong>Riviera 3 · Abidjan</strong></div><ChevronDown size={16} /></button>
          <div className="header-right">
            <label className="search"><Search size={17} /><input placeholder="Rechercher..." /><kbd>⌘ K</kbd></label>
            <button className="notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)}><Bell size={19} /><i /></button>
            <div className="mini-user">MD</div>
          </div>
          {notificationsOpen && (
            <div className="notification-popover">
              <div><strong>Notifications</strong><button onClick={() => setNotificationsOpen(false)}><X size={16} /></button></div>
              <AlertRow level="critical" title="Variation de volume" desc="-420 L · CI 7704 KT" time="Il y a 18 min" />
              <AlertRow level="warning" title="Cuve C bientôt vide" desc="Niveau actuel : 18%" time="Il y a 1 h" />
            </div>
          )}
        </header>
        <div className="content">{active === "Vue d’ensemble" ? <Dashboard /> : <Placeholder title={active} />}</div>
      </main>
    </div>
  );
}
