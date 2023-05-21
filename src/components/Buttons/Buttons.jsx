import './Buttons.scss'

const Buttons =({actions}) => {
    return (
        <div className="buttons">

            <section className="buttons-row" >
            <article className="arrow-buttons">
                <section className="arrow-buttons-row">

                    <button className="arrow-button arrow-button-up" onClick={()=>actions("up")}>
                        <i className="fas fa-caret-up"></i>
                    </button>
                </section>
                <section className="arrow-buttons-row">
                    <button className="arrow-button arrow-button-left" onClick={()=>actions("left")}>
                        <i className="fas fa-caret-left"></i>
                    </button>
                    <button className="arrow-button arrow-button-circle" >
                        <i className="fas fa-circle"></i>
                    </button>
                    <button className="arrow-button arrow-button-right" onClick={()=>actions("right")}>
                        <i className="fas fa-caret-right"></i>
                    </button>
                </section>
                <section className="arrow-buttons">
                    <button className="arrow-button arrow-button-down" onClick={()=>actions("down")}>
                        <i className="fas fa-caret-down"></i>
                    </button>
                </section>
            </article>
            <article className="action-buttons">
                <button className="action-button rounded action-button-b" onClick={()=>actions("b")} >
                    B
                </button>
                <button className="action-button rounded action-button-a" onClick={()=>actions("a")}>
                    A
                </button>
            </article>
            

            </section>
            <section className="buttons-row last-buttons">
                <article className="options-buttons">
                    <button className="options-button " onClick={()=>actions("select")}>
                        Select
                    </button>
                    <button className="options-button " onClick={()=>actions("start")}>
                        Start
                    </button>
                </article>
            </section>
                    
        </div>
    )
}

export default Buttons;
