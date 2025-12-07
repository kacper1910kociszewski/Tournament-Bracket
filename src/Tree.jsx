import { useEffect, useState } from "react";

function Tree({ listOfPlayers, getTree }) {
    const [root, setRoot] = useState()

    class Node {
        constructor(parent = null) {
            this.left = null;
            this.right = null;
            this.parent = parent;
            this.player = null;
        }
    }

    // build the structure of the tree
    const buildTree = (levels, parent = null) => {
        if (levels === 0) return null;

        const node = new Node(parent);

        if (levels === 1) return node; // leaf

        node.left = buildTree(levels - 1, node);
        node.right = buildTree(levels - 1, node);

        return node;
    };


    // get all of the leaves of the tree
    const getLeaves = (root) => {
        const leaves = [];
        const stack = [root];

        while (stack.length) {
            const node = stack.pop();

            if (!node.left && !node.right) {
                leaves.push(node);
            } else {
                if (node.right) stack.push(node.right);
                if (node.left) stack.push(node.left);
            }
        }

        return leaves;
    };

    // make the node the top of the tree, then check if there is a viable partner to fight
    const subtreeHasPlayer = (node) => {
        if (!node) return false;

        const stack = [node];
        while (stack.length) {
            const n = stack.pop();
            if (n.player !== null) return true;
            if (n.left) stack.push(n.left);
            if (n.right) stack.push(n.right);
        }
        return false;
    };

    const bubbleUp = (node) => {
        let current = node;

        while (current.parent) {
            const parent = current.parent;
            const sibling = parent.left === current ? parent.right : parent.left;

            if (subtreeHasPlayer(sibling)) return;

            if (parent.player !== null) return;

            parent.player = current.player;
            current.player = null;

            current = parent;
        }
    };

    // add a player to a leaf
    const addPlayers = (players, root) => {
        const leaves = getLeaves(root);

        for (let i = 0; i < players.length; i++) {
            leaves[i].player = players[i];
        }

        
        for (let leaf of leaves) {
            if (leaf.player !== null) {
                bubbleUp(leaf);
            }
        }

        return root;
    };

    // main logic
    useEffect(() => {
        if (!listOfPlayers.length) return;

        let levels = 1;
        while (Math.pow(2, levels - 1) < listOfPlayers.length) {
            levels++;
        }

        const root = buildTree(levels)

        getTree(setRoot( addPlayers(listOfPlayers, root))) // tree
    }, [listOfPlayers]);

    return <>
    </>;
}

export default Tree;
