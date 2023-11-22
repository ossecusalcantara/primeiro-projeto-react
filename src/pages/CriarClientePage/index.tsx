import { Button, TextField } from "@mui/material";
import "./index.css";
import { useEffect, useState } from "react";
import api, { IDataRequest, IDataResponse } from "../../provider/api";
import { useNavigate, useParams } from "react-router-dom";

const CriarClientePage = () => {

    const { id } = useParams();
    const [nome, setNome] = useState<string>("");
    const [sobreNome, setSobreNome] = useState<string>("");
    const [dataNascimento, setDataNascimento] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [telefone, setTelefone] = useState<string>("");

    const navigate = useNavigate();

    const enviarCliente = async () => {
        const request: IDataRequest = {
            url: "/clientes/",
            data: {
                nome: nome,
                sobrenome: sobreNome,
                dataNascimento: dataNascimento,
                email: email,
                telefone: telefone
            }
        }

        if(id) {
            request.url = `/clientes/${id}`;

            const response: IDataResponse = await api.put(request);

            if(response.statusCode === 200) {
                alert("Registro atualizado com sucesso!");
                navigate("/");
            }

            return;
        }

        const response: IDataResponse = await api.post(request);

        if(response.statusCode === 201) {
            alert("Registro criado com sucesso!");
            navigate("/");
        }
    }

    const buscarCliente = async () => {
        const request: IDataRequest = {
            url: `/clientes/${id}`,
        }

        const response: IDataResponse = await api.get(request);

        if(response.statusCode === 200){
            const data = response.data;

            setNome(data.nome);
            setDataNascimento(data.dataNascimento);
            setEmail(data.email);
            setSobreNome(data.setSobreNome);
            setTelefone(data.telefone);
        }
    }

    useEffect(() => {
        if(id) {
            buscarCliente();
        }
    }, []);


    return <> 
        <div className="body">
            <div className="box">
                {id ? <>
                    <div className="box-input">
                        <TextField variant="outlined" label="ID" fullWidth value={id}/>
                    </div>
                </> : ""}
                <div className="box-input">
                    <TextField id="outlined-basic" variant="outlined" label="Nome" fullWidth value={nome} onChange={(t) => {
                        setNome(t.target.value);
                    }}/>
                </div>
                <div className="box-input">
                    <TextField id="outlined-basic" variant="outlined" label="Sobrenome" fullWidth value={sobreNome} onChange={(t) => {
                        setSobreNome(t.target.value);
                    }}/>
                </div>
                <div className="box-input">
                    <TextField id="outlined-basic" variant="outlined" label="Data Nascimento" fullWidth value={dataNascimento} onChange={(t) => {
                        setDataNascimento(t.target.value);
                    }}/>
                </div>
                <div className="box-input">
                    <TextField id="outlined-basic" variant="outlined" label="E-mail" fullWidth value={email} onChange={(t) => {
                        setEmail(t.target.value);
                    }}/>
                </div>
                <div className="box-input">
                    <TextField id="outlined-basic" variant="outlined" label="Telefone" fullWidth value={telefone} onChange={(t) => {
                        setTelefone(t.target.value);
                    }}/>
                </div>
                <div className="box-input">
                    <Button fullWidth variant="contained" onClick={() => {
                        enviarCliente();
                    }}>Enviar Cliente</Button>
                </div>
            </div>
        </div>
    </>
}

export default CriarClientePage;