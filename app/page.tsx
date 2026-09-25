"use client";

import {
  AlertTriangle,
  Bell,
  Building2,
  Camera,
  ChevronDown,
  CircleHelp,
  FileText,
  Fuel,
  LayoutDashboard,
  Map,
  Menu,
  MoreHorizontal,
  Route,
  Search,
  Settings,
  Shield,
  Truck,
  Users,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { AlertRow, Logo } from "@/components/ui";
import {
  AlertsView,
  DriversView,
  FleetView,
  FuelView,
  GeofenceView,
  MaintenanceView,
  MapView,
  MissionsView,
  OverviewView,
  ProCamView,
  ReportsView,
  SettingsView,
  TanksView,
  UsersView,
} from "@/components/modules";
import { alerts, navGroups, roles, stations, vehicles, type RoleId, type ViewId } from "@/lib/data";

const icons: Record<ViewId, LucideIcon> = {
  overview: LayoutDashboard,
  map: Map,
  fleet: Truck,
  drivers: Users,
  missions: Route,
  fuel: Fuel,
  tanks: Fuel,
  alerts: AlertTriangle,
  geofences: Shield,
  procam: Camera,
  maintenance: Wrench,
  reports: FileText,
  users: Users,
  settings: Settings,
};

const pompisteViews: ViewId[] = ["overview", "tanks", "alerts"];
const superviseurViews: ViewId[] = [
  "overview",
  "map",
  "fleet",
  "missions",
  "fuel",
  "tanks",
  "alerts",
  "geofences",
  "maintenance",
  "reports",
  "settings",
];

function allowedViews(role: RoleId): ViewId[] | null {
  if (role === "pompiste") return pompisteViews;
  if (role === "superviseur") return superviseurViews;
  return null;
}

export default function Home() {
  const [active, setActive] = useState<ViewId>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [stationOpen, setStationOpen] = useState(false);
  const [roleOpen, setRoleOpen] = useState(false);
  const [station, setStation] = useState("all");
  const [role, setRole] = useState<RoleId>("gerant");
  const [query, setQuery] = useState("");

  const currentRole = roles.find((r) => r.id === role)!;
  const currentStation = stations.find((s) => s.id === station)!;
  const allowed = allowedViews(role);

  const groups = useMemo(() => {
    return navGroups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          if (item.roles && !item.roles.includes(role)) return false;
          if (allowed && !allowed.includes(item.id)) return false;
          return true;
        }),
      }))
      .filter((g) => g.items.length > 0);
  }, [role, allowed]);

  const searchHits = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    return vehicles.filter((v) => `${v.id} ${v.driver} ${v.type}`.toLowerCase().includes(q)).slice(0, 5);
  }, [query]);

  const selectNav = (id: ViewId) => {
    setActive(id);
    setSidebarOpen(false);
  };

  const view = () => {
    switch (active) {
      case "overview":
        return <OverviewView station={station} onOpen={(id) => selectNav(id as ViewId)} />;
      case "map":
        return <MapView station={station} />;
      case "fleet":
        return <FleetView station={station} />;
      case "drivers":
        return <DriversView />;
      case "missions":
        return <MissionsView />;
      case "fuel":
        return <FuelView />;
      case "tanks":
        return <TanksView station={station} />;
      case "alerts":
        return <AlertsView />;
      case "geofences":
        return <GeofenceView />;
      case "procam":
        return <ProCamView />;
      case "maintenance":
        return <MaintenanceView />;
      case "reports":
        return <ReportsView role={role} />;
      case "users":
        return <UsersView />;
      case "settings":
        return <SettingsView />;
      default:
        return null;
    }
  };

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button type="button" aria-label="Fermer le menu" className="mobile-overlay" onClick={() => setSidebarOpen(false)} />
      )}
      <aside className={sidebarOpen ? "sidebar open" : "sidebar"}>
        <div className="sidebar-top">
          <Logo />
          <button type="button" className="mobile-close" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>
        <div className="product-name">
          <span>
            <Truck size={17} />
          </span>
          <div>
            <strong>SUD Fleet OS</strong>
            <small>Flotte intelligente</small>
          </div>
        </div>
        <nav>
          {groups.map((group) => (
            <div key={group.title}>
              <p>{group.title.toUpperCase()}</p>
              {group.items.map((item) => {
                const Icon = icons[item.id];
                return (
                  <button type="button" className={active === item.id ? "active" : ""} onClick={() => selectNav(item.id)} key={item.id}>
                    <Icon size={19} />
                    <span>{item.label}</span>
                    {item.badge ? <em>{item.badge}</em> : null}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div className="support-card">
          <CircleHelp size={21} />
          <strong>Besoin d’aide ?</strong>
          <p>Support terrain Côte d’Ivoire, 24/7.</p>
          <button type="button">Contacter le support</button>
        </div>
        <div className="sidebar-user">
          <span>{currentRole.initials}</span>
          <div>
            <strong>{currentRole.label}</strong>
            <small>{currentRole.title}</small>
          </div>
          <MoreHorizontal size={18} />
        </div>
      </aside>

      <main>
        <header>
          <button type="button" className="menu-button" onClick={() => setSidebarOpen(true)}>
            <Menu size={22} />
          </button>
          <div className="header-selects">
            <button type="button" className="station-select" onClick={() => { setStationOpen(!stationOpen); setRoleOpen(false); }}>
              <span>
                <Building2 size={17} />
              </span>
              <div>
                <small>PÉRIMÈTRE</small>
                <strong>
                  {currentStation.name} · {currentStation.city}
                </strong>
              </div>
              <ChevronDown size={16} />
            </button>
            {stationOpen && (
              <div className="dropdown">
                {stations.map((s) => (
                  <button
                    type="button"
                    key={s.id}
                    onClick={() => {
                      setStation(s.id);
                      setStationOpen(false);
                    }}
                  >
                    {s.name}
                    <small>{s.city}</small>
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="header-right">
            <label className="search">
              <Search size={17} />
              <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Immat, chauffeur..." />
              <kbd>⌘ K</kbd>
              {searchHits.length > 0 && (
                <div className="search-results">
                  {searchHits.map((v) => (
                    <button
                      type="button"
                      key={v.id}
                      onClick={() => {
                        setQuery("");
                        selectNav("fleet");
                      }}
                    >
                      <strong>{v.id}</strong>
                      <span>{v.driver}</span>
                    </button>
                  ))}
                </div>
              )}
            </label>
            <button type="button" className="ghost-button role-chip" onClick={() => { setRoleOpen(!roleOpen); setStationOpen(false); }}>
              {currentRole.initials} · {role}
            </button>
            {roleOpen && (
              <div className="dropdown right">
                {roles.map((r) => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => {
                      setRole(r.id);
                      setRoleOpen(false);
                      if (r.id === "pompiste") setActive("tanks");
                    }}
                  >
                    {r.label}
                    <small>{r.title}</small>
                  </button>
                ))}
              </div>
            )}
            <button type="button" className="notification-button" onClick={() => setNotificationsOpen(!notificationsOpen)}>
              <Bell size={19} />
              <i />
            </button>
            <div className="mini-user">{currentRole.initials}</div>
          </div>
          {notificationsOpen && (
            <div className="notification-popover">
              <div>
                <strong>Notifications</strong>
                <button type="button" onClick={() => setNotificationsOpen(false)}>
                  <X size={16} />
                </button>
              </div>
              {alerts.slice(0, 3).map((a) => (
                <AlertRow key={a.title} {...a} />
              ))}
            </div>
          )}
        </header>
        <div className="content">{view()}</div>
      </main>
    </div>
  );
}
