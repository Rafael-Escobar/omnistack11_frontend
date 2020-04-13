import React,{useEffect,useState} from "react";
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi';

import api from "../../service/api";

import "./style.css";
import logoImg from "../../assets/logo.svg";

export default function Profile() {
    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    const history= useHistory();
    const [incidents, setIncidents] = useState([]);

    async function handleDeleteIncident(id){
        try {
            await api.delete(`incidents/${id}`, { headers: { Authorization: ongId } });
            setIncidents(incidents.filter(incident => incident.id !== id)); 
        } catch (error) {
            console.log(error);
            alert('Erro ao realizar o delete, tente novamente mais tarde!');
        }
    }

    function hadleLogout() {
        localStorage.clear();
        history.push('/');
    }

    useEffect(
        ()=>{
            api.get('profile', { headers: { Authorization:ongId}})
            .then(
                response=>{
                    console.log(ongId);
                    console.log(response.data);
                    setIncidents(response.data);
                }
            );
        },
        [ongId]
    );

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda {ongName}</span>
                <Link className='button' to='/incidents/new'>Cadastrar novo caso</Link>
                <button type='button' onClick={hadleLogout}>
                    <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(
                    incident=>(
                        <li key={incident.id}>
                            <strong>Caso:</strong>
                            <p>{incident.title}</p>
                            <strong>Descrição:</strong>
                            <p>{incident.description}</p>
                            <strong>Valor:</strong>
                            <p>{Intl.NumberFormat('pt-br',{style:'currency', currency:'BRL'}).format(incident.value)}</p>
                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    )
                )}
            </ul>

        </div>
    );
}