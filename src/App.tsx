import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import api, { IDataRequest, IDataResponse } from './provider/api';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';


function App() {
  const [clientes, setClientes] = useState<any>({});

  const colunas: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
    },
    {
      field: "nome",
      headerName: "Nome"
    },
    {
      field: "sobreNome",
      headerName: "Sobrenome"
    }, 
    {
      field: "dataNascimento",
      headerName: "Dt. de Nascimento",
      width: 100
    },
    {
      field: "email",
      headerName: "E-mail"
    },
    {
      field: "telefone",
      headerName: "Telefone"
    }

  ]

  const carregarClientes = async () => {
    const request: IDataRequest = {
      url: "/clientes/"
    }

    const response: IDataResponse = await api.get(request);

    if(response.statusCode == 200 ) {
      setClientes(response.data);
    }
  }

  return (
    <div>
      <button onClick={() => {
        carregarClientes();
      }}>
        Carregar
      </button>
      <Link to={"/criarCliente"}>Criar Cliente</Link>
      <div>
        <DataGrid
          rows={clientes}
          columns={colunas}
          checkboxSelection
          pageSizeOptions={[5,10,15]}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5
              }
            }
          }}
        />
      </div>
    </div>

  );
}

export default App;
