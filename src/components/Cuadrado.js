

const Cuadrado = ({ id, handleClik }) => {

    return (
        <div
            value={id}
            className="cuadrado"
            onClick={handleClik}
            key={id}
        >
        </div>
    )
}

export default Cuadrado;