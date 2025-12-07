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

                <div className='connect-lines'>
                    <div className='connect-line'>
                        <div className='connect-from'></div>
                        <div className='connect-to'></div>
                    </div>
                    <div className='connect-line'>
                        <div className='connect-from'></div>
                        <div className='connect-to'></div>
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

                <div className='connect-lines'>
                    <div className='connect-line'>
                        <div className='connect-from from-semifinal'></div>
                        <div className='connect-to to-final'></div>
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