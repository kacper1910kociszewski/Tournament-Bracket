import { useEffect, useState } from "react"
import Tree from "./Tree"

function App() {
    const [players, setPlayers] = useState([]) 

    useEffect(() => {
        setPlayers(["Grzegorz", "Władzio", "Kacper Kociszewski", "Mao Zedong"]);
    }, []);

    return (
        <>
            <Tree listOfPlayers={players}></Tree>
        </>
    )
}

export default App
