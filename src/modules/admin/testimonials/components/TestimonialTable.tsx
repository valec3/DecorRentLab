"use client";

import { TestimonialItem } from "@/types";
import { DataTable } from "../../shared/components/DataTable";
import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Star, MoreHorizontal, Edit, Trash2 } from "lucide-react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useTransition } from "react";
import { useRouter } from "next/navigation";

export function TestimonialTable({ data }: { data: TestimonialItem[] }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const columns: ColumnDef<TestimonialItem>[] = [
    {
      accessorKey: "image",
      header: "Avatar",
      cell: ({ row }) => {
        const src = row.original.image || "/placeholder-avatar.png";
        return (
          <div className="relative h-10 w-10 overflow-hidden rounded-full border">
            <Image
              src={src}
              alt={row.original.name}
              fill
              className="object-cover"
              sizes="40px"
              unoptimized={src.startsWith('http')}
            />
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Cliente",
      cell: ({ row }) => (
        <div className="font-medium text-carbon">{row.getValue("name")}</div>
      ),
    },
    {
      accessorKey: "event",
      header: "Evento",
      cell: ({ row }) => (
        <div className="text-xs text-gris-calido">{row.getValue("event")}</div>
      ),
    },
    {
      accessorKey: "rating",
      header: "Calificación",
      cell: ({ row }) => (
        <div className="flex items-center gap-1">
          {row.original.rating} <Star size={14} className="fill-dorado text-dorado" />
        </div>
      ),
    },
    {
      accessorKey: "active",
      header: "Estado",
      cell: ({ row }) => (
        <Badge variant={row.original.active ? "success" : "unavailable"}>
          {row.original.active ? "Activo" : "Oculto"}
        </Badge>
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const item = row.original;

        const onDelete = async () => {
          if (confirm("¿Estás seguro de que deseas eliminar este testimonio?")) {
            startTransition(async () => {
              try {
                const res = await fetch(`/api/testimonials/${item.id}`, {
                  method: "DELETE",
                });
                if (res.ok) {
                  router.refresh();
                } else {
                  alert("Error al eliminar");
                }
              } catch (error) {
                console.error(error);
                alert("Error de conexión");
              }
            });
          }
        };

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
              <DropdownMenuLabel>Acciones</DropdownMenuLabel>
              <DropdownMenuItem className="p-0">
                <Link 
                  href={`/admin/testimonials/${item.id}`} 
                  className="flex items-center w-full px-1.5 py-1"
                >
                  <Edit className="mr-2 h-4 w-4" /> Editar
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="text-red-600 focus:bg-red-50 focus:text-red-600"
                onClick={onDelete}
                disabled={isPending}
              >
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchKey="name"
      searchPlaceholder="Buscar por nombre de cliente..."
    />
  );
}
