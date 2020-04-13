import React, { useState} from "react";
import { Link, useHistory} from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import "./style.css";
import logoImg from "../../assets/logo.svg";
import api from "../../service/api";

export default function NewIncident() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();
    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            value
        };


        try {
            await api.post('incidents',data, { headers: { Authorization: ongId } });
            history.push('/profile');
        } catch (error) {
            console.log(error);
            alert('Erro ao realizar inserção de caso, tente novamente mais tarde!');
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />
                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
                    <Link className='back-link' to="/profile">
                        <FiArrowLeft size={16} color="#E02041" />
                        Logon
                    </Link>
                </section>
                <form onSubmit={handleNewIncident}>
                    <input type="text" value={title} onChange={e=>setTitle(e.target.value)} placeholder='Título do caos' />
                    <textarea value={description} onChange={e=>setDescription(e.target.value)} placeholder='Descrição' />
                    <input value={value} onChange={e=>setValue(e.target.value)} placeholder='Valor em Reais' />
                    <button className="button" type='submit'>Cadastar</button>
                </form>
            </div>
        </div>
        );
}