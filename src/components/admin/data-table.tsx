"use client";

import * as React from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";

type Shipment = {
  id: string;
  route: string;
  status: "open" | "matched" | "in_transit";
  price: number;
};

const data: Shipment[] = [
  { id: "TR-1001", route: "Hamburg → Berlin", status: "open", price: 1200 },
  { id: "TR-1002", route: "Köln → München", status: "matched", price: 980 },
  { id: "TR-1003", route: "Paris → Frankfurt", status: "in_transit", price: 1500 },
];

const columns: ColumnDef<Shipment>[] = [
  { accessorKey: "id", header: "ID" },
  { accessorKey: "route", header: "Route" },
  { accessorKey: "status", header: "Status" },
  { accessorKey: "price", header: "Price (€)" },
];

/* eslint-disable-next-line react-hooks/incompatible-library */
export function AdminDataTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div className="glass-card p-4">
      <table className="w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((hg) => (
            <tr key={hg.id}>
              {hg.headers.map((header) => (
                <th key={header.id} className="px-2 py-2 text-left">
                  {header.isPlaceholder ? null : (
                    <button onClick={header.column.getToggleSortingHandler()} className="font-semibold">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </button>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className="border-t border-white/10">
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-2 py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 flex gap-2">
        <Button size="sm" variant="glass" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
          Prev
        </Button>
        <Button size="sm" variant="glass" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
          Next
        </Button>
      </div>
    </div>
  );
}
