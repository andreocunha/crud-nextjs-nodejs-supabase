import { api } from "./api"

export async function loginSupabase(email: string, password: string){
  try {
    const response = await api.post(`/login`,{
      email,
      password
    })
    return response.data.user
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export async function getTable(route: string){
  try {
    const response = await api.get(`/${route}`)
    return response.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export async function postTable(table: string, data: any){
  try {
    const response = await api.post(`/${table}`, data)
    return {
      data: response.data,
      status: 200
    }
  }
  catch (error: any) {
    console.log(error)
    return {
      data: error.response.data.error,
      status: 500
    }
  }
}

export async function putTable(table: string, data: any){
  try {
    const response = await api.put(`/${table}`, data)
    return response.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}

export async function deleteTable(table: string, id: any){
  try {
    const response = await api.delete(`/${table}/${id}`)
    return response.data
  }
  catch (error) {
    console.log(error)
    return null
  }
}