import { useEffect, useState } from "react"

function Tree({listOfPlayers}) {
    const [listOfIds, setListOfIds] = useState([])

    class Node { // dzika klasa node, tylko chce ją wykożystać do robienia drzewka
        constructor(parent = null) {
            this.left = null
            this.right = null
            this.parent = parent
            this.player = null  // player assigned or advanced winner
            this.id = 0
        }
    }

    const buildTree = (list) => {
        let root = new Node();
        root.id = list[Math.floor(list.length / 2)]
        if (list.length === 0) {
            return;
        }
        
        let list1 = []
        let list2 = []
        for(let i = 0; i < Math.floor(list.length / 2); i++) {
            list1.push(list[i])
        }

        for(let i = Math.floor(list.length / 2) + 1; i < list.length; i++) { 
            list2.push(list[i])
        }

        root.left = buildTree(list1)
        root.right = buildTree(list2)

        return root;
    };

    const addPlayers = (listOfPlayers, rootNode) => {
        
        const stack = [root];
        const leaves = [];

        while (stack.length > 0) {
            const node = stack.pop();

            // leaf = no children
            if (node.left === null && node.right === null) {
                leaves.push(node);
            }

            // push children (order does not matter for leaf collection)
            if (node.right) stack.push(node.right);
            if (node.left) stack.push(node.left);
        }
        return leaves
    }

    useEffect(() => {
        const listLength = listOfPlayers.length;
        if (listLength == null) return;

        // Determine required tree size
        let sizeOfTheTree = 0;
        for (let i = 0; Math.pow(2, i) - 1 < listLength; i++) {
            sizeOfTheTree = i + 1;
        }

        const numOfTurns = Math.pow(2, sizeOfTheTree) - 1;

        // Create sequential list [1..numOfTurns]
        const listOfNums = [];
        for (let i = 1; i <= numOfTurns; i++) {
            listOfNums.push(i);
        }

        const root = buildTree(listOfNums)

        console.log(addPlayers(listOfPlayers, root));
        
    }, [listOfPlayers]);


    return(
        <>

        </>
    )
}

export default Tree