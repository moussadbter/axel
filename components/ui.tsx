import { AlertTriangle, ChevronDown, Droplets, MoreHorizontal } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { Tone } from "@/lib/data";

export function Logo() {
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

export function StatusBadge({ tone, children }: { tone: Tone; children: React.ReactNode }) {
  return (
    <span className={`status ${tone}`}>
      <i />
      {children}
    </span>
  );
}

export function PageHead({
  kicker,
  title,
  subtitle,
  actions,
}: {
  kicker: string;
  title: string;
  subtitle: string;
  actions?: React.ReactNode;
}) {
  return (
    <section className="hero-row">
      <div>
        <div className="eyebrow">{kicker}</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {actions && <div className="hero-actions">{actions}</div>}
    </section>
  );
}

export function Metric({
  icon: Icon,
  label,
  value,
  delta,
  note,
  type,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  delta: string;
  note: string;
  type: string;
}) {
  return (
    <article className={`metric-card ${type}`}>
      <div className="metric-top">
        <span className="metric-icon">
          <Icon size={20} />
        </span>
        <button type="button" aria-label="Plus">
          <MoreHorizontal size={18} />
        </button>
      </div>
      <p>{label}</p>
      <strong>{value}</strong>
      <small>
        <b>{delta}</b> {note}
      </small>
    </article>
  );
}

export function AlertRow({
  level,
  title,
  desc,
  time,
}: {
  level: string;
  title: string;
  desc: string;
  time: string;
}) {
  return (
    <div className={`alert-row ${level}`}>
      <span className="alert-icon">
        <AlertTriangle size={17} />
      </span>
      <div>
        <strong>{title}</strong>
        <p>{desc}</p>
        <small>{time}</small>
      </div>
      <ChevronDown className="alert-chevron" size={16} />
    </div>
  );
}

export function Tanker({ levels = [96, 94, 91, 92, 93, 94, 93] }: { levels?: number[] }) {
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
        <span>{levels.length} compartiments</span>
        <span>
          <i /> Niveau mesuré
        </span>
      </div>
    </div>
  );
}

export function EmptyHint() {
  return (
    <div className="empty-hint">
      <Droplets size={16} /> Aucun résultat pour cette station / ce rôle.
    </div>
  );
}
