'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Auth0Icon } from '@/components/Auth0Icon';
import { IngesLogo } from '@/components/IngesLogo';
import { GithubIcon } from '@/components/GithubIcon';
import { GoogleIcon } from '@/components/GoogleIcon';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useState } from 'react';

const loginFormSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'El email es requerido.' })
    .email('Email inválido.'),
  password: z
    .string()
    .min(6, { message: 'La contraseña debe tener al menos 6 caracteres.' }),
});

type LoginFormValues = z.infer<typeof loginFormSchema>;

const Login = () => {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleSubmit = async (values: LoginFormValues) => {
    setError(null);
    const res = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (res?.error) {
      setError(res.error);
    } else {
      router.push('/dashboard');
    }
  };

  const handleProviderLogin = (provider: string) => {
    return () => {
      signIn(provider);
    };
  };

  return (
    <div className="flex w-full h-full flex-row">
      <div className="flex items-center justify-center py-12 flex-1">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          {error && (
            <div className="text-red-500 text-center">
              {error === 'CredentialsSignin'
                ? 'Invalid email or password'
                : error}
            </div>
          )}
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="grid gap-4"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <FormControl>
                      <Input
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center justify-between">
                      <FormLabel htmlFor="password">Password</FormLabel>
                      <Link
                        href="/forgot-password"
                        className="text-sm underline"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                    <FormControl>
                      <Input
                        id="password"
                        type="password"
                        required
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full dark:text-secondary-foreground"
              >
                Login
              </Button>
            </form>
          </Form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleProviderLogin('google')}
          >
            <GoogleIcon className="mr-2" /> Google
          </Button>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleProviderLogin('auth0')}
          >
            <Auth0Icon className="mr-2" /> Auth0
          </Button>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleProviderLogin('github')}
          >
            <GithubIcon className="mr-2" /> Github
          </Button>

          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex lg:flex-1 flex-col items-center justify-center text-center min-h-screen">
        <div className="flex items-center justify-center">
          <IngesLogo width={200} />
        </div>
        <h1 className="text-4xl font-bold py-6 dark:text-secondary-foreground">
          IngesPro
        </h1>
        <h3 className="font-medium text-sm text-muted-foreground dark:text-secondary-foreground">
          Control financiero eficiente y sencillo
        </h3>
      </div>
    </div>
  );
};

export default Login;
