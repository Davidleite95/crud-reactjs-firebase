import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Noticias from './pages/noticias/index';
import Cadastro from './pages/noticias/cadastro';
import Editar from './pages/noticias/editar';
import Deletar from './pages/noticias/delete';
import Storage from './pages/storage/gallery';
import Home from './pages/home';

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/noticias" component={Noticias} />
        <Route path="/cadastro" component={Cadastro} />
        <Route path="/editar/:id" component={Editar} />
        <Route path="/delete/:id" component={Deletar} />
        <Route path="/storage" component={Storage} />
      </Switch>
    </BrowserRouter>
  );
}