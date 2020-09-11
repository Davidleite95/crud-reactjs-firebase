import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../config/Firebase';

class Index extends Component {
    constructor(props) {
        super(props);
        this.ref = firebase.firestore().collection('noticias');
        this.unsubscribe = null;
        this.state = {
            noticias: []
        };
    }

    onCollectionUpdate = (querySnapshot) => {
        const noticias = [];
        querySnapshot.forEach((doc) => {
            const { titulo, resumo, imagem, data_publicacao, conteudo } = doc.data();
            noticias.push({
                key: doc.id,
                titulo,
                resumo,
                imagem,
                data_publicacao,
                conteudo
            });
        });
        this.setState({
            noticias
        });
    }

    componentDidMount() {
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    }

    render() {
        return (
            <div className="col-md-12" >
                <div className="card">
                    <div className="card-header card-header-primary">
                        <h4 className="card-title ">Minhas Notícias</h4>
                        <p className="card-category">Faça suas postagens e deixe seu cliente atualizado!</p>
                    </div>
                    <div className="card-body">
                        <Link type="submit" className="btn btn-primary pull-left" to="/cadastro">Nova Notícia<div className="ripple-container"></div></Link>
                        <div className="table-responsive">
                            <table className="table">
                                <thead className="text-primary">
                                    <tr>
                                        <th>ID</th>
                                        <th>Titulo</th>
                                        <th>Resumo</th>
                                        <th>Data Publicação</th>
                                        <th>Ações</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {this.state.noticias.map((noticia) =>
                                        <tr key={noticia.key}>
                                            <td>{noticia.key}</td>
                                            <td><Link to={`/editar/${noticia.key}`}>{noticia.titulo}</Link></td>
                                            <td>{noticia.resumo}</td>
                                            <td>{noticia.data_publicacao}</td>
                                            <td>
                                                <Link to={`/editar/${noticia.key}`} type="button" rel="tooltip" title="" className="btn btn-white btn-link btn-sm" data-original-title="Edit Task">
                                                    <i className="material-icons">edit</i>
                                                </Link>
                                                <Link to={`/delete/${noticia.key}`} rel="tooltip" title="" className="btn btn-white btn-link btn-sm" data-original-title="Remove">
                                                    <i className="material-icons">close</i>
                                                </Link>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default Index;