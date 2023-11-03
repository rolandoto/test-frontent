

const CardColorReservation =() =>{
    return (
        <ul className="flex-container wrap-reverse row-top-roomsOcasioanles"  >

        <div className="state-type" >
            <li  className="imbox-color-one"> </li>
            <span className="margin-let-rig" >Reserva</span>
        </div>

        <div className="state-type" >
            <li  className="imbox-color-one-pagada"> </li>
            <span className="margin-let-rig" >Reserva Pagada</span>
        </div>

        <div className="state-type" >
            <li  className="imbox-color"> </li>
            <span className="margin-let-rig"  >Check out</span>
        </div>
        <div className="state-type" >
            <li  className="imbox-color-three"> </li>
            <span className="margin-let-rig" >Check in</span>
        </div>

        <div className="state-type" >
            <li  className="imbox-color-four	"> </li>
            <span className="margin-let-rig" >Asear</span>
        </div>

        <div className="state-type" >
            <li  className="imbox-color-three-adeudada-list"> </li>
            <span className="margin-let-rig" >Lista</span>
        </div>

        <div className="state-type" >
            <li  className="imbox-color-five"> </li>
            <span className="margin-let-rig" >Bloqueada</span>
        </div>

        </ul>
    )
}
export default CardColorReservation