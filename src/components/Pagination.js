export default function Pagination({info, onNextPressed = () => {}, onPrevPressed = () => {} } ) {
    console.log({info})
    const { count, pages, next, prev } = info || {};

    return <>
                <span> La cantidad de personajes es: {count} en {pages} paginas </span>
                <button onClick={() => onPrevPressed(prev)} >previo</button>
                <button onClick={() => onPrevPressed(next)} >siguiente</button>
            </>
}