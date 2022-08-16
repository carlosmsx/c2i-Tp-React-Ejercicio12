import React, {useState} from 'react';
import ListaNoticias from './ListaNoticias';
import { Form } from 'react-bootstrap';
import Spinner from './Spinner'

const Formulario = () => {
    const apiKey = '0ee220cb193a4a54929b6e4dc46989b3'; //'b73be4b9b9ff4a54b30c97e0f4f98766';
    
    const paises = ['de','sa','ar','au','at','be','br','bg','ca','cn','co','cu','eg','sk','si','es','us','ph','fr','gr','nl','hk','hu','in','id','ie','il','it','jp','kr','lt','my','ma','mx','ng','no','nz','pl','pt','gb','cz','ro','ru','rs','sg','se','ch','th','tw','tr','ua','ve'];
    const paisesNombres = ['Alemania','Arabia Saudita','Argentina','Australia','Austria','Bélgica','Brasil','Bulgaria','Canada','China','Colombia','Cuba','Egipto','Eslovakia','Eslovenia','España','Estados Unidos','Filipinas','Francia','Grecia','Holanda','Hong Kong','Hungría','India','Indonesia','Irlanda','Israel','Italia','Japon','Korea','Lituania','Malasia','Marruecos','Mejico','Nigeria','Noruega','Nueva Zelanda','Polonia','Portugal','Reino Unido','República Checa','Rumania','Rusia','Serbia','Singapur','Suecia','Suiza','Tailandia','Taiwan','Turquía','Ucrania','Venezuela'];

    const [pais, setPais] = useState('todos');
    const [categoria, setCategoria] = useState('');
    const [listaNoticias, setListaNoticias] = useState([]);
    const [mostrarSpinner, setMostrarSpinner] = useState(false);

    const consultarAPI = async (category, country)=>{
        if (categoria==='ninguna')
            return;

        setMostrarSpinner(true);
        let url = (country==='todos')
                ?`https://newsapi.org/v2/top-headlines/sources?category=${category}&apiKey=${apiKey}`
                :`https://newsapi.org/v2/top-headlines/sources?category=${category}&country=${country}&apiKey=${apiKey}`
        const respuesta = await fetch(url);
        const lista = await respuesta.json();
        setListaNoticias(lista.sources);
        setMostrarSpinner(false);
    }

    const categoryChange = async (event)=>{
        setCategoria(event.target.value);
        await consultarAPI(event.target.value, pais);
    }

    const countryChange = async (event)=>{
        setPais(event.target.value);
        await consultarAPI(categoria, event.target.value);
    }

    return (
        <div className="container-fluid pt-4">
            <Form>
                <Form.Group className="mb-3 d-flex" controlId="formCategoria">
                    <Form.Label>Buscar por categoría</Form.Label>
                    <Form.Select onChange={categoryChange}>
                        <option value="ninguna">Seleccione una categoría...</option>
                        <option value="business">Negocios</option>
                        <option value="entertainment">Entretenimientos</option>
                        <option value="general">General</option>
                        <option value="health">Salud</option>
                        <option value="science">Ciencia</option>
                        <option value="sports">Deportes</option>
                        <option value="technology">Tecnologia</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 d-flex" controlId="formCategoria">
                    <Form.Label className="me-3">País</Form.Label>
                    <Form.Select onChange={countryChange}>
                        <option default value="todos">Todos</option>
                        {
                            paises.map((pais,posicion)=><option value={pais} key={posicion}>{paisesNombres[posicion]}</option>)            
                        }
                    </Form.Select>
                </Form.Group>
            </Form>
            <hr/>
            {(mostrarSpinner===true)?<Spinner/>:<ListaNoticias listaNoticias={listaNoticias}/>}
        </div>
    );
};

export default Formulario;