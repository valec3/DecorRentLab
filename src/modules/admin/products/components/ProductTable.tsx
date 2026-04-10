"use client";

import { Producto } from "@/types";
import { DataTable } from "../../shared/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
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

const columns: ColumnDef<Producto>[] = [
  {
    accessorKey: "imagen",
    header: "Imagen",
    cell: ({ row }) => {
      const p = row.original;
      const fallbackImage = "/placeholder-product.png";
      const src = p.imagenes?.[0] || fallbackImage;

      return (
        <div className="relative h-10 w-10 overflow-hidden rounded-md border">
          <Image
            src={src}
            alt={p.nombre}
            fill
            className="object-cover"
            sizes="40px"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "nombre",
    header: "Nombre del Producto",
    cell: ({ row }) => (
      <div className="font-medium text-carbon">{row.getValue("nombre")}</div>
    ),
  },
  {
    accessorKey: "categoriaSlug",
    header: "Categoría",
    cell: ({ row }) => (
      <div className="capitalize text-xs text-gris-calido">
        {(row.getValue("categoriaSlug") as string).replace(/-/g, " ")}
      </div>
    ),
  },
  {
    accessorKey: "precioAlquiler",
    header: "Precio Alquiler",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("precioAlquiler"));
      const formatted = new Intl.NumberFormat("es-AR", {
        style: "currency",
        currency: "ARS",
      }).format(amount);
      return <div className="font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "estado",
    header: "Estado",
    cell: ({ row }) => {
      const product = row.original;
      return (
        <div className="flex gap-1 flex-col sm:flex-row">
          {product.disponible ? (
            <Badge variant="success">Disponible</Badge>
          ) : (
            <Badge variant="unavailable">Agotado</Badge>
          )}
          {product.destacado && <Badge variant="featured">Dest</Badge>}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(product.id)}
              >
                Copiar ID
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href={`/producto/${product.slug}`}
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
                  href={`/admin/products/${product.slug}`}
                  className="cursor-pointer"
                >
                  Editar Producto
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={async () => {
                  if (
                    confirm(
                      "¿Estás seguro de que deseas eliminar este producto?",
                    )
                  ) {
                    const res = await fetch(`/api/products/${product.id}`, {
                      method: "DELETE",
                    });
                    if (res.ok) window.location.reload();
                    else alert("Error al eliminar el producto.");
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

interface ProductTableProps {
  data: Producto[];
}

export function ProductTable({ data }: ProductTableProps) {
  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="nombre"
      searchPlaceholder="Buscar productos..."
    />
  );
}
