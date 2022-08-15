import React from 'react';
import Noticia from './Noticia';

const ListaNoticias = (props) => {
    return (
        <div className="container-fluid">
            <div className="row justify-content-start">
                {
                    props.listaNoticias.map((item,posicion)=><Noticia noticia={item} key={posicion}/>)            
                }
            </div>
        </div>
    );
};

export default ListaNoticias;