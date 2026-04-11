import { CategoryRepository } from "./repository";
import { Categoria } from "@/types";
import { CategoryRow } from "./interfaces";

export class CategoryService {
  private repository: CategoryRepository;

  constructor() {
    this.repository = new CategoryRepository();
  }

  /**
   * Obtiene la lista de todas las categorías mapeadas al modelo de la aplicación.
   */
  async getCategories(): Promise<Categoria[]> {
    const rows = await this.repository.getCategories();
    return rows.map((row) => this.mapRowToCategory(row));
  }

  /**
   * Obtiene una categoría individual por su ID o Slug.
   */
  async getCategory(idOrSlug: string): Promise<Categoria | null> {
    const row = await this.repository.getCategoryByIdOrSlug(idOrSlug);
    if (!row) return null;
    return this.mapRowToCategory(row);
  }

  /**
   * Crea una nueva categoría.
   */
  async createCategory(category: Partial<Categoria>): Promise<Categoria> {
    const row = await this.repository.createCategory({
      nombre: category.nombre,
      slug: category.slug,
      descripcion: category.descripcion,
      imagen_cover: category.imagenCover,
    });
    return this.mapRowToCategory(row);
  }

  /**
   * Actualiza una categoría existente.
   */
  async updateCategory(id: string, category: Partial<Categoria>): Promise<Categoria> {
    const row = await this.repository.updateCategory(id, {
      nombre: category.nombre,
      slug: category.slug,
      descripcion: category.descripcion,
      imagen_cover: category.imagenCover,
    });
    return this.mapRowToCategory(row);
  }

  /**
   * Elimina una categoría.
   */
  async deleteCategory(id: string): Promise<void> {
    await this.repository.deleteCategory(id);
  }

  /**
   * Mapea un registro de base de datos a un modelo de dominio Categoria.
   */
  private mapRowToCategory(row: CategoryRow): Categoria {
    return {
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      descripcion: row.descripcion || "",
      imagenCover: row.imagen_cover || "",
    };
  }
}

export const categoryService = new CategoryService();
