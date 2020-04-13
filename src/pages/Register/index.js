import React , {useState}from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

import api from "../../service/api";

import "./style.css";
import logoImg from "../../assets/logo.svg"

export default function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    const history = useHistory();

    async function handlRegister(e) {
        e.preventDefault();
        const data={
            name,
            email,
            whatsapp,
            uf,
            city
        };
        try {
            const response = await api.post('ongs',data);
            alert(`Seu ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert("Erro nocadastro, tente novament");
            console.log(error);
        }
    }

    return (
        <div className="register-conteiner">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na pataforma e ajude pessoas a encontrar os casos da sua ONG</p>
                    <Link className='back-link' to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        Logon
                    </Link>
                </section>
                <form onSubmit={handlRegister}>
                    <input value={name} onChange={e=>setName(e.target.value)} placeholder='Nome da ONG'/>
                    <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder='E-mail'/>
                    <input value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder='Whatsapp'/>
                    <div className="input-group">
                        <input value={city} onChange={e => setCity(e.target.value)} placeholder='Cidade'/>
                        <input value={uf} onChange={e => setUf(e.target.value)} placeholder='UF' style={{width:80}}/>
                    </div>
                    <button className="button" type='submit'>Cadastar</button>
                </form>
            </div>
        </div>
    );
}