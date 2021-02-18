import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import styled from '@emotion/styled';
import Frase from './components/Frase'
import { translate } from 'google-translate-api-wrapper'

const Contenedor = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  @media (min-width: 992px) {
    padding-top: 5rem;
  }
`;

const Boton = styled.button`
  background: -webkit-linear-gradient(top left, #007d35 0%, #007d35 40%, #0f574e 100%);
  background-size: 300px;
  font-family: Arial, Helvetica, sans-serif;
  color: #fff;
  margin-top: 3rem;
  padding: 1rem 3rem;
  font-size: 2rem;
  border: 2px solid #000;
  transition: background-size .8s ease;

  :hover {
    cursor: pointer;
    background-size: 400;
  }
`;

function App() {

  // State de frases
  const [frase, setFrase] = useState({})

  const consultarApi = async () => {
    const api = await fetch('https://breaking-bad-quotes.herokuapp.com/v1/quotes');
    const frase = await api.json();
    const frase_traducida = {
      quote: await translate(frase[0].quote, { to: 'es', from: 'en', key: 'AIzaSyAEmKRCwfou4DqIoP8o6lrlt2nHbi8Af9g' }),
      author: frase[0].author,
    };
    setFrase(frase_traducida);
  }

  // Cargar una frase
  useEffect(() => {
    consultarApi();
  }, [])

  return (
    <Contenedor>
      <Frase frase={ frase }></Frase>
      <Boton onClick={ consultarApi }>Obtener frase</Boton>
    </Contenedor>
  );
}

export default App;
