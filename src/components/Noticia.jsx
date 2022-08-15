import React from 'react';
import ReactCountryFlag from "react-country-flag"
import {Card} from 'react-bootstrap';
import './noticia.css'

const Noticia = (props) => {
    return (
        <div className="noticiaClass col-12 col-sm-6 col-md-3 px-2 pb-3">
            <Card>
                <Card.Header className="d-flex justify-content-evenly">
                    <ReactCountryFlag countryCode={props.noticia.country}/>
                    <ReactCountryFlag countryCode={props.noticia.country} svg />
                </Card.Header>
                <Card.Body>
                <Card.Title>{props.noticia.name}</Card.Title>
                <Card.Text>{props.noticia.description}</Card.Text>
                <a href={props.noticia.url}>ver mas...</a>
                </Card.Body>
            </Card>
        </div>
    );
};

export default Noticia;