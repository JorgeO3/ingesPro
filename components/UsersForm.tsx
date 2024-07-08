'use client';

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
import { useUsers } from '@/hooks/useUsers';

const userFormSchema = z.object({
  userName: z.string().min(1, { message: 'El nombre es requerido.' }),
  userRole: z.string().min(1, { message: 'El rol es requerido.' }),
});

type UserFormValues = z.infer<typeof userFormSchema>;

export function UserForm() {
  const { isFormOpen, toggleForm } = useUsers();

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userFormSchema),
    mode: 'onChange',
    defaultValues: {
      userName: '',
      userRole: '',
    },
  });

  const handleSubmit = (values: UserFormValues) => {
    console.log(values);
    toggleFormAndReset();
  };

  const toggleFormAndReset = () => {
    toggleForm();
    form.reset();
  };

  return (
    <>
      <div className="flex justify-end py-4">
        <Button className="dark:text-secondary-foreground">New User</Button>
      </div>
      <Dialog open={isFormOpen} onOpenChange={toggleFormAndReset}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nuevo Usuario</DialogTitle>
            <DialogDescription>
              Completa los campos para agregar un nuevo usuario.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-4"
            >
              <FormField
                control={form.control}
                name="userName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el nombre del usuario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="userRole"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Rol</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Ingrese el rol del usuario"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={toggleFormAndReset}
                >
                  Cancelar
                </Button>
                <Button type="submit">Agregar</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
