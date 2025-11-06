*** a/app/sim/nearest-neighbour/page.tsx
--- b/app/sim/nearest-neighbour/page.tsx
@@
-"use client";
-
-import { useEffect, useMemo, useState } from "react";
-import type { PostgrestError } from "@supabase/supabase-js";
-
-// Tremor UI
-import { Card, Grid, Metric, Text, NumberInput, TextInput, Button, Title, BarList, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, BadgeDelta, DeltaType } from "@tremor/react";
-// import { supabase } from "@/lib/supabase";
+// app/sim/nearest-neighbour/page.tsx
+"use client";
+
+import { useEffect, useMemo, useState } from "react";
+
+import {
+  Card,
+  Grid,
+  Metric,
+  Text,
+  NumberInput,
+  TextInput,
+  Button,
+  Title,
+  BarList,
+  Table,
+  TableBody,
+  TableCell,
+  TableHead,
+  TableHeaderCell,
+  TableRow,
+} from "@tremor/react";
+import { supabase } from "@/lib/supabase";
@@
-export type DistanceRow = {
+export type DistanceRow = {
   id: string | number;
   depot_id: string | number;
   vendor_id: string | number;
   distance_km?: number | null; // numeric in km
   duration_min?: number | null; // numeric in minutes
   updated_at?: string | null;
 };
+
+type PostgrestError = { message: string };
@@
-            <TextInput
+            <TextInput
               placeholder="Search depot by code/name…"
               className="bg-pitch-black border-pitch-border text-white"
               value={depotQuery}
               onChange={e => setDepotQuery(e.target.value)}
             />
@@
-                <Button
+                <Button
                   key={String(d.id)}
                   size="xs"
-                  variant={String(selectedDepotId) === String(d.id) ? "primary" : "secondary"}
+                  className={String(selectedDepotId) === String(d.id) ? "bg-white text-black" : "bg-pitch-black border-pitch-border text-white"}
                   onClick={() => setSelectedDepotId(d.id)}
                 >
                   {d.code || d.name || d.id}
                 </Button>
               ))}
@@
-            <NumberInput
+            <NumberInput
               placeholder="e.g., 300"
               className="bg-pitch-black border-pitch-border text-white"
-              value={maxDistanceKm as any}
-              onValueChange={(v) => setMaxDistanceKm(v as unknown as number)}
+              value={typeof maxDistanceKm === "number" ? maxDistanceKm : undefined}
+              onValueChange={(v) => setMaxDistanceKm(typeof v === "number" ? v : undefined)}
               enableStepper={false}
             />
@@
-            <Button variant="secondary" onClick={() => { setVendorQuery(""); setDepotQuery(""); setMaxDistanceKm(undefined); }}>
+            <Button className="bg-pitch-black border-pitch-border text-white" onClick={() => { setVendorQuery(""); setDepotQuery(""); setMaxDistanceKm(undefined); }}>
               Clear Filters
             </Button>
@@
-                <TableHead>
-                  <TableRow>
-                    <TableHeader>#</TableHeader>
-                    <TableHeader>Vendor</TableHeader>
-                    <TableHeader>Load</TableHeader>
-                  </TableRow>
-                </TableHead>
+                <TableHead>
+                  <TableRow>
+                    <TableHeaderCell>#</TableHeaderCell>
+                    <TableHeaderCell>Vendor</TableHeaderCell>
+                    <TableHeaderCell>Load</TableHeaderCell>
+                  </TableRow>
+                </TableHead>
@@
-          <TableHead>
-            <TableRow>
-              <TableHeader>Vendor</TableHeader>
-              <TableHeader>Distance (km)</TableHeader>
-              <TableHeader>Duration (min)</TableHeader>
-              <TableHeader>Updated</TableHeader>
-            </TableRow>
-          </TableHead>
+          <TableHead>
+            <TableRow>
+              <TableHeaderCell>Vendor</TableHeaderCell>
+              <TableHeaderCell>Distance (km)</TableHeaderCell>
+              <TableHeaderCell>Duration (min)</TableHeaderCell>
+              <TableHeaderCell>Updated</TableHeaderCell>
+            </TableRow>
+          </TableHead>
