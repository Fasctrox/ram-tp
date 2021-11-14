import React from "react"
import{
    useHistory,
} from 'react-router-dom';

export default function EpisodeItem({ episode }) {
    const history = useHistory();

    const goTo = () => {
        history.push(`episode/${episode.id}`);
    };

    return <React.Fragment>
        <tr>
            <td>{episode.id}</td>
            <td>{episode.name}</td>
            <td>{episode.air_date}</td>
            <td>{episode.episode}</td>
            <td>{episode.url}</td>
            <td>{episode.created}</td>
            <td>
                <a onClick={goTo} >Ver</a>
            </td>
        </tr>
    </React.Fragment>
}