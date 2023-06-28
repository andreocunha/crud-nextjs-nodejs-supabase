import { useState } from "react";
import { Button } from "./Button";
import { Input } from "./Input";
import { cpf } from 'cpf-cnpj-validator';

interface UserFormsProps {
  children?: React.ReactNode;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  requiredFields: string[];
  initialValues?: {
    name?: string;
    cpf?: string;
    email?: string;
  };
  isLoading?: boolean;
}

export function UserForms({ children, onSubmit, requiredFields, initialValues = {}, isLoading }: UserFormsProps) {
  const [name, setName] = useState(initialValues.name || "");
  const [cpfValue, setCpfValue] = useState(initialValues.cpf || "");
  const [email, setEmail] = useState(initialValues.email || "");
  const [password, setPassword] = useState("");

  return (
    <form
      className="flex flex-col w-full max-w-2xl p-4 bg-white text-black rounded-lg shadow-md"
      onSubmit={onSubmit}
    >
      {children}

      <span className="text-sm text-gray-500 mb-4">
        Atenção: <span className="text-red-500">*</span> Campos obrigatórios
      </span>

      <Input
        name="name"
        label="Nome"
        placeholder="Digite seu nome"
        required={requiredFields.includes("name")}
        value={name}
        validateInput={(value) => {
          setName(value);
          return value.length >= 3;
        }}
        errorMessage="O nome deve conter no mínimo 3 caracteres."
      />

      <Input
        name="cpf"
        label="CPF"
        placeholder="Digite seu CPF"
        required={requiredFields.includes("cpf")}
        value={cpfValue}
        validateInput={(value) => {
          // aplicar máscara de CPF com regex 123.456.789-00
          let cpfMascara = value.replace(/\D/g, '');
          cpfMascara = cpfMascara.replace(/(\d{3})(\d)/, '$1.$2');
          cpfMascara = cpfMascara.replace(/(\d{3})(\d)/, '$1.$2');
          cpfMascara = cpfMascara.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
          setCpfValue(cpfMascara);

          return cpf.isValid(cpfMascara);
        }}
        maxLength={14}
        errorMessage="Por favor, digite um CPF válido."
      />

      <Input
        name="email"
        label="Email"
        placeholder="Digite seu email"
        type="email"
        required={requiredFields.includes("email")}
        value={email}
        validateInput={(value) => {
          setEmail(value);
          return /\S+@\S+\.\S+/.test(value);
        }}
        errorMessage="Por favor, digite um email válido."
      />

      <Input
        name="password"
        label="Senha"
        placeholder="Digite sua senha"
        secureTextEntry={true}
        required={requiredFields.includes("password")}
        validateInput={(value) => {
          setPassword(value);
          return value.length >= 6
        }}
        errorMessage="A senha deve conter no mínimo 6 caracteres."
      />

      <Input
        name="confirmPassword"
        label="Confirme sua senha"
        placeholder="Digite sua senha novamente"
        secureTextEntry={true}
        required={requiredFields.includes("confirmPassword")}
        errorMessage="As senhas não conferem."
        validateInput={(value) => value === password}
      />

      <Button
        label="Salvar"
        type="submit"
        isLoading={isLoading}
      />
    </form>
  )
}