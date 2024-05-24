import React, { useState } from 'react';

const PokeCard = ({ name, image, type, overall, abilities }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="card w-full max-w-xs mx-auto bg-secondary shadow-xl text-white">
            <figure className="h-56 flex justify-center items-center ">
                <img src={image} alt={name} className="object-cover object-center h-40 w-auto" />
            </figure>
            <div className="card-body">
                <h2 className="card-title capitalize">{name}</h2>
                <p>Tipo: {type}</p>
                <div className="flex justify-end">
                    <button className="btn btn-primary bg-primary" onClick={() => setIsModalOpen(true)}>
                        <p>Ver detalhes</p>
                    </button>
                    {isModalOpen && (
                        <dialog className="modal w-full max-w-lg mx-auto sm:modal-middle" open>
                            <div className="modal-box bg-accent shadow-5xl">
                                <div className="hero w-full bg-accent">
                                    <div className="hero-content w-full max-w-xs flex-col">
                                        <h1 className="text-5xl font-bold">{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
                                        <img src={image} className="max-w-xs rounded-lg shadow-2xl" />
                                        <div>
                                            <ul className='text-lg'>
                                                <li>Type: {type}</li>
                                                <li>Skills: {abilities}</li>
                                                <li>Overall: {overall}</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="modal-action">
                                    <button className="btn bg-secondary text-white" onClick={() => setIsModalOpen(false)}>Close</button>
                                </div>
                            </div>
                        </dialog>
                    )}
                </div>
            </div>
        </div>
    );
}

export default PokeCard;
