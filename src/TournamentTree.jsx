import './TournamentTree.css'

function TournamentTree() {
    // TODO: Display of tournament

    return (
        <>
            <div className="tournament-tree">
                <div className='stage'>
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                </div>


                <div className="stage">
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                </div>


                <div className="stage">
                    <div className="match">
                        <div className='player'></div>
                        <div className='player'></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TournamentTree