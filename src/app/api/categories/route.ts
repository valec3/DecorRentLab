import { NextResponse } from 'next/server';
import { productService } from '@/services/supabase/products/service';

export async function GET() {
  try {
    const categories = await productService.getCategories();
    return NextResponse.json(categories);
  } catch (error) {
    console.error('API Categories Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
