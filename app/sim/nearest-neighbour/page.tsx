// app/sim/nearest-neighbour/page.tsx
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Card,
  Grid,
  Metric,
  Text,
  NumberInput,
  TextInput,
  Button,
  Title,
  BarList,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from "@tremor/react";
import { supabase } from "@/lib/supabase";
import ErrorDisplay from "@/components/ErrorDisplay"; // ⬅️ ensure you have this (shared earlier).

/* ===========================
   Types
   =========================== */
export type Depot = {
  id: string | number;
  code?: string;
  name?: string;
  lat?: number | null;
  lng?: number | null;
};

export type Vendor = {
  id: string | number;
  code?: string;
  name?: string;
  lat?: number | null;
  lng?: number | null;
  load?: number | null;
};

export type DistanceRow = {
  id: string | number;
  depot_id: string | number;
  vendor_id: string | number;
  distance_km?: number | null;
  duration_min?: number | null;
  updated_at?: string | null;
};

type PostgrestErrorLite = { message: string; details?: unknown; code?: string; status?: number };

/* ===========================
   Utilities
   =========================== */
const km = (n?: number | null) => (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 1 });
const minutes = (n?: number | null) => (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 });

function buildNNSequence(
  depotId: Depot["id"],
  vendors: Vendor[],
  dist: DistanceRow[],
): { sequence: Vendor[]; totalKm: number; totalMin: number } {
  const remaining = new Map(vendors.map((v) => [String(v.id), v]));
  const hops: Vendor[] = [];
  let totalKm = 0;
  let totalMin = 0;
  let currentFrom: string | number = depotId;

  while (remaining.size > 0) {
    let best: { v: Vendor; dkm: number; dmin: number } | null = null;

    for (const v of remaining.values()) {
      const row = dist.find(
        (r) => String(r.depot_id) === String(currentFrom) && String(r.vendor_id) === String(v.id),
      );
      if (!row) continue;
      const dkm = row.distance_km ?? Number.POSITIVE_INFINITY;
      const dmin = row.duration_min ?? Number.POSITIVE_INFINITY;
      if (!best || dkm < best.dkm) best = { v, dkm, dmin };
    }

    if (!best) break; // disconnected segment
    hops.push(best.v);
    totalKm += best.dkm;
    totalMin += best.dmin;
    currentFrom = best.v.id;
    remaining.delete(String(best.v.id));
  }

  return { sequence: hops, totalKm, totalMin };
}

/* ===========================
   Data Hook (load + retry)
   =========================== */
function useNearestNeighbourData() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [distances, setDistances] = useState<DistanceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestErrorLite | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [dRes, vRes, distRes] = await Promise.all([
        supabase.from("truck_depots").select<Depot>("id, code, name, lat, lng"),
        supabase.from("truck_vendors").select<Vendor>("id, code, name, lat, lng, load"),
        supabase
          .from("truck_distance_vendor")
          .select<DistanceRow>("id, depot_id, vendor_id, distance_km, duration_min, updated_at"),
      ]);

      if ((dRes as any).error) throw (dRes as any).error;
      if ((vRes as any).error) throw (vRes as any).error;
      if ((distRes as any).error) throw (distRes as any).error;

      setDepots(((dRes as any).data ?? []) as Depot[]);
      setVendors(((vRes as any).data ?? []) as Vendor[]);
      setDistances(((distRes as any).data ?? []) as DistanceRow[]);
    } catch (e: any) {
      // Normalize supabase/postgrest errors gracefully
      setError({
        message: e?.message ?? "Gagal memuat data.",
        code: e?.code,
        status: e?.status,
        details: e,
      });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let alive = true;
    (async () => {
      if (!alive) return;
      await load();
    })();
    return () => {
      alive = false;
    };
  }, [load]);

  return { depots, vendors, distances, loading, error, reload: load };
}

/* ===========================
   Subcomponents
   =========================== */
function KPIBlock({
  depots,
  vendors,
  distances,
}: {
  depots: Depot[];
  vendors: Vendor[];
  distances: DistanceRow[];
}) {
  const lastUpdated = useMemo(() => {
    const ts = distances
      .map((d) => (d.updated_at ? Date.parse(d.updated_at) : 0))
      .filter((n) => Number.isFinite(n))
      .sort((a, b) => b - a)[0];
    return ts ? new Date(ts) : null;
  }, [distances]);

  return (
    <Grid numItemsMd={4} className="gap-4">
      <Card className="bg-pitch-surface border-pitch-border">
        <Text>Depots</Text>
        <Metric>{depots.length.toLocaleString()}</Metric>
      </Card>
      <Card className="bg-pitch-surface border-pitch-border">
        <Text>Vendors</Text>
        <Metric>{vendors.length.toLocaleString()}</Metric>
      </Card>
      <Card className="bg-pitch-surface border-pitch-border">
        <Text>Distance Rows</Text>
        <Metric>{distances.length.toLocaleString()}</Metric>
      </Card>
      <Card className="bg-pitch-surface border-pitch-border">
        <Text>Last Updated</Text>
        <Metric>{lastUpdated ? lastUpdated.toLocaleString() : "–"}</Metric>
      </Card>
    </Grid>
  );
}

function Filters({
  depots,
  depotQuery,
  setDepotQuery,
  selectedDepotId,
  setSelectedDepotId,
  vendorQuery,
  setVendorQuery,
  maxDistanceKm,
  setMaxDistanceKm,
}: {
  depots: Depot[];
  depotQuery: string;
  setDepotQuery: (s: string) => void;
  selectedDepotId: string | number | null;
  setSelectedDepotId: (id: string | number) => void;
  vendorQuery: string;
  setVendorQuery: (s: string) => void;
  maxDistanceKm: number | undefined;
  setMaxDistanceKm: (n: number | undefined) => void;
}) {
  const filteredDepots = useMemo(() => {
    const q = depotQuery.trim().toLowerCase();
    if (!q) return depots;
    return depots.filter((d) => `${d.code ?? ""} ${d.name ?? ""}`.toLowerCase().includes(q));
  }, [depots, depotQuery]);

  return (
    <Card className="bg-pitch-surface border-pitch-border">
      <Title className="text-white">Filters</Title>
      <Grid numItemsMd={4} className="gap-4 mt-4">
        {/* Depot selector */}
        <div>
          <Text className="text-neutral-400 mb-2">Select Depot (type to filter)</Text>
          <TextInput
            placeholder="Search depot by code/name…"
            className="bg-pitch-black border-pitch-border text-white"
            value={depotQuery}
            onChange={(e) => setDepotQuery(e.target.value)}
          />
          <div className="mt-2 flex gap-2 flex-wrap">
            {filteredDepots.slice(0, 8).map((d) => {
              const isActive = String(selectedDepotId) === String(d.id);
              return (
                <Button
                  key={String(d.id)}
                  size="xs"
                  className={isActive ? "bg-white text-black" : "bg-pitch-black border-pitch-border text-white"}
                  onClick={() => setSelectedDepotId(d.id)}
                >
                  {d.code || d.name || d.id}
                </Button>
              );
            })}
          </div>
        </div>

        {/* Vendor search */}
        <div>
          <Text className="text-neutral-400 mb-2">Vendor Search</Text>
          <TextInput
            placeholder="Search vendor by code/name…"
            className="bg-pitch-black border-pitch-border text-white"
            value={vendorQuery}
            onChange={(e) => setVendorQuery(e.target.value)}
          />
        </div>

        {/* Max distance */}
        <div>
          <Text className="text-neutral-400 mb-2">Max Distance (km)</Text>
          <NumberInput
            placeholder="e.g., 300"
            className="bg-pitch-black border-pitch-border text-white"
            value={typeof maxDistanceKm === "number" ? maxDistanceKm : undefined}
            onValueChange={(v) => setMaxDistanceKm(typeof v === "number" ? v : undefined)}
            enableStepper={false}
          />
        </div>

        {/* Clear */}
        <div className="flex items-end">
          <Button
            className="bg-pitch-black border-pitch-border text-white"
            onClick={() => {
              setVendorQuery("");
              setDepotQuery("");
              setMaxDistanceKm(undefined);
            }}
          >
            Clear Filters
          </Button>
        </div>
      </Grid>
    </Card>
  );
}

function NNPreview({
  loading,
  error,
  nnPreview,
  onRetry,
}: {
  loading: boolean;
  error: PostgrestErrorLite | null;
  nnPreview: { sequence: Vendor[]; totalKm: number; totalMin: number } | null;
  onRetry: () => void;
}) {
  return (
    <Card className="bg-pitch-surface border-pitch-border">
      <Title className="text-white">Nearest Neighbour Preview</Title>
      <Text className="text-neutral-400 mb-2">Purely client-side for visualization; nothing is written back.</Text>

      {loading ? (
        <Text>Loading…</Text>
      ) : error ? (
        <ErrorDisplay
          error={error}
          onRetry={onRetry}
          hint="Gagal memuat data untuk preview NN. Periksa RLS, kolom select(), atau koneksi jaringan."
        />
      ) : nnPreview ? (
        <div className="mt-4">
          <div className="flex gap-4">
            <Card className="bg-pitch-black border-pitch-border">
              <Text>Total Distance</Text>
              <Metric>{km(nnPreview.totalKm)} km</Metric>
            </Card>
            <Card className="bg-pitch-black border-pitch-border">
              <Text>Total Duration</Text>
              <Metric>{minutes(nnPreview.totalMin)} min</Metric>
            </Card>
          </div>

          <Table className="mt-4">
            <TableHead>
              <TableRow>
                <TableHeaderCell>#</TableHeaderCell>
                <TableHeaderCell>Vendor</TableHeaderCell>
                <TableHeaderCell>Load</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {nnPreview.sequence.map((v, i) => (
                <TableRow key={String(v.id)}>
                  <TableCell>{i + 1}</TableCell>
                  <TableCell>{v.code || v.name || v.id}</TableCell>
                  <TableCell>{v.load ?? "–"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <Text>No reachable vendors from selected depot (based on current distance table).</Text>
      )}
    </Card>
  );
}

function TopNearVendors({
  distances,
  vendors,
  selectedDepotId,
  maxDistanceKm,
}: {
  distances: DistanceRow[];
  vendors: Vendor[];
  selectedDepotId: string | number | null;
  maxDistanceKm: number | undefined;
}) {
  const listData = useMemo(() => {
    return distances
      .filter((r) => selectedDepotId && String(r.depot_id) === String(selectedDepotId))
      .filter((r) => maxDistanceKm == null || (r.distance_km ?? Infinity) <= maxDistanceKm)
      .sort((a, b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity))
      .slice(0, 20)
      .map((r) => {
        const v = vendors.find((v) => String(v.id) === String(r.vendor_id));
        return {
          name: v?.code || v?.name || String(r.vendor_id),
          value: Math.round(r.distance_km ?? 0),
        };
      });
  }, [distances, vendors, selectedDepotId, maxDistanceKm]);

  return (
    <Card className="bg-pitch-surface border-pitch-border">
      <Title className="text-white">Top Near Vendors (by km)</Title>
      <Text className="text-neutral-400">From selected depot within max-distance filter if set.</Text>
      <div className="mt-4">
        <BarList data={listData} />
      </div>
    </Card>
  );
}

function DistanceTable({
  distances,
  vendors,
  selectedDepotId,
  maxDistanceKm,
}: {
  distances: DistanceRow[];
  vendors: Vendor[];
  selectedDepotId: string | number | null;
  maxDistanceKm: number | undefined;
}) {
  const rows = useMemo(() => {
    return distances
      .filter((r) => selectedDepotId && String(r.depot_id) === String(selectedDepotId))
      .filter((r) => maxDistanceKm == null || (r.distance_km ?? Infinity) <= maxDistanceKm)
      .sort((a, b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity))
      .slice(0, 200);
  }, [distances, selectedDepotId, maxDistanceKm]);

  return (
    <Card className="bg-pitch-surface border-pitch-border">
      <Title className="text-white">Distance / Duration Rows</Title>
      <Text className="text-neutral-400">Rows filtered by selected depot and optional max distance.</Text>
      <Table className="mt-4">
        <TableHead>
          <TableRow>
            <TableHeaderCell>Vendor</TableHeaderCell>
            <TableHeaderCell>Distance (km)</TableHeaderCell>
            <TableHeaderCell>Duration (min)</TableHeaderCell>
            <TableHeaderCell>Updated</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((r) => {
            const v = vendors.find((v) => String(v.id) === String(r.vendor_id));
            return (
              <TableRow key={String(r.id)}>
                <TableCell>{v?.code || v?.name || String(r.vendor_id)}</TableCell>
                <TableCell>{km(r.distance_km)}</TableCell>
                <TableCell>{minutes(r.duration_min)}</TableCell>
                <TableCell>{r.updated_at ? new Date(r.updated_at).toLocaleString() : "–"}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Card>
  );
}

/* ===========================
   Page
   =========================== */
export default function NearestNeighbourLivePage() {
  const { depots, vendors, distances, loading, error, reload } = useNearestNeighbourData();

  // UI state
  const [depotQuery, setDepotQuery] = useState("");
  const [vendorQuery, setVendorQuery] = useState("");
  const [maxDistanceKm, setMaxDistanceKm] = useState<number | undefined>(undefined);
  const [selectedDepotId, setSelectedDepotId] = useState<string | number | null>(null);

  // Initialize selected depot when data arrives
  useEffect(() => {
    if (!selectedDepotId && depots.length > 0) {
      setSelectedDepotId(depots[0].id);
    }
  }, [depots, selectedDepotId]);

  // Filtered vendors for NN (respect depot graph & vendor text filter)
  const filteredVendorsForNN = useMemo(() => {
    if (!selectedDepotId) return [];
    const reachable = new Set(
      distances.filter((r) => String(r.depot_id) === String(selectedDepotId)).map((r) => String(r.vendor_id)),
    );
    const base = vendors.filter((v) => reachable.has(String(v.id)));
    const q = vendorQuery.trim().toLowerCase();
    if (!q) return base;
    return base.filter((v) => `${v.code ?? ""} ${v.name ?? ""}`.toLowerCase().includes(q));
  }, [vendors, distances, selectedDepotId, vendorQuery]);

  const nnPreview = useMemo(() => {
    if (!selectedDepotId || filteredVendorsForNN.length === 0) return null;
    return buildNNSequence(selectedDepotId, filteredVendorsForNN, distances);
  }, [selectedDepotId, filteredVendorsForNN, distances]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold text-white">Nearest Neighbour (Live)</h1>
        <Text className="mt-2 text-neutral-400">
          Backed by Supabase: depots, vendors, and distance/duration are loaded live from your truck_* tables.
        </Text>
      </header>

      <KPIBlock depots={depots} vendors={vendors} distances={distances} />

      <Filters
        depots={depots}
        depotQuery={depotQuery}
        setDepotQuery={setDepotQuery}
        selectedDepotId={selectedDepotId}
        setSelectedDepotId={setSelectedDepotId}
        vendorQuery={vendorQuery}
        setVendorQuery={setVendorQuery}
        maxDistanceKm={maxDistanceKm}
        setMaxDistanceKm={setMaxDistanceKm}
      />

      <Grid numItemsMd={2} className="gap-4">
        <NNPreview loading={loading} error={error} nnPreview={nnPreview} onRetry={reload} />
        <TopNearVendors
          distances={distances}
          vendors={vendors}
          selectedDepotId={selectedDepotId}
          maxDistanceKm={maxDistanceKm}
        />
      </Grid>

      <DistanceTable
        distances={distances}
        vendors={vendors}
        selectedDepotId={selectedDepotId}
        maxDistanceKm={maxDistanceKm}
      />

      <Card className="bg-pitch-black border-pitch-border">
        <Text className="text-neutral-400">
          Assumed tables: <code>truck_depots(id, code, name, lat, lng)</code>,{" "}
          <code>truck_vendors(id, code, name, lat, lng, load)</code>, dan{" "}
          <code>truck_distance_vendor(id, depot_id, vendor_id, distance_km, duration_min, updated_at)</code>. Jika nama
          kolom berbeda, sesuaikan <code>select()</code> dan tipe di atas.
        </Text>
        <Text className="text-neutral-400 mt-2">
          NN preview mengasumsikan hop berikutnya menggunakan baris di mana node sebelumnya dipakai sebagai{" "}
          <code>depot_id</code>. Untuk matriks penuh (vendor→vendor), siapkan tabel/kolom tambahan atau unify skema
          jarak.
        </Text>
      </Card>
    </div>
  );
}