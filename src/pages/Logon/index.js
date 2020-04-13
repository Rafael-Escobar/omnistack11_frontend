import React, {useState} from "react";
import {Link,useHistory} from 'react-router-dom';
import {FiLogIn} from "react-icons/fi";

import api from '../../service/api';

import "./style.css";
import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon({ children }) {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handlLogin(e) {
        e.preventDefault();
        const data = {id };
        try {
            const response = await api.post('session', data);
            localStorage.setItem('ongId',id);
            localStorage.setItem('ongName', response.data.name);
            history.push('/profile');
        } catch (error) {
            alert("Erro no login, tente novamente");
            console.log(error);
        }
    }


    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
                <form onSubmit={handlLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
                    <button type="submit" className='button'>Entrar</button>
                    <Link className='back-link' to="/register">
                        <FiLogIn size={16} color="#E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}
