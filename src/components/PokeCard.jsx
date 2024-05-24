import React from 'react';
const PokeCard = ({ name, image, type }) => {
    return (
        <div className="card w-full max-w-xs mx-auto bg-secondary shadow-xl text-white">
            <figure className="h-56 flex justify-center items-center ">
                <img src={image} alt={name} className="object-cover object-center h-40 w-auto" />
                </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">{name}</h2>
                <p>Tipo: {type}</p>
                <div className="flex justify-end">
                    <button className="btn btn-primary bg-primary">
                        <p>Ver detalhes</p>
                        </button>
                </div>
            </div>
        </div>
    );
}
export default PokeCard;