import { useState } from "react"
import Cuadrado from "./Cuadrado"
const Tabla = () => {
    //HOOKS
    const [tabla, SetTabla] = useState(['', '', '', '', '', '', '', '', '']);
    const [estadoEmoji, setEstadoEmoji] = useState('❌');
    const [finDelJuego, setFinDelJuego] = useState(false); //dice cuando el jeugo termine
    const [showMessage, SetShowMessage] = useState();
    //const [estado, setEstado] = useState('Check--X');

    //*  CONST
    const pGanadoras = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    const messageTurn = () => `Turno del jugador ${estadoEmoji}`,
        messageWinned = () => `El Ganador es ${estadoEmoji}`,
        messageEmpate = () => `Ocurrio un empate :C`;

    //FUNCIONES
  
    const handleClick = (e) => {
        const evento = e.target;
        //console.log("CLik", e.target.classList);
        //console.log("VALIDACIÓN -> ",e.target.classList.contains('Check--O'));
        //* * VALIDA QUE EL CUADRADO NO ESTE OCUPADO
        /*
        if (e.target.classList.contains('Check--O')||e.target.classList.contains('Check--X')) {
            return;
        } */
        if (finDelJuego || evento.innerHTML === '❌' || evento.innerHTML === '⭕️') {
            return;
        }

        evento.innerHTML = estadoEmoji;
        //PROXIMAMENTE PARA VALIDAR QUIEN ES EL GANADOR!!
        ActualizarTabla(e);
        //CAMBIA DE TURNO!!
        setEstadoEmoji((estadoEmoji === '❌') ? '⭕️' : '❌');
        SetShowMessage(messageTurn);
        //e.target.classList.add(estado);
        //setEstado((estado==='Check--X')?'Check--O':'Check--X');
    }

    const limpiar = () => {
        //console.log(document.querySelector('.tabla').children)
        let hijos = document.querySelector('.tabla').children;
        //console.log(hijos)
        for (let i = 0; i < hijos.length; i++) {
            hijos[i].innerHTML = '';
            //console.log(hijos);
        }
        SetTabla(['', '', '', '', '', '', '', '', '']);
        setFinDelJuego(false);
    }

    const ActualizarTabla = e => {
        const CopyTabla = tabla;
        const index = e.target.attributes.value.value;
        //console.log("index ->>",index)
        CopyTabla[index] = estadoEmoji;
        SetTabla(CopyTabla);

        //VERIFICAR GANADORE
        for (var i = 0; i < pGanadoras.length; i++) {
            let [a, b, c] = pGanadoras[i];
            //console.log("Index ", i, "p1 ", tabla[a], "p2 ", tabla[b], "p3 ", tabla[c])
            if (tabla[a] && tabla[a] === tabla[b] && tabla[c] === tabla[a]) {
                //console.log("index ", i, " ganador!!! ", estadoEmoji)
                setFinDelJuego(true);
                return;
            }
        }
    }
    return (
        <div className='flex flex-col text-center'>
            <div>
                <h3 className='mt-2 text-6xl font-bold text-indigo-700	'>Tic Tac Toe</h3>
            </div>
            <div className=" tabla  grid grid-cols-3  gap-1  text-center justify-items-center shadow-4xl shadow-2xl">
                <Cuadrado id={0} handleClik={handleClick} />
                <Cuadrado id={1} handleClik={handleClick} />
                <Cuadrado id={2} handleClik={handleClick} />
                <Cuadrado id={3} handleClik={handleClick} />
                <Cuadrado id={4} handleClik={handleClick} />
                <Cuadrado id={5} handleClik={handleClick} />
                <Cuadrado id={6} handleClik={handleClick} />
                <Cuadrado id={7} handleClik={handleClick} />
                <Cuadrado id={8} handleClik={handleClick} />
            </div>
            <div>
                <div>
                    <h3 className='bg-yellow-500 m-4 rounded shadow-xl'>
                        {showMessage}

                    </h3>
                </div>
                <button
                    className="  bg-red-700 rounded-xl p-2 text-white"
                    onClick={limpiar}
                >Reiniciar Juego</button>
            </div>
        </div>
    )

}

export default Tabla;