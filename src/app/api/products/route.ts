import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@/services/supabase/products/service';

// endpoint: /api/products
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('perPage') || '9');
    const search = searchParams.get('search') || undefined;
    const categoriaSlug = searchParams.get('categoria') || undefined;
    const destacado = searchParams.get('destacado') === 'true' ? true : undefined;

    const result = await productService.getPaginatedProducts(page, perPage, {
      search,
      categoriaSlug,
      destacado
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error('API Products Error:', error);
    return NextResponse.json(
      { message: 'Error fetching products from server' },
      { status: 500 }
    );
  }
}
