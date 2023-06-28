import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { supabase } from '../lib/initSupabase';
import bcrypt from 'bcrypt';
import {v4 as uuidv4} from 'uuid';

export async function getData(req: Request, res: Response) {
  const table = req.params.table;
  try {
    const { data, error } = await supabase.from(table).select();
    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDataById(req: Request, res: Response) {
  const { table, id } = req.params;
  try {
    const { data, error } = await supabase.from(table).select().eq('id', id);
    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function getDataByField(req: Request, res: Response) {
  const { table, field, value } = req.params;
  try {
    const { data, error } = await supabase.from(table).select().eq(field, value);
    if (error) throw error;
    res.status(200).json(data);
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export async function postData(req: Request, res: Response) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const table = req.params.table;
  const data = req.body;
  
  try {
    if(table == 'user'){
      try {
        const { error } = await supabase.from(table).insert([{
          id: uuidv4(),
          name: data.name,
          cpf: data.cpf,
          email: data.email,
          password: bcrypt.hashSync(data.password, 10),
          image: data.image ? data.image : null,
        }]);
        if (error) throw error;
        res.status(200).json({ message: `Entrada criada na tabela ${table}` });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    }
    else{
      try {
        const { error } = await supabase.from(table).insert([data]);
        if (error) throw error;
        res.status(200).json({ message: `Entrada criada na tabela ${table}` });
      } catch (err: any) {
        res.status(500).json({ error: err.message });
      }
    }
  }
  catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function putData(req: Request, res: Response) {
  const table = req.params.table;
  const id = req.body.id;
  const data = req.body;
  try {
    if (data.password) {
      data.password = bcrypt.hashSync(data.password, 10);
    }
    const { error } = await supabase.from(table).update(data).eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: `Entrada atualizada na tabela ${table}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}

export async function deleteData(req: Request, res: Response) {
  const { table, id } = req.params;
  try {
    const { error } = await supabase.from(table).delete().eq('id', id);
    if (error) throw error;
    res.status(200).json({ message: `Entrada excluída da tabela ${table}` });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}


export async function loginUser(req: Request, res: Response) {
  const { email, password } = req.body;
  
  try {
    const { data, error } = await supabase.from('user').select('*').eq('email', email);
    
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(401).json({ error: "Usuário não encontrado" });
    }
    
    const match = await bcrypt.compare(password, data[0].password);

    if (!match) {
      return res.status(401).json({ user: null, error: "Os dados não conferem!" });
    }

    // Senha é válida, usuário está logado
    return res.status(200).json({ 
      user: data[0],
    });
    
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
}
