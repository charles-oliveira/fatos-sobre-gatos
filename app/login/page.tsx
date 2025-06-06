'use client' // Componente de cliente para interatividade

import { Input, Button, Card, CardBody, CardHeader } from "@nextui-org/react";
import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simula uma chamada de API de login
    setTimeout(() => {
        alert(`Login simulado com sucesso para: ${email}`);
        setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900/50">
        <Card className="w-full max-w-md p-6">
            <CardHeader className="justify-center">
                <h1 className="text-2xl font-bold">Login</h1>
            </CardHeader>
            <CardBody>
                <form onSubmit={handleLogin} className="flex flex-col gap-4">
                    <Input
                        isRequired
                        type="email"
                        label="Email"
                        placeholder="seu@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        isRequired
                        type="password"
                        label="Senha"
                        placeholder="Sua senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <p className="text-center text-small">
                        Precisa de uma conta?{" "}
                        <Link href="#" className="text-primary">
                            Cadastre-se
                        </Link>
                    </p>
                    <div className="flex gap-2 justify-end">
                        <Button type="submit" color="primary" isLoading={isLoading}>
                           {isLoading ? 'Entrando...' : 'Entrar'}
                        </Button>
                    </div>
                     <Button as={Link} href="/" fullWidth color="secondary" variant="flat" className="mt-4">
                        Voltar para a Home
                    </Button>
                </form>
            </CardBody>
        </Card>
    </div>
  );
}