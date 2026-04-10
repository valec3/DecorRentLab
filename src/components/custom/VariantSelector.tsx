'use client';

import { useState, useMemo, useEffect } from 'react';
import { AtributoGrupo } from '@/types';

interface VariantSelectorProps {
  atributos: AtributoGrupo[];
  onSelectionChange: (seleccion: { [key: string]: string }) => void;
}

export function VariantSelector({ atributos, onSelectionChange }: VariantSelectorProps) {
  const initialSelection = useMemo(() => {
    const selection: { [key: string]: string } = {};
    atributos.forEach((grupo) => {
      if (grupo.opciones.length > 0) {
        selection[grupo.nombre] = grupo.opciones[0].valor;
      }
    });
    return selection;
  }, [atributos]);

  const [selected, setSelected] = useState(initialSelection);
  const [prevAtributos, setPrevAtributos] = useState(atributos);

  // Sincronizar estado si las props cambian
  if (atributos !== prevAtributos) {
    setSelected(initialSelection);
    setPrevAtributos(atributos);
  }

  useEffect(() => {
    onSelectionChange(selected);
  }, [selected, onSelectionChange]);

  const handleSelect = (grupoNombre: string, valor: string) => {
    const newSelection = { ...selected, [grupoNombre]: valor };
    setSelected(newSelection);
  };

  const isColorSelector = (tipoUi: string) => tipoUi === 'color_picker';

  if (!atributos || atributos.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {atributos.map((grupo) => {
        const isColor = isColorSelector(grupo.tipoUi);
        
        return (
          <div key={grupo.id || grupo.nombre} className="space-y-3">
            <h4 className="text-[10px] uppercase tracking-[0.2em] text-gris-calido/70 font-semibold mb-3">
              {grupo.nombre}
            </h4>
            <div className="flex flex-wrap gap-3">
              {grupo.opciones.map((opcion) => {
                const isSelected = selected[grupo.nombre] === opcion.valor;
                
                return (
                  <button
                    key={opcion.id || opcion.valor}
                    onClick={() => handleSelect(grupo.nombre, opcion.valor)}
                    className={`group relative flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-300 border-2 ${
                      isSelected
                        ? 'bg-carbon text-white border-carbon shadow-premium-sm scale-105'
                        : 'bg-white border-borde text-carbon hover:border-dorado/50 hover:bg-crema-oscuro'
                    }`}
                  >
                    {isColor && (
                       <span 
                         className="w-4 h-4 rounded-full border border-black/10 shadow-inner"
                         style={{ backgroundColor: opcion.valor }}
                       />
                    )}
                    <span className="text-sm font-medium">{opcion.label}</span>
                    {opcion.precioAdicional > 0 && (
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${isSelected ? 'bg-white/20 text-white' : 'bg-dorado/10 text-dorado'}`}>
                        +${opcion.precioAdicional.toLocaleString('es-AR')}
                      </span>
                    )}
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
