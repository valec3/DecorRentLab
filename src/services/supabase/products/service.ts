import { ProductRepository } from "./repository";
import { Producto, Categoria, AtributoGrupo } from "@/types";
import {
  ProductRow,
  PaginatedResult,
  ProductFilters,
  AttributeGroupRow,
  AttributeValueRow,
} from "./interfaces";

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
    filters?: ProductFilters,
  ): Promise<PaginatedResult<Producto>> {
    const { data, count } = await this.repository.getProducts(
      page,
      perPage,
      filters,
    );

    const formattedData = data.map((row) => this.mapRowToProduct(row));
    const totalPages = Math.ceil(count / perPage);

    return {
      data: formattedData,
      count,
      page,
      perPage,
      totalPages,
    };
  }

  /**
   * Obtiene un producto individual por su slug o ID.
   */
  async getProduct(slugOrId: string): Promise<Producto | null> {
    const row = await this.repository.getProductBySlugOrId(slugOrId);
    if (!row) return null;
    return this.mapRowToProduct(row);
  }

  async createProduct(product: Partial<Producto>): Promise<Producto> {
    const row = await this.repository.createProduct(
      this.mapProductToRow(product),
    );
    return this.mapRowToProduct(row);
  }

  async updateProduct(
    idOrSlug: string,
    product: Partial<Producto>,
  ): Promise<Producto> {
    const row = await this.repository.updateProduct(
      idOrSlug,
      this.mapProductToRow(product),
    );
    return this.mapRowToProduct(row);
  }

  async deleteProduct(idOrSlug: string): Promise<void> {
    await this.repository.deleteProduct(idOrSlug);
  }

  /**
   * Categorías
   */
  async getCategories(): Promise<Categoria[]> {
    const rows = await this.repository.getCategories();
    return rows.map((row) => ({
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      descripcion: row.descripcion || "",
      imagenCover: row.imagen_cover || "",
    }));
  }

  /**
   * Mapeadores
   */
  private mapRowToProduct(row: ProductRow): Producto {
    return {
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      categoriaSlug: row.categories?.slug || "",
      descripcionCorta: row.descripcion_corta || "",
      descripcionLarga: row.descripcion_larga || "",
      precioVenta: row.precio_venta ? Number(row.precio_venta) : undefined,
      precioAlquiler: row.precio_alquiler ? Number(row.precio_alquiler) : undefined,
      promocion:
        row.precio_original_venta || row.precio_original_alquiler
          ? {
              precioOriginalVenta: row.precio_original_venta ? Number(row.precio_original_venta) : undefined,
              precioOriginalAlquiler: row.precio_original_alquiler ? Number(row.precio_original_alquiler) : undefined,
              etiqueta: row.etiqueta_promocion || undefined,
            }
          : undefined,
      peso: row.peso || undefined,
      garantia: row.garantia || undefined,
      tiempoMontaje: row.tiempo_montaje || undefined,
      idealPara: row.ideal_para || [],
      imagenes: row.imagenes || [],
      destacado: row.destacado,
      disponible: row.disponible,
      atributos:
        row.atributo_grupos?.map((g: AttributeGroupRow) => ({
          id: g.id,
          nombre: g.nombre,
          tipoUi: g.tipo_ui,
          opciones: g.atributo_valores?.map((v: AttributeValueRow) => ({
            id: v.id,
            label: v.label,
            valor: v.valor,
            precioAdicional: Number(v.precio_adicional),
          })) || [],
        })) || [],
    };
  }

  private mapProductToRow(product: Partial<Producto>): any {
    const row: any = {};
    if (product.nombre) row.nombre = product.nombre;
    if (product.slug) row.slug = product.slug;
    if (product.descripcionCorta)
      row.descripcion_corta = product.descripcionCorta;
    if (product.descripcionLarga)
      row.descripcion_larga = product.descripcionLarga;
    if (product.precioAlquiler !== undefined)
      row.precio_alquiler = product.precioAlquiler;
    if (product.precioVenta !== undefined)
      row.precio_venta = product.precioVenta;

    if (product.promocion) {
      row.precio_original_venta = product.promocion.precioOriginalVenta;
      row.precio_original_alquiler = product.promocion.precioOriginalAlquiler;
      row.etiqueta_promocion = product.promocion.etiqueta;
    }

    if (product.disponible !== undefined) row.disponible = product.disponible;
    if (product.destacado !== undefined) row.destacado = product.destacado;
    if (product.imagenes) row.imagenes = product.imagenes;
    if (product.categoriaSlug) {
      row.categoria_slug_temp = product.categoriaSlug;
    }

    // El manejo de atributos en create/update se simplificó para el MVP según instrucciones
    return row;
  }
}

export const productService = new ProductService();
