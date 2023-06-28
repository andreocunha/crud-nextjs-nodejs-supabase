import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Modal } from "@/components/Modal";
import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { loginSupabase } from "@/services/tables";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoadingLogin(true);
    const data = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = await loginSupabase(data.email, data.password);
    setLoadingLogin(false);
    if(result){
      localStorage.setItem("user_id", result.id);
      return window.location.href = "/user";
    }
    return toast.error("E-mail ou senha incorretos.");
  }

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 relative">

      <Image
        src="/logo.jpeg"
        alt="Logo"
        width={150}
        height={150}
        className="mt-8 rounded-3xl shadow-md absolute top-0"
      />

      <button className="absolute top-0 right-0 mt-4 mr-4 px-4 py-2 bg-slate-700 text-white rounded-md shadow-md" onClick={() => window.location.href = "/admin"}>
        Admin
      </button>

      <div className="flex flex-col items-center justify-center w-full gap-2 mb-8">
        <h1 className="text-4xl font-bold text-center text-slate-700">
          Venha fazer parte da InnoWave 
        </h1>
        <span className="text-2xl text-center text-slate-700">
          Uma nova forma de surfar na inovação!
        </span>
      </div>


      <div className="flex flex-col items-center justify-center gap-4 mt-8">
        <Link href="/register">
          <Button 
            type="button"
            label="Faça seu cadastro agora!"
          />
        </Link>
        <span 
          className="text-slate-600 hover:text-slate-900 cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          Já possui cadastro? Faça seu login!
        </span>
      </div>

      <Modal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
      >
        <form className="flex flex-col w-full" onSubmit={handleLogin}>
          <div className="flex flex-row items-center justify-center mb-4 gap-4">
            <Image src="/logo.jpeg" alt="Logo" width={50} height={50} />
            <h1 className="text-2xl font-semibold text-slate-800">Faça seu login</h1>
          </div>

          <Input 
            name="email" 
            label="Email"
            placeholder="Digite seu email"
            type="email"
            required
            validateInput={(value) => /\S+@\S+\.\S+/.test(value)}
            errorMessage="Por favor, digite um email válido."
          />

          <Input
            name="password"
            label="Senha"
            placeholder="Digite sua senha"
            secureTextEntry={true}
            required
            validateInput={(value) => value.length >= 6}
            errorMessage="A senha deve conter no mínimo 6 caracteres."
          />

          <Button
            type="submit"
            label="Entrar"
            isLoading={loadingLogin}
          />
        </form>
      </Modal>
      <ToastContainer />
    </main>
  )
}
