import React, { useState } from 'react';
import Image from 'next/image';
import { Input } from '@/components/Input';
import { cpf } from 'cpf-cnpj-validator';
import { Button } from '@/components/Button';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { postTable } from '@/services/tables';
import { UserForms } from '@/components/UserForms';

interface RegisterProps {
  name: string;
  cpf: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // get all form data in an object
    const formData = new FormData(e.currentTarget);
    const data: RegisterProps = {
      name: formData.get("name") as string,
      cpf: formData.get("cpf") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      confirmPassword: formData.get("confirmPassword") as string,
    };

    // validate form data
    if (!data.name) return toast.error("Nome é obrigatório.");
    if (!data.cpf) return toast.error("CPF é obrigatório.");
    if (!data.email) return toast.error("E-mail é obrigatório.");
    if (!data.password) return toast.error("Senha é obrigatória.");
    if (data.password !== data.confirmPassword) return toast.error("Senhas não coincidem.");
    if (!cpf.isValid(data.cpf)) return toast.error("CPF inválido.");

    setIsLoading(true);

    // register user
    const response = await postTable("user", data);
    setIsLoading(false);
    if (response.status === 200) {
      toast.success("Usuário cadastrado com sucesso!")
      return setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    }
    return toast.error(response.data);
  }


  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-slate-200 p-4">
      <UserForms
        onSubmit={handleRegister}
        requiredFields={["name", "cpf", "email", "password", "confirmPassword"]}
        isLoading={isLoading}
      >
        <div className="flex flex-row items-center justify-center mb-4 gap-4">
          <Image src="/logo.jpeg" alt="Logo" width={50} height={50} />
          <h1 className="text-2xl font-semibold text-slate-800">Crie sua conta</h1>
        </div>
      </UserForms>
      <ToastContainer />
    </div>
  );
}
