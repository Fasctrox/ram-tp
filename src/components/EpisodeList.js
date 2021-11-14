import React, { useEffect, useState } from 'react';
import axios from 'axios';

import EpisodeItem from './EpisodeItem';
import Pagination from './Pagination';
import '../styling/table.css';


export default function EpisodeList(props) {
    const [episodes, setEpisodes] = useState([]); //array vacio
    const [url, setUrl] = useState('https://rickandmortyapi.com/api/episode');
    const [message, setMessage] = useState(null);
    const [info, setInfo] = useState(null);

    useEffect( () => {
        // llamada a backend
        (async () => {
            const response = await axios.get(url)
                                        .catch(e =>{
                                            console.error("ERROR!!!", e);
                                            setMessage("Ocurrio un error...")
                                            setEpisodes([]);
                                        });
                                        
            if (response && response.status === 200) {
                const {info, results} = response.data;
                setInfo(info);
                setEpisodes([
                ...results,
                ]);
            }else{
                setMessage("Ocurrio un error en el llamado REST!");
                setInfo(null);
                setEpisodes([]);
            }   
        })();

    }
    , [url]);

    const onPaginationPressHandler = (newUrl) => {
        console.log({newUrl})
        if(newUrl) {
            setUrl(newUrl);
        }
    };


    return <React.Fragment>
        {message && <span>{message}</span>}
        <h1>Lista de episodios</h1><br></br>
        <Pagination info={info} onPrevPressed={onPaginationPressHandler} onNextPressed = {onPaginationPressHandler} />
        <br></br>

            <table class="fl-table">
                <tr>
                <th>ID</th><th>Name</th><th>Air date</th><th>episode</th><th>url</th><th>created</th>
                </tr>
                {episodes.map((c, idx) => <EpisodeItem key={idx} episode={c} />)}
            </table>
        </React.Fragment>
}