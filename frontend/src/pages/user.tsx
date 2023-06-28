import { getTable, putTable, deleteTable } from "@/services/tables";
import { useEffect, useState } from "react";
import { Input } from '@/components/Input';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { Button } from "@/components/Button";
import { UserForms } from "@/components/UserForms";

interface UserProps {
  id: string;
  name: string;
  cpf: string;
  email: string;
}

export default function User(){
  const [user, setUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function checkUser() {
      const userId = localStorage.getItem("user_id");
      const data = await getTable(`user/${userId}`);
      if(data) {
        setUser(data[0]);
        console.log(data[0]);
      }
    }
    checkUser();
  }, []);

  async function updateUserInfo(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    
    setIsLoading(true);
    const formData = new FormData(e.currentTarget);
  
    const data = {
      id: user?.id as string,
      name: formData.get("name") as string,
      cpf: formData.get("cpf") as string,
      email: formData.get("email") as string,
      password: formData.get("password") as string
    };
  
    // remove empty fields
    (Object.keys(data) as Array<keyof typeof data>).forEach(key => {
      if(!data[key]) delete data[key];
    });

    const response = await putTable("user", data);
    if(response){
      toast.success("Dados atualizados com sucesso!");
    }
    else {
      toast.error("Erro ao atualizar dados.");
    }
    setIsLoading(false);
  }
  


  async function deleteUser() {
    if(!user) return toast.error("User not found.")

    // show confirmation message
    const confirmation = confirm("Tem certeza que deseja deletar sua conta?");
    if(!confirmation) return;

    setIsLoading(true);
    await deleteTable('user', user?.id);
    localStorage.removeItem("user_id");
    toast.success("Usuário deletado com sucesso!");
    setTimeout(() => {
      setUser(null);
      window.location.href = "/";
    }, 1000);
    setIsLoading(false);
  };

  function logout() {
    localStorage.removeItem("user_id");
    toast.success("Deslogado com sucesso!");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  if(!user) return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-slate-200 p-4 gap-4">
      <h1 className="text-3xl text-center text-black">Você não está logado</h1>
      <Button onClick={() => window.location.href = "/"} label="Login" />
      <Button onClick={() => window.location.href = "/register"} label="Register" />
      <ToastContainer />
    </div>
  );

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-slate-200 p-4">

      <div className="flex flex-row items-center justify-center mb-4 gap-4">
        <h1 className="text-2xl font-semibold text-slate-800">Bem vindo, {user.name}!</h1>
      </div>

      {/* button on top right to logout */}
      <div className="flex flex-row items-center justify-end mb-4 gap-4 absolute top-4 right-4">
        <Button onClick={logout} label="Deslogar" />
      </div>

      <UserForms
        onSubmit={updateUserInfo}
        requiredFields={["name", "cpf", "email"]}
        initialValues={{
          name: user.name,
          cpf: user.cpf,
          email: user.email
        }}
        isLoading={isLoading}
      >
        <div className="flex flex-row items-center justify-center mb-4 gap-4">
          <h1 className="text-2xl font-semibold text-slate-800">Seus dados</h1>
        </div>
      </UserForms>

      <button onClick={deleteUser} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mt-8">
        Excluir conta
      </button>

      <ToastContainer />
    </div>
  )
}
