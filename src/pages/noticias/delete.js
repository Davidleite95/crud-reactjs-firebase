import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import { Link } from 'react-router-dom';

class Editar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            noticias: {},
            key: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('noticias').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                this.setState({
                    noticias: doc.data(),
                    key: doc.id,
                    isLoading: false
                });
            } else {
                console.log("No such document!");
            }
        });
    }
    delete(id) {
        firebase.firestore().collection('noticias').doc(id).delete().then(() => {
            console.log("Noticia deletado com Sucesso!");
            this.props.history.push("/noticias")
        }).catch((error) => {
            console.error("Erro ao remover noticia: ", error);
        });
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Deletar Notícias</h4>
                        </div>
                        <div className="card-body">
                            <dl>
                                <label className="bmd-label-floating">Título da Notícia</label>
                                <dd>{this.state.noticias.titulo}</dd>
                            </dl>
                            <Link to={`/editar/${this.state.key}`} class="btn btn-success">Editar</Link>&nbsp;
                            <button onClick={this.delete.bind(this, this.state.key)} class="btn btn-danger">Excluir</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editar;