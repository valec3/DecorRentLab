"use client";

import { Categoria } from "@/types";
import { DataTable } from "../../shared/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { MoreHorizontal, ExternalLink } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const columns: ColumnDef<Categoria>[] = [
  {
    accessorKey: "nombre",
    header: "Categoría",
    cell: ({ row }) => (
      <div className="font-semibold text-carbon">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: "URL Path (Slug)",
    cell: ({ row }) => (
      <div className="text-xs text-gris-calido bg-crema-oscuro/50 px-2 py-1 rounded inline-block">
        /{row.getValue("slug")}
      </div>
    ),
  },
  {
    accessorKey: "descripcion",
    header: "Descripción",
    cell: ({ row }) => {
      const desc = row.getValue("descripcion") as string;
      return (
        <div className="max-w-[400px] truncate text-sm text-gris-calido">
          {desc || "Sin descripción"}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-8 w-8 p-0"
            )}
          >
            <MoreHorizontal className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DropdownMenuItem>
                <Link
                  href={`/catalogo/${category.slug}`}
                  target="_blank"
                  className="flex items-center w-full"
                >
                  <ExternalLink className="mr-2 h-4 w-4" /> Ver en Tienda
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link
                  href={`/admin/categories/${category.id}`}
                  className="cursor-pointer"
                >
                  Editar Categoría
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={async () => {
                  if (
                    confirm(
                      "¿Estás seguro de que deseas eliminar esta categoría? Esto podría afectar a los productos asociados.",
                    )
                  ) {
                    const res = await fetch(`/api/categories/${category.id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) window.location.reload();
                    else alert("Error al eliminar la categoría.");
                  }
                }}
              >
                Eliminar
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface CategoryTableProps {
  data: Categoria[];
}

export function CategoryTable({ data }: CategoryTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="nombre"
      searchPlaceholder="Buscar categorías..."
    />
  );
}
