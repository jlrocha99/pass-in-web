import React from 'react'
import ReactDOM from 'react-dom/client'
import {  App } from './app'
import './index.css'

// Componentes e Propriedades
// Componentes -> Funções que retorma um conteúdo html
// Propriedades -> Atributos de um combonente (src, heigth, alt)
//no jsx são os parâmetros da minha função

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>


        <App />
    </React.StrictMode>,
)
