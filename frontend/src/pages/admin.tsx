import { Input } from "@/components/Input";
import { getTable } from "@/services/tables";
import { use, useEffect, useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [passwordAdmin, setPasswordAdmin] = useState("");

  useEffect(() => {
    async function checkUser() {
      const data = await getTable(`user`);
      if(data) {
        setUsers(data);
      }
    }
    checkUser();
  }, []);


  function handleEditUser(id: string) {
    if(passwordAdmin !== "123456") return toast.error("Senha incorreta.");
    localStorage.setItem("user_id", id);
    window.location.href = "/user"
  }

  if(users.length === 0) return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 relative text-black">
      <h1>
        Nenhum usuário cadastrado.
      </h1>
    </main>
  )

  return (
    <main className="flex flex-col items-center justify-center w-screen h-screen bg-slate-200 relative text-black">

      <Input
        name="password"
        label="Para poder editar algum usuário, digite a senha de ADMIN"
        placeholder="Senha de ADMIN"
        secureTextEntry={true}
        value={passwordAdmin}
        onChange={e => setPasswordAdmin(e.target.value)}
        errorMessage="A senha deve conter no mínimo 6 caracteres."
      />

      <table className="table-auto w-full max-w-5xl mt-5 text-left border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 border border-gray-300">Nome</th>
            <th className="px-4 py-2 border border-gray-300">Email</th>
            <th className="px-4 py-2 border border-gray-300">CPF</th>
            <th className="px-4 py-2 border border-gray-300">Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user.id} className="text-center">
              <td className="px-4 py-2 border border-gray-300">{user.name}</td>
              <td className="px-4 py-2 border border-gray-300">{user.email}</td>
              <td className="px-4 py-2 border border-gray-300">{user.cpf}</td>
              <td className="px-4 py-2 border border-gray-300">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => handleEditUser(user.id)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ToastContainer />
    </main>
  )
}
