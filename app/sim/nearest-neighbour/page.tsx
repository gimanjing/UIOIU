// app/route/nearest-neighbour/page.tsx (or any route you prefer)
"use client";

import { useEffect, useMemo, useState } from "react";
import type { PostgrestError } from "@supabase/supabase-js";

// Tremor UI
import { Card, Grid, Metric, Text, NumberInput, TextInput, Button, Title, BarList, Table, TableBody, TableCell, TableHead, CellCell, TableRow } from "@tremor/react";

// If you already have a Supabase client (e.g., '@/lib/supabase'), prefer that import.
// Otherwise, uncomment the next 5 lines and ensure env vars are exposed to the browser.
// import { createClient } from "@supabase/supabase-js";
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL!;
// const supabaseAnon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY!;
// export const supabase = createClient(supabaseUrl, supabaseAnon);
import { supabase } from "@/lib/supabase";

// -----------------------------
// Types (adjust field names if your schema differs)
// -----------------------------
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
  load?: number | null; // pallets, units, etc.
};

export type DistanceRow = {
  id: string | number;
  depot_id: string | number;
  vendor_id: string | number;
  distance_km?: number | null; // numeric in km
  duration_min?: number | null; // numeric in minutes
  updated_at?: string | null;
};

// -----------------------------
// Utilities
// -----------------------------
function km(n?: number | null) {
  return (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 1 });
}

function minutes(n?: number | null) {
  return (n ?? 0).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function safeDelta(a = 0, b = 0): DeltaType {
  if (a === b) return "unchanged";
  return a < b ? "decrease" : "increase";
}

// Greedy Nearest Neighbour (purely client-side preview)
function buildNNSequence(
  depotId: Depot["id"],
  vendors: Vendor[],
  dist: DistanceRow[],
): { sequence: Vendor[]; totalKm: number; totalMin: number } {
  const remaining = new Map(vendors.map(v => [String(v.id), v]));
  const hops: Vendor[] = [];
  let totalKm = 0;
  let totalMin = 0;
  let currentFrom: string | number = depotId;

  while (remaining.size > 0) {
    // find closest next vendor from currentFrom
    let best: { v: Vendor; dkm: number; dmin: number } | null = null;
    for (const v of remaining.values()) {
      const row = dist.find(r => String(r.depot_id) === String(currentFrom) && String(r.vendor_id) === String(v.id));
      if (!row) continue;
      const dkm = row.distance_km ?? Number.POSITIVE_INFINITY;
      const dmin = row.duration_min ?? Number.POSITIVE_INFINITY;
      if (!best || dkm < best.dkm) best = { v, dkm, dmin };
    }
    if (!best) break; // disconnected data; give up gracefully
    hops.push(best.v);
    totalKm += best.dkm;
    totalMin += best.dmin;
    currentFrom = best.v.id; // treat vendor as next 'from' (requires rows where depot_id can be a vendor too — see note below)
    remaining.delete(String(best.v.id));
  }

  return { sequence: hops, totalKm, totalMin };
}

// -----------------------------
// Component
// -----------------------------
export default function NearestNeighbourLivePage() {
  const [depots, setDepots] = useState<Depot[]>([]);
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [distances, setDistances] = useState<DistanceRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<PostgrestError | null>(null);

  // UI state
  const [depotQuery, setDepotQuery] = useState("");
  const [vendorQuery, setVendorQuery] = useState("");
  const [maxDistanceKm, setMaxDistanceKm] = useState<number | undefined>(undefined);
  const [selectedDepotId, setSelectedDepotId] = useState<string | number | null>(null);

  // Load Supabase data
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setLoading(true);
        setError(null);

        const [depotsRes, vendorsRes, distRes] = await Promise.all([
          supabase.from("truck_depots").select("id, code, name, lat, lng"),
          supabase.from("truck_vendors").select("id, code, name, lat, lng, load"),
          supabase
            .from("truck_distance_vendor")
            .select("id, depot_id, vendor_id, distance_km, duration_min, updated_at"),
        ]);

        if (!isMounted) return;
        if (depotsRes.error) throw depotsRes.error;
        if (vendorsRes.error) throw vendorsRes.error;
        if (distRes.error) throw distRes.error;

        setDepots(depotsRes.data ?? []);
        setVendors(vendorsRes.data ?? []);
        setDistances(distRes.data ?? []);

        if ((depotsRes.data?.length ?? 0) > 0) {
          setSelectedDepotId(depotsRes.data![0].id);
        }
      } catch (e: any) {
        if (!isMounted) return;
        setError(e);
      } finally {
        if (isMounted) setLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const filteredDepots = useMemo(() => {
    const q = depotQuery.trim().toLowerCase();
    if (!q) return depots;
    return depots.filter(d => `${d.code ?? ""} ${d.name ?? ""}`.toLowerCase().includes(q));
  }, [depots, depotQuery]);

  const filteredVendors = useMemo(() => {
    const q = vendorQuery.trim().toLowerCase();
    let base = vendors;
    if (selectedDepotId && maxDistanceKm != null) {
      const closeVendorIds = new Set(
        distances
          .filter(r => String(r.depot_id) === String(selectedDepotId) && (r.distance_km ?? Infinity) <= maxDistanceKm)
          .map(r => String(r.vendor_id))
      );
      base = base.filter(v => closeVendorIds.has(String(v.id)));
    }
    if (!q) return base;
    return base.filter(v => `${v.code ?? ""} ${v.name ?? ""}`.toLowerCase().includes(q));
  }, [vendors, vendorQuery, distances, selectedDepotId, maxDistanceKm]);

  const lastUpdated = useMemo(() => {
    const ts = distances
      .map(d => (d.updated_at ? Date.parse(d.updated_at) : 0))
      .filter(n => Number.isFinite(n))
      .sort((a, b) => b - a)[0];
    return ts ? new Date(ts) : null;
  }, [distances]);

  // Build a client-side NN preview (uses rows where `depot_id` equals the current node; for a full matrix you may store vendor->vendor rows in the same table or another one)
  const nnPreview = useMemo(() => {
    if (!selectedDepotId) return null;
    // Use only entries that start from the selected depot as the initial hop; subsequent hops will attempt to use rows where `depot_id` equals prior vendor id (if present)
    const reachable = new Set(
      distances.filter(r => String(r.depot_id) === String(selectedDepotId)).map(r => String(r.vendor_id))
    );
    const vend = vendors.filter(v => reachable.has(String(v.id)));
    if (vend.length === 0) return null;
    return buildNNSequence(selectedDepotId, vend, distances);
  }, [selectedDepotId, vendors, distances]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white">Nearest Neighbour (Live)</h1>
        <Text className="mt-2 text-neutral-400">
          Backed by Supabase: depots, vendors, and distance/duration are loaded live from your truck_* tables.
        </Text>
      </div>

      {/* Top KPI cards */}
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

      {/* Controls */}
      <Card className="bg-pitch-surface border-pitch-border">
        <Title className="text-white">Filters</Title>
        <Grid numItemsMd={4} className="gap-4 mt-4">
          <div>
            <Text className="text-neutral-400 mb-2">Select Depot (type to filter)</Text>
            <TextInput
              placeholder="Search depot by code/name…"
              className="bg-pitch-black border-pitch-border text-white"
              value={depotQuery}
              onChange={e => setDepotQuery(e.target.value)}
            />
            <div className="mt-2 flex gap-2 flex-wrap">
              {filteredDepots.slice(0, 8).map(d => (
                <Button
                  key={String(d.id)}
                  size="xs"
                  variant={String(selectedDepotId) === String(d.id) ? "primary" : "secondary"}
                  onClick={() => setSelectedDepotId(d.id)}
                >
                  {d.code || d.name || d.id}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <Text className="text-neutral-400 mb-2">Vendor Search</Text>
            <TextInput
              placeholder="Search vendor by code/name…"
              className="bg-pitch-black border-pitch-border text-white"
              value={vendorQuery}
              onChange={e => setVendorQuery(e.target.value)}
            />
          </div>

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

          <div className="flex items-end">
            <Button  onClick={() => { setVendorQuery(""); setDepotQuery(""); setMaxDistanceKm(undefined); }}>
              Clear Filters
            </Button>
          </div>
        </Grid>
      </Card>

      {/* NN Preview + key stats */}
      <Grid numItemsMd={2} className="gap-4">
        <Card className="bg-pitch-surface border-pitch-border">
          <Title className="text-white">Nearest Neighbour Preview</Title>
          <Text className="text-neutral-400 mb-2">Purely client-side for visualization; nothing is written back.</Text>

          {loading ? (
            <Text>Loading…</Text>
          ) : error ? (
            <Text className="text-red-400">{error.message}</Text>
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
         <TableHeaderCelableHeaderCell>
                    <Tell>Load</TableHeaderC            </TableRow>
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

        <Card className="bg-pitch-surface border-pitch-border">
          <Title className="text-white">Top Near Vendors (by km)</Title>
          <Text className="text-neutral-400">From selected depot within max-distance filter if set.</Text>
          <div className="mt-4">
            <BarList
              data={(distances
                .filter(r => selectedDepotId && String(r.depot_id) === String(selectedDepotId))
                .filter(r => (maxDistanceKm == null) || ((r.distance_km ?? Infinity) <= maxDistanceKm))
                .sort((a,b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity))
                .slice(0, 20)
                .map(r => {
                  const v = vendors.find(v => String(v.id) === String(r.vendor_id));
                  return {
                    name: v?.code || v?.name || String(r.vendor_id),
                    value: Math.round(r.distance_km ?? 0),
                  };
                }))}
            />
          </div>
        </Card>
      </Grid>

      {/* Raw distance rows (scoped) */}
      <Card className="bg-pitch-surface border-pitch-border">
        <Title className="text-white">Distance / Duration Rows</Title>
        <Text className="text-neutral-400">Rows filtered by selected depot and optional max distance.</Text>
        <Table className="mt-4">
          <TableHead>
            <TableRow>
              <TableHeaderCell>Vendor<rCell>
              <Tall>Distance (km)</TableHeaderCel      <TableHeaderCell>DurationleHeaderCell>
              <Tabl>Updated</TableHeaderCell>
    ableRow>
          </TableHead>
TableBody>
            {d            .filter(r => selectedDepotId && String(r.depot_id) === String(selectedDepotId))
              .filter(r => (maxDistanceKm == null) || ((r.distance_km ?? Infinity) <= maxDistanceKm))
              .sort((a,b) => (a.distance_km ?? Infinity) - (b.distance_km ?? Infinity))
              .slice(0, 200)
              .map(r => {
                const v = vendors.find(v => String(v.id) === String(r.vendor_id));
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

      {/* Notes / schema expectations */}
      <Card className="bg-pitch-black border-pitch-border">
        <Text className="text-neutral-400">
          Assumed tables: <code>truck_depots(id, code, name, lat, lng)</code>, <code>truck_vendors(id, code, name, lat, lng, load)</code>,
          and <code>truck_distance_vendor(id, depot_id, vendor_id, distance_km, duration_min, updated_at)</code>.
          If your field names differ, adjust the <code>select()</code> columns and the type definitions above.
        </Text>
        <Text className="text-neutral-400 mt-2">
          The NN preview expects distance rows where subsequent hops use the previous node as <code>depot_id</code>.
          If you store a full matrix (e.g., vendor→vendor distances), you can unify the schema or join a second table for inter-vendor hops.
        </Text>
      </Card>
    </div>
  );
}
