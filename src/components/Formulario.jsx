import React, {useState} from 'react';
import ListaNoticias from './ListaNoticias';
import { Form } from 'react-bootstrap';
import Spinner from './Spinner'

const Formulario = () => {
    const apiKey = 'b73be4b9b9ff4a54b30c97e0f4f98766';
    //https://newsapi.org/v2/top-headlines/sources?category=general&apiKey=b73be4b9b9ff4a54b30c97e0f4f98766

    const [listaNoticias, setListaNoticias] = useState([]);
    const [mostrarSpinner, setMostrarSpinner] = useState(false);

    const consultarAPI = async (category)=>{
        setMostrarSpinner(true);
        const respuesta = await fetch(`https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${apiKey}`);
        const dato = await respuesta.json();
        setListaNoticias(dato.sources);
        setMostrarSpinner(false);
    }

    const change = (event)=>{
        if (event.target.value.length>0)
            consultarAPI(event.target.value);
    }

    return (
        <div className="container-fluid pt-4">
            <Form>
                <Form.Group className="mb-3 d-flex" controlId="formCategoria">
                    <Form.Label>Buscar por categoría</Form.Label>
                    <Form.Select onChange={change}>
                        <option value="">seleccione una categoría...</option>
                        <option value="business">Negocios</option>
                        <option value="entertainment">Entretenimientos</option>
                        <option value="general">General</option>
                        <option value="health">Salud</option>
                        <option value="science">Ciencia</option>
                        <option value="sports">Deportes</option>
                        <option value="technology">Tecnologia</option>
                    </Form.Select>
                </Form.Group>
            </Form>
            <hr/>
            {(mostrarSpinner===true)?<Spinner/>:<ListaNoticias listaNoticias={listaNoticias}/>}
        </div>
    );
};

export default Formulario;