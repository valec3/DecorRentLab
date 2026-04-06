import { ProductRepository } from "./repository";
import { Producto, Categoria } from "@/types";
import { ProductRow, PaginatedResult, ProductFilters, VariantRow } from "./interfaces";

export class ProductService {
  private repository: ProductRepository;

  constructor() {
    this.repository = new ProductRepository();
  }

  /**
   * Obtiene la lista paginada de productos.
   */
  async getPaginatedProducts(
    page: number = 1,
    perPage: number = 8,
    filters?: ProductFilters
  ): Promise<PaginatedResult<Producto>> {
    const { data, count } = await this.repository.getProducts(page, perPage, filters);
    
    const formattedData = data.map(row => this.mapRowToProduct(row));
    const totalPages = Math.ceil(count / perPage);

    return {
      data: formattedData,
      count,
      page,
      perPage,
      totalPages
    };
  }

  /**
   * Obtiene un producto individual por su slug.
   */
  async getProduct(slug: string): Promise<Producto | null> {
    const row = await this.repository.getProductBySlug(slug);
    if (!row) return null;
    return this.mapRowToProduct(row);
  }

  /**
   * Obtiene todas las categorías como tipos del dominio.
   */
  async getCategories(): Promise<Categoria[]> {
    const rows = await this.repository.getCategories();
    return rows.map(row => ({
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      descripcion: row.descripcion || '',
      imagenCover: row.imagen_cover || ''
    }));
  }

  /**
   * Mapea una fila de base de datos (`ProductRow`) al tipo de dominio (`Producto`).
   */
  private mapRowToProduct(row: ProductRow): Producto {
    return {
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      categoriaSlug: row.categories?.slug || '', // Se obtiene del join en el repo
      descripcionCorta: row.descripcion_corta || '',
      descripcionLarga: row.descripcion_larga || '',
      precioVenta: row.precio_venta || undefined,
      precioAlquiler: row.precio_alquiler || undefined,
      promocion: row.precio_original_venta || row.precio_original_alquiler ? {
        precioOriginalVenta: row.precio_original_venta || undefined,
        precioOriginalAlquiler: row.precio_original_alquiler || undefined,
        etiqueta: row.etiqueta_promocion || undefined
      } : undefined,
      peso: row.peso || undefined,
      garantia: row.garantia || undefined,
      tiempoMontaje: row.tiempo_montaje || undefined,
      idealPara: row.ideal_para || [],
      imagenes: row.imagenes || [],
      destacado: row.destacado,
      disponible: row.disponible,
      material: row.material || undefined,
      medidas: row.medidas || undefined,
      color: row.color || undefined,
      variantes: row.product_variants?.map((v: VariantRow) => ({
        tipo: v.tipo,
        nombre: v.nombre,
        valor: v.valor,
        precioAdicional: v.precio_adicional
      })) || []
    };
  }
}

// Exportar una instancia única (Singleton-like pattern if preferred)
export const productService = new ProductService();
