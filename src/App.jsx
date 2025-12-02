import { useEffect, useState } from "react"
import Tree from "./Tree"

function App() {
    const [players, setPlayers] = useState([])
    const [root, setRoot] = useState() // tree

    useEffect(() => {
        setPlayers(["Grzegorz", "Władzio", "Kacper Kociszewski", "Mao Zedong", "Testownik 3000", "urzytkownik 11"]);
    }, []);

    return (
        <>
            <Tree listOfPlayers={players} getTree={setRoot}></Tree>
        </>
    )
}

export default App
