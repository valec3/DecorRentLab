"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDown,
  ArrowUp,
  HelpCircle,
  Loader2,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { FaqItem } from "@/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

interface FaqsFormProps {
  initialData: FaqItem[];
}

export function FaqsForm({ initialData }: FaqsFormProps) {
  const router = useRouter();
  const [items, setItems] = useState<FaqItem[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      {
        question: "",
        answer: "",
        active: true,
      },
    ]);
  };

  const updateItem = (index: number, patch: Partial<FaqItem>) => {
    setItems((prev) =>
      prev.map((item, current) =>
        current === index ? { ...item, ...patch } : item,
      ),
    );
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, current) => current !== index));
  };

  const moveItem = (from: number, to: number) => {
    setItems((prev) => {
      const next = [...prev];
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const payload = items.map((item, index) => ({
        ...item,
        orderIndex: index,
      }));

      const response = await fetch("/api/faqs", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Error updating FAQs");
      }

      setStatusMessage("FAQs actualizadas.");
      router.refresh();
    } catch (error) {
      console.error(error);
      setStatusMessage("Hubo un problema al guardar los cambios.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-10 pb-20">
      <section className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-premium-sm flex flex-col gap-8">
        <div className="flex items-start justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-2xl bg-dorado/10 flex items-center justify-center text-dorado">
              <HelpCircle />
            </div>
            <div className="flex flex-col gap-1">
              <h2 className="text-2xl font-serif font-bold text-carbon">
                Preguntas Frecuentes
              </h2>
              <p className="text-sm text-gris-calido">
                Gestiona las FAQs que se muestran en la web publica.
              </p>
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={addItem}
            disabled={loading}
          >
            <Plus data-icon="inline-start" />
            Agregar FAQ
          </Button>
        </div>

        <div className="flex flex-col gap-6">
          {items.length === 0 && (
            <div className="border border-dashed border-slate-200 rounded-2xl p-8 text-center text-sm text-gris-calido">
              No hay FAQs cargadas. Agrega la primera pregunta.
            </div>
          )}

          {items.map((item, index) => (
            <div
              key={item.id ?? `faq-${index}`}
              className="border border-slate-200 rounded-3xl p-6 flex flex-col gap-6"
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-widest text-gris-calido">
                    FAQ #{index + 1}
                  </span>
                  <span
                    className={cn(
                      "text-[10px] font-bold uppercase tracking-widest",
                      item.active ? "text-emerald-500" : "text-slate-400",
                    )}
                  >
                    {item.active ? "Activo" : "Inactivo"}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => moveItem(index, index - 1)}
                    disabled={index === 0 || loading}
                  >
                    <ArrowUp data-icon="inline-start" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="outline"
                    onClick={() => moveItem(index, index + 1)}
                    disabled={index === items.length - 1 || loading}
                  >
                    <ArrowDown data-icon="inline-start" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    variant="destructive"
                    onClick={() => removeItem(index)}
                    disabled={loading}
                  >
                    <Trash2 data-icon="inline-start" />
                  </Button>
                </div>
              </div>

              <FieldGroup className="gap-5">
                <Field>
                  <FieldLabel htmlFor={`faq-question-${index}`}>
                    Pregunta
                  </FieldLabel>
                  <Input
                    id={`faq-question-${index}`}
                    value={item.question}
                    onChange={(event) =>
                      updateItem(index, { question: event.target.value })
                    }
                    placeholder="Ej: Cual es la politica de cancelacion?"
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor={`faq-answer-${index}`}>
                    Respuesta
                  </FieldLabel>
                  <Textarea
                    id={`faq-answer-${index}`}
                    value={item.answer}
                    onChange={(event) =>
                      updateItem(index, { answer: event.target.value })
                    }
                    rows={5}
                    placeholder="Escribe la respuesta de la FAQ..."
                    required
                  />
                </Field>

                <FieldSet>
                  <FieldLegend variant="label">Visibilidad</FieldLegend>
                  <FieldDescription>
                    Controla si esta FAQ aparece en la web publica.
                  </FieldDescription>
                  <FieldGroup className="gap-3">
                    <Field
                      orientation="horizontal"
                      className="items-center justify-between rounded-2xl border border-slate-200 px-4 py-3"
                    >
                      <div className="flex flex-col gap-1">
                        <FieldLabel htmlFor={`faq-active-${index}`}>
                          Activo
                        </FieldLabel>
                        <FieldDescription>
                          Visible para los visitantes.
                        </FieldDescription>
                      </div>
                      <input
                        id={`faq-active-${index}`}
                        type="checkbox"
                        checked={item.active ?? true}
                        onChange={(event) =>
                          updateItem(index, { active: event.target.checked })
                        }
                        className="size-5 text-dorado rounded-lg focus:ring-dorado"
                      />
                    </Field>
                  </FieldGroup>
                </FieldSet>
              </FieldGroup>
            </div>
          ))}
        </div>
      </section>

      <div className="flex items-center justify-between gap-4">
        <p className="text-xs text-gris-calido">
          {statusMessage ?? "Guarda los cambios para actualizar las FAQs."}
        </p>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Loader2 data-icon="inline-start" className="animate-spin" />
          ) : (
            <Save data-icon="inline-start" />
          )}
          {loading ? "Guardando..." : "Guardar cambios"}
        </Button>
      </div>
    </form>
  );
}
