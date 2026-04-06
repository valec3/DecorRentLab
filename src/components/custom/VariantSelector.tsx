'use client';

import { useState, useMemo, useEffect } from 'react';
import { Variante } from '@/types';

interface VariantSelectorProps {
  variantes: Variante[];
  onSelectionChange: (seleccion: { [key: string]: string }) => void;
}

export function VariantSelector({ variantes, onSelectionChange }: VariantSelectorProps) {
  const groupedVariantes = useMemo(() => {
    const grupos: Record<string, Variante[]> = {};
    if (variantes) {
      variantes.forEach((v) => {
        if (!grupos[v.tipo]) {
          grupos[v.tipo] = [];
        }
        grupos[v.tipo].push(v);
      });
    }
    return grupos;
  }, [variantes]);

  const initialSelection = useMemo(() => {
    const selection: { [key: string]: string } = {};
    Object.keys(groupedVariantes).forEach((tipo) => {
      if (groupedVariantes[tipo].length > 0) {
        selection[tipo] = groupedVariantes[tipo][0].valor;
      }
    });
    return selection;
  }, [groupedVariantes]);

  const [selected, setSelected] = useState(initialSelection);
  const [prevVariantes, setPrevVariantes] = useState(variantes);

  // Reset local state if variants prop changes
  if (variantes !== prevVariantes) {
    setSelected(initialSelection);
    setPrevVariantes(variantes);
  }

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected, onSelectionChange]);

  const handleSelect = (tipo: string, valor: string) => {
    const newSelection = { ...selected, [tipo]: valor };
    setSelected(newSelection);
    onSelectionChange(newSelection);
  };

  const getTipoLabel = (tipo: string) => {
    const labels: Record<string, string> = {
      material: 'Material',
      medida: 'Tamaño',
      color: 'Color',
      acabado: 'Acabado',
    };
    return labels[tipo] || tipo;
  };

  const getColorClass = (valor: string) => {
    const colorMap: Record<string, string> = {
      'Dorado': 'bg-[#C9A66B]',
      'Plata': 'bg-gray-300',
      'Rosa': 'bg-pink-300',
      'Blanco': 'bg-white border-2 border-gray-200',
      'Negro': 'bg-gray-900',
      'Verde esmeralda': 'bg-green-700',
      'Burdeos': 'bg-red-900',
      'Azul navy': 'bg-blue-900',
      'Oro rosa': 'bg-rose-300',
      'Natural': 'bg-amber-200',
      'Transparente': 'bg-white/50 border-2 border-gray-200',
    };
    return colorMap[valor] || 'bg-gray-200';
  };

  if (!variantes || variantes.length === 0) {
    return null;
  }

  const isColorType = (tipo: string) => {
    return tipo === 'color' || (groupedVariantes[tipo]?.[0]?.valor && 
      ['Dorado', 'Plata', 'Rosa', 'Blanco', 'Negro', 'Verde esmeralda', 'Burdeos', 'Azul navy', 'Oro rosa', 'Natural', 'Transparente'].includes(groupedVariantes[tipo][0].valor));
  };

  return (
    <div className="space-y-6">
      {Object.entries(groupedVariantes).map(([tipo, vars]) => {
        const isColor = isColorType(tipo);
        
        return (
          <div key={tipo}>
            <h4 className="text-xs uppercase tracking-widest text-gris-calido mb-3">
              {getTipoLabel(tipo)}
            </h4>
            <div className={`flex flex-wrap gap-2 ${isColor ? 'flex-nowrap' : ''}`}>
              {vars.map((variante, index) => {
                const isSelected = selected[tipo] === variante.valor;
                
                return (
                  <button
                    key={`${tipo}-${index}`}
                    onClick={() => handleSelect(tipo, variante.valor)}
                    className={`relative px-4 py-2.5 rounded-full text-sm transition-all duration-200 whitespace-nowrap ${
                      isSelected
                        ? 'bg-dorado text-white shadow-md'
                        : 'bg-white border border-borde text-carbon hover:border-dorado hover:bg-crema-oscuro'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      {isColor && (
                        <span 
                          className={`w-4 h-4 rounded-full flex-shrink-0 ${getColorClass(variante.valor)}`}
                        />
                      )}
                      {variante.valor}
                      {variante.precioAdicional && variante.precioAdicional > 0 && (
                        <span className="text-xs opacity-80">
                          +${variante.precioAdicional.toLocaleString('es-AR')}
                        </span>
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
