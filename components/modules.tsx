"use client";

import {
  Activity,
  Bell,
  Camera,
  CircleDot,
  Clock,
  FileText,
  Fuel,
  Gauge,
  MapPin,
  Play,
  Radio,
  ShieldAlert,
  ShieldCheck,
  Thermometer,
  Truck,
  Users,
  Wrench,
} from "lucide-react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { AlertRow, EmptyHint, Metric, PageHead, StatusBadge, Tanker } from "@/components/ui";
import {
  alerts,
  camEvents,
  drivers,
  fuelTrend,
  fuelTx,
  geofences,
  missions,
  pumps,
  reports,
  stockChart,
  tanks,
  users,
  vehicles,
  workOrders,
  type RoleId,
} from "@/lib/data";

function filterSite<T extends { site?: string }>(items: T[], station: string) {
  if (station === "all") return items;
  return items.filter((item) => !item.site || item.site === station);
}

export function OverviewView({ station, onOpen }: { station: string; onOpen: (id: string) => void }) {
  const live = vehicles.filter((v) => v.status.includes("mission") || v.tone === "blue").length;
  return (
    <>
      <PageHead
        kicker="Plateforme intégrée · Pro Vision · Pro Fuel · ProCam"
        title="Flotte intelligente, pertes sous contrôle"
        subtitle="Positions, carburant, conducteurs, cuves et preuves vidéo dans un seul cockpit."
        actions={
          <>
            <button type="button" className="ghost-button" onClick={() => onOpen("reports")}>
              <FileText size={17} /> Exporter
            </button>
            <button type="button" className="primary-button" onClick={() => onOpen("missions")}>
              <span>+</span> Nouvelle mission
            </button>
          </>
        }
      />

      <section className="metrics-grid six">
        <Metric icon={Radio} label="Véhicules en ligne" value={`${live}/${vehicles.length}`} delta="94 %" note="disponibilité GPS" type="positive" />
        <Metric icon={ShieldCheck} label="Score sécurité" value="86 / 100" delta="+3 pts" note="vs semaine dernière" type="positive" />
        <Metric icon={Fuel} label="Carburant 7 j" value="11 930 L" delta="−8 %" note="ralenti inclus" type="positive" />
        <Metric icon={ShieldAlert} label="Alertes ouvertes" value="7" delta="2 critiques" note="à traiter" type="alert" />
        <Metric icon={Clock} label="Ralenti" value="12 %" delta="−1,4 pt" note="objectif < 10 %" type="neutral" />
        <Metric icon={Gauge} label="Écarts volume" value="−840 L" delta="3 missions" note="GESTOCI vs cuves" type="alert" />
      </section>

      <section className="main-grid">
        <article className="panel live-delivery">
          <div className="panel-head">
            <div>
              <div className="title-line">
                <h2>Mission live · citerne</h2>
                <span className="live-pill">
                  <i /> En direct
                </span>
              </div>
              <p>GESTOCI Vridi → Station Riviera 3 · LIV-0925-018</p>
            </div>
          </div>
          <div className="delivery-id">
            <div className="round-icon">
              <Truck size={20} />
            </div>
            <div>
              <strong>CI-4821-MD</strong>
              <small>K. Diabaté · 62 km/h · score 91</small>
            </div>
            <div className="delivery-volume">
              <strong>44 810 L</strong>
              <small>sur 45 000 L chargés</small>
            </div>
          </div>
          <Tanker />
          <div className="progress-copy">
            <span>Progression du trajet</span>
            <strong>68 %</strong>
          </div>
          <div className="progress">
            <i />
          </div>
          <div className="route">
            <div>
              <i className="route-dot start" />
              <strong>GESTOCI Vridi</strong>
              <small>Départ · 12:08</small>
            </div>
            <div className="route-time">
              <Truck size={15} /> 24 min
            </div>
            <div className="route-destination">
              <i className="route-dot finish" />
              <strong>Riviera 3</strong>
              <small>Arrivée · 14:35</small>
            </div>
          </div>
        </article>

        <article className="panel map-mini" onClick={() => onOpen("map")}>
          <div className="panel-head">
            <div>
              <h2>Carte flotte</h2>
              <p>Cliquez pour ouvrir le suivi temps réel</p>
            </div>
            <span className="live-pill">
              <i /> GPS 15 s
            </span>
          </div>
          <FleetMap compact station={station} />
        </article>
      </section>

      <section className="lower-grid">
        <article className="panel alert-panel">
          <div className="panel-head">
            <div>
              <h2>File d’alertes IA</h2>
              <p>Anomalies croisées GPS × sonde × ProCam</p>
            </div>
            <button type="button" className="text-button" onClick={() => onOpen("alerts")}>
              Tout voir
            </button>
          </div>
          <div className="alerts">
            {alerts.slice(0, 4).map((a) => (
              <AlertRow key={a.title} {...a} />
            ))}
          </div>
          <div className="alert-footer">
            <ShieldCheck size={16} /> Dernière synchro il y a 12 s · modèle fraude v3.2
          </div>
        </article>

        <article className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>Consommation vs ralenti</h2>
              <p>Litres utiles et litres perdus moteur tournant</p>
            </div>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={fuelTrend} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#edf0f2" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e7e9e8", fontSize: 12 }} />
                <Bar dataKey="l" fill="#eda62d" radius={[4, 4, 0, 0]} name="Litres" />
                <Bar dataKey="idle" fill="#df5b52" radius={[4, 4, 0, 0]} name="Ralenti" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </>
  );
}

export function FleetMap({ compact, station }: { compact?: boolean; station: string }) {
  const list = filterSite(vehicles, station);
  return (
    <div className={compact ? "abj-map compact" : "abj-map"}>
      <div className="lagoon" />
      <div className="land plateau" />
      <div className="land cocody" />
      <div className="road r1" />
      <div className="road r2" />
      <div className="road r3" />
      <span className="poi" style={{ top: "24%", left: "46%" }}>
        GESTOCI
      </span>
      <span className="poi" style={{ top: "46%", left: "70%" }}>
        Riviera 3
      </span>
      <span className="poi" style={{ top: "56%", left: "28%" }}>
        Yopougon
      </span>
      <span className="poi" style={{ top: "74%", left: "80%" }}>
        Bassam
      </span>
      {list.map((v) => (
        <button
          type="button"
          key={v.id}
          className={`pin ${v.tone}`}
          style={{ top: `${v.lat}%`, left: `${v.lng}%`, transform: `translate(-50%, -50%) rotate(${v.heading}deg)` }}
          title={`${v.id} · ${v.driver} · ${v.speed} km/h`}
        >
          <CircleDot size={14} />
        </button>
      ))}
      {!compact && (
        <div className="map-legend">
          <span>
            <i className="green" /> En service
          </span>
          <span>
            <i className="blue" /> Mission
          </span>
          <span>
            <i className="amber" /> Usage / ralenti
          </span>
          <span>
            <i className="red" /> Alerte
          </span>
        </div>
      )}
    </div>
  );
}

export function MapView({ station }: { station: string }) {
  const list = filterSite(vehicles, station);
  return (
    <>
      <PageHead
        kicker="Pro Vision"
        title="Suivi GPS en temps réel"
        subtitle="Positions, vitesses, géofences et replay de trajet. Mise à jour toutes les 15 secondes."
      />
      <div className="split-map">
        <article className="panel map-full">
          <FleetMap station={station} />
          <div className="replay-bar">
            <Play size={14} /> Replay 12:08 → 14:12
            <input type="range" defaultValue={68} aria-label="Replay trajet" />
            <span>68 %</span>
          </div>
        </article>
        <article className="panel">
          <div className="panel-head">
            <div>
              <h2>Actifs visibles</h2>
              <p>{list.length} véhicules sur la carte</p>
            </div>
          </div>
          <ul className="asset-list">
            {list.map((v) => (
              <li key={v.id}>
                <div>
                  <strong>{v.id}</strong>
                  <small>
                    {v.driver} · {v.type}
                  </small>
                </div>
                <div className="asset-meta">
                  <em>{v.speed} km/h</em>
                  <StatusBadge tone={v.tone}>{v.status}</StatusBadge>
                </div>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </>
  );
}

export function FleetView({ station }: { station: string }) {
  const list = filterSite(vehicles, station);
  return (
    <>
      <PageHead kicker="Parc" title="Véhicules & engins" subtitle="Citernes, pickups, bennes et frigo — TCO, carburant, heures moteur." />
      <div className="table-wrap panel">
        <table>
          <thead>
            <tr>
              <th>Immat.</th>
              <th>Type</th>
              <th>Conducteur</th>
              <th>Statut</th>
              <th>Vitesse</th>
              <th>Réservoir</th>
              <th>Score</th>
              <th>Km / heures</th>
            </tr>
          </thead>
          <tbody>
            {list.map((v) => (
              <tr key={v.id}>
                <td>
                  <strong>{v.id}</strong>
                </td>
                <td>{v.type}</td>
                <td>{v.driver}</td>
                <td>
                  <StatusBadge tone={v.tone}>{v.status}</StatusBadge>
                </td>
                <td>{v.speed} km/h</td>
                <td>{v.fuel} %</td>
                <td>
                  <strong>{v.score}</strong>
                </td>
                <td>
                  {v.km.toLocaleString("fr-FR")} km · {v.hours.toLocaleString("fr-FR")} h
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && <EmptyHint />}
      </div>
    </>
  );
}

export function DriversView() {
  return (
    <>
      <PageHead
        kicker="Sécurité & coaching"
        title="Conducteurs"
        subtitle="Score calculé sur vitesse, freinages, accélérations, ralenti et hors plage horaire."
      />
      <section className="card-grid">
        {drivers.map((d) => (
          <article className="panel driver-card" key={d.name}>
            <div className="score-ring" style={{ background: `conic-gradient(${d.score >= 85 ? "#24a36b" : d.score >= 75 ? "#eda62d" : "#df5b52"} ${d.score}%, #edf0ef 0)` }}>
              <strong>{d.score}</strong>
              <span>score</span>
            </div>
            <div>
              <h3>{d.name}</h3>
              <p>
                {d.vehicle} · permis {d.permit}
              </p>
              <ul>
                <li>{d.trips} missions</li>
                <li>{d.harsh} freinages durs</li>
                <li>{d.speeding} excès</li>
                <li>{d.idleH} h ralenti</li>
              </ul>
              <StatusBadge tone={d.score >= 85 ? "green" : d.score >= 75 ? "amber" : "red"}>{d.coaching}</StatusBadge>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export function MissionsView() {
  return (
    <>
      <PageHead kicker="Dispatch" title="Missions & livraisons" subtitle="Affectation camion + chauffeur, documents GESTOCI et rapprochement de volumes." />
      <article className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Réf.</th>
                <th>Véhicule / chauffeur</th>
                <th>Trajet</th>
                <th>Charge</th>
                <th>Avancement</th>
                <th>Statut</th>
              </tr>
            </thead>
            <tbody>
              {missions.map((m) => (
                <tr key={m.ref}>
                  <td>
                    <strong>{m.ref}</strong>
                  </td>
                  <td>
                    {m.truck}
                    <br />
                    <small>{m.driver}</small>
                  </td>
                  <td>
                    {m.from} → {m.to}
                  </td>
                  <td>{m.volume}</td>
                  <td>
                    <div className="mini-progress">
                      <i style={{ width: `${m.progress}%` }} />
                    </div>
                    {m.progress}% · {m.eta}
                  </td>
                  <td>
                    <StatusBadge tone={m.tone}>{m.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export function FuelView() {
  return (
    <>
      <PageHead
        kicker="Pro Vision+"
        title="Contrôle carburant intelligent"
        subtitle="Sondes, cartes carburant et GPS croisés pour détecter siphonnage, pleins fantômes et ralenti."
      />
      <section className="metrics-grid">
        <Metric icon={Fuel} label="Litres utiles 7 j" value="11 930 L" delta="−8 %" note="vs semaine n-1" type="positive" />
        <Metric icon={Activity} label="Anomalies" value="3" delta="−420 L" note="hors station" type="alert" />
        <Metric icon={Clock} label="Coût ralenti" value="210 L" delta="≈ 147 000 F" note="estimé gasoil" type="neutral" />
        <Metric icon={ShieldCheck} label="Rapprochements OK" value="94 %" delta="+6 pts" note="GESTOCI / cuves" type="positive" />
      </section>
      <section className="lower-grid">
        <article className="panel">
          <div className="panel-head">
            <div>
              <h2>Transactions auditées</h2>
              <p>Chaque mouvement est recoupé avec la position</p>
            </div>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Heure</th>
                  <th>Véhicule</th>
                  <th>Type</th>
                  <th>Volume</th>
                  <th>Contrôle</th>
                </tr>
              </thead>
              <tbody>
                {fuelTx.map((t) => (
                  <tr key={t.time + t.vehicle}>
                    <td>{t.time}</td>
                    <td>{t.vehicle}</td>
                    <td>{t.type}</td>
                    <td>
                      <strong>{t.liters} L</strong>
                    </td>
                    <td>
                      <StatusBadge tone={t.tone}>{t.match}</StatusBadge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
        <article className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>Tendance hebdo</h2>
              <p>Orange = litres · rouge = ralenti</p>
            </div>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={fuelTrend} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fuelFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#eda62d" stopOpacity={0.28} />
                    <stop offset="95%" stopColor="#eda62d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#edf0f2" vertical={false} />
                <XAxis dataKey="d" axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#8b949c", fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: "1px solid #e7e9e8", fontSize: 12 }} />
                <Area type="monotone" dataKey="l" stroke="#eda62d" strokeWidth={2.5} fill="url(#fuelFill)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>
      </section>
    </>
  );
}

export function TanksView({ station }: { station: string }) {
  const list = filterSite(tanks, station);
  const pumpList = filterSite(pumps, station);
  return (
    <>
      <PageHead kicker="Pro Fuel" title="Cuves, pompes et jauges" subtitle="Remplace les jauges midi / minuit / ouverture et les index papier." />
      <section className="lower-grid">
        <article className="panel stock-panel">
          <div className="panel-head">
            <div>
              <h2>Niveaux des cuves</h2>
              <p>Sondes + conversion millimètres → litres</p>
            </div>
          </div>
          <div className="tank-list">
            {list.map((tank) => (
              <div className="tank-row" key={tank.name}>
                <div className="mini-tank">
                  <i style={{ height: `${tank.level}%`, background: tank.color }} />
                </div>
                <div className="tank-info">
                  <div>
                    <strong>{tank.name}</strong>
                    <span>{tank.level}%</span>
                  </div>
                  <div className="tank-bar">
                    <i style={{ width: `${tank.level}%`, background: tank.color }} />
                  </div>
                  <small>
                    {tank.volume} <em>/ {tank.capacity}</em>
                  </small>
                </div>
              </div>
            ))}
          </div>
        </article>
        <article className="panel chart-panel">
          <div className="panel-head">
            <div>
              <h2>Évolution du stock station</h2>
              <p>24 dernières heures</p>
            </div>
          </div>
          <div className="chart-wrap tall">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stockChart} margin={{ top: 12, right: 4, left: -20, bottom: 0 }}>
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
      <article className="panel">
        <div className="panel-head">
          <div>
            <h2>Index pompes · journée</h2>
            <p>Saisie pompistes à l’ouverture et à la clôture</p>
          </div>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Pompe</th>
                <th>Produit</th>
                <th>Index ouverture</th>
                <th>Index clôture</th>
                <th>Volume</th>
              </tr>
            </thead>
            <tbody>
              {pumpList.map((p) => (
                <tr key={p.name}>
                  <td>
                    <strong>{p.name}</strong>
                  </td>
                  <td>{p.product}</td>
                  <td>{p.open}</td>
                  <td>{p.close}</td>
                  <td>{p.volume}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export function AlertsView() {
  return (
    <>
      <PageHead kicker="Supervision" title="Centre d’alertes" subtitle="Notifications de suspicion, géofence, vidéo et maintenance." />
      <article className="panel">
        <div className="alerts padded">
          {alerts.map((a) => (
            <div key={a.title} className="alert-block">
              <AlertRow {...a} />
              <em>{a.module}</em>
            </div>
          ))}
        </div>
      </article>
    </>
  );
}

export function GeofenceView() {
  return (
    <>
      <PageHead kicker="Zones" title="Géofences & plages horaires" subtitle="Entrée / sortie, corridors de livraison et usages hors mission." />
      <article className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Zone</th>
                <th>Type</th>
                <th>Véhicules</th>
                <th>Événements</th>
                <th>Horaires</th>
                <th>État</th>
              </tr>
            </thead>
            <tbody>
              {geofences.map((g) => (
                <tr key={g.name}>
                  <td>
                    <strong>{g.name}</strong>
                  </td>
                  <td>{g.type}</td>
                  <td>{g.vehicles}</td>
                  <td>{g.events}</td>
                  <td>{g.hours}</td>
                  <td>
                    <StatusBadge tone="green">{g.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export function ProCamView() {
  return (
    <>
      <PageHead kicker="ProCam" title="Vidéoprotection embarquée" subtitle="Clips liés aux événements de conduite — preuve en cas de litige." />
      <section className="card-grid">
        {camEvents.map((e) => (
          <article className="panel cam-card" key={e.id}>
            <div className="cam-thumb">
              <Camera size={28} />
              <span>12 s · 1080p</span>
            </div>
            <div>
              <StatusBadge tone={e.tone}>{e.risk}</StatusBadge>
              <h3>{e.type}</h3>
              <p>
                {e.driver} · {e.vehicle}
              </p>
              <small>
                {e.id} · {e.time}
              </small>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}

export function MaintenanceView() {
  return (
    <>
      <PageHead kicker="Atelier prédictif" title="Maintenance" subtitle="Ordres de travail déclenchés par km, heures moteur et codes défaut CAN." />
      <article className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>OT</th>
                <th>Véhicule</th>
                <th>Motif</th>
                <th>Échéance</th>
                <th>Compteurs</th>
                <th>Priorité</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((w) => (
                <tr key={w.id}>
                  <td>
                    <strong>{w.id}</strong>
                  </td>
                  <td>{w.vehicle}</td>
                  <td>{w.reason}</td>
                  <td>{w.due}</td>
                  <td>{w.km} km</td>
                  <td>
                    <StatusBadge tone={w.tone}>{w.status}</StatusBadge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
      <section className="metrics-grid" style={{ marginTop: 14 }}>
        <Metric icon={Wrench} label="OT ouverts" value="4" delta="1 urgent" note="atelier Abidjan" type="alert" />
        <Metric icon={Thermometer} label="Pro Temp" value="+3,8 °C" delta="Dans la cible" note="CI-1044-CC" type="positive" />
        <Metric icon={Bell} label="Rappels 7 j" value="2" delta="Vidange + pneus" note="automatiques" type="neutral" />
        <Metric icon={Users} label="Immobilisés" value="0" delta="100 %" note="disponibilité parc" type="positive" />
      </section>
    </>
  );
}

export function ReportsView({ role }: { role: RoleId }) {
  return (
    <>
      <PageHead kicker="Pilotage" title="Rapports" subtitle={`Profil ${role} · exports PDF / CSV pour direction, assurance et GESTOCI.`} />
      <section className="card-grid">
        {reports.map((r) => (
          <article className="panel report-card" key={r.name}>
            <FileText size={22} />
            <h3>{r.name}</h3>
            <p>
              {r.period} · {r.owner}
            </p>
            <button type="button" className="ghost-button">
              Télécharger
            </button>
          </article>
        ))}
      </section>
    </>
  );
}

export function UsersView() {
  return (
    <>
      <PageHead kicker="Droits" title="Utilisateurs & rôles" subtitle="Gérant, adjoint, superviseur, pompiste — identification avant relevé." />
      <article className="panel">
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nom</th>
                <th>Rôle</th>
                <th>Périmètre</th>
                <th>Dernière activité</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.name}>
                  <td>
                    <strong>{u.name}</strong>
                  </td>
                  <td>{u.role}</td>
                  <td>{u.access}</td>
                  <td>{u.last}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </article>
    </>
  );
}

export function SettingsView() {
  return (
    <>
      <PageHead kicker="Configuration" title="Paramètres flotte" subtitle="Seuils d’alerte, unités millimètres / litres, plages horaires, immobilisateur." />
      <section className="settings-grid">
        {[
          ["Seuil siphonnage", "−80 L en 2 min hors géofence station"],
          ["Vitesse citerne", "Alerte > 90 km/h"],
          ["Ralenti", "Alerte > 15 min moteur tournant"],
          ["Jauges auto", "00:00 · 12:00 · 05:30"],
          ["Identification relevé", "Badge obligatoire pompiste / superviseur"],
          ["Pro Temp", "Alerte si hors +2 / +8 °C"],
        ].map(([k, v]) => (
          <article className="panel setting-row" key={k}>
            <MapPin size={16} />
            <div>
              <strong>{k}</strong>
              <p>{v}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
}
