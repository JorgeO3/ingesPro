'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

const formSchema = z.object({
  amount: z.number().gte(1, { message: 'El monto minimo es de 1$.' }),
  concept: z.string().min(1, { message: 'Concepto es requerido.' }),
  date: z.string().min(1, { message: 'Fecha es requerida.' }),
});

type FormValues = z.infer<typeof formSchema>;

export function RevenueForm() {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: {
      amount: 1,
      concept: '',
      date: '',
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
    setIsOpen(false);
  };

  const handleOpenForm = () => {
    setIsOpen(true);
    form.reset();
  };

  const handleOpenChange = (open: boolean) => setIsOpen(open);
  return (
    <>
      <div className="flex justify-end py-4">
        <Button onClick={handleOpenForm}>Nuevo Movimiento</Button>
      </div>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Movimiento de Dinero</DialogTitle>
            <DialogDescription>
              Completa los campos para agregar un nuevo movimiento.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Monto</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Ingrese el monto"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="concept"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Concepto</FormLabel>
                    <FormControl>
                      <Input placeholder="Ingrese el concepto" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fecha</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder="Seleccione la fecha"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsOpen(false)}>
                  Salir
                </Button>
                <Button type="submit">Ingresar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
