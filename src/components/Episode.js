import React, { useState, useEffect } from "react";
import axios from "axios";
import {
    useParams,
    useHistory,
} from "react-router-dom";
import '../styling/table.css';


export default function Episode(props) {
    const { id } = useParams();
    const [episode, setEpisode] = useState(null);
    useEffect( () => {
        //Lamada al backend...
        (async () =>{
            const response = await axios.get(`https://rickandmortyapi.com/api/episode/${id}`)
                                        .catch(e => {
                                            console.error("ERROR!!!", e);
                                        });

        if(response && response.status === 200) {
            const episodeInfo = response.data;
            setEpisode(episodeInfo);
        } else {
            setEpisode(null);
        }
        })();
    }
    , [id]);
    return <div >
            <h2> Episodio ID: {id}</h2>
            {episode && <React.Fragment>
                        <h1>Nombre: {episode.name}</h1>
                        <CharacterTable characters={episode.characters} />
            </React.Fragment>}
    </div>
}

function CharacterTable({ characters=[] }) {
    const history = useHistory();
    const goTo = (url) => {
        const parts = url.split("/");
        console.log(parts)
        const id = parts[parts.lenght -1];
        history.push(`/character/${id}`);
    };
    return <div>
            <h4>Personajes</h4>
            <ul>
                {characters.map((e, idx) => <li key={idx} onClick={() => goTo(e) }>
                    {e}
                    </li> )}
            </ul>
        </div>  
            
}