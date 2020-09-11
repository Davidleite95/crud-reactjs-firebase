import React, { Component } from 'react';
import firebase from '../../config/Firebase';
import { Link } from 'react-router-dom';

class Editar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titulo: '',
            resumo: '',
            imagem: '',
            data_publicacao: '',
            conteudo: ''
        };
    }

    componentDidMount() {
        const ref = firebase.firestore().collection('noticias').doc(this.props.match.params.id);
        ref.get().then((doc) => {
            if (doc.exists) {
                const noticias = doc.data();
                this.setState({
                    key: doc.id,
                    titulo: noticias.titulo,
                    resumo: noticias.resumo,
                    imagem: noticias.imagem,
                    data_publicacao: noticias.data_publicacao,
                    conteudo: noticias.conteudo
                });
            } else {
                console.log("No such document!");
            }
        });
    }

    onChange = (e) => {
        const state = this.state
        state[e.target.name] = e.target.value;
        this.setState({ noticias: state });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const { titulo, resumo, imagem, data_publicacao, conteudo } = this.state;

        const updateRef = firebase.firestore().collection('noticias').doc(this.state.key);
        updateRef.set({
            titulo,
            resumo,
            imagem,
            data_publicacao,
            conteudo
        }).then((docRef) => {
            this.setState({
                titulo: '',
                resumo: '',
                imagem: '',
                data_publicacao: '',
                conteudo: ''
            });
            //this.props.history.push("/editar/" + this.props.match.params.id)
            this.props.history.push("/noticias")

        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
    }

    render() {
        const { titulo, resumo, imagem, conteudo } = this.state;

        return (
            <div className="row">
                <div className="col-md-12">
                    <div className="card">
                        <div className="card-header card-header-primary">
                            <h4 className="card-title">Editar Notícias</h4>
                        </div>
                        <div className="card-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Título da Notícia</label>
                                            <input type="text" className="form-control" name="titulo" value={titulo} onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-8">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Resumo</label>
                                            <input type="text" className="form-control" name="resumo" value={resumo} onChange={this.onChange} />
                                        </div>
                                    </div>
                                    <div className="col-md-4">
                                        <div className="form-group">
                                            <label className="bmd-label-floating">Link da Imagem da Capa</label>
                                            <input type="text" className="form-control" name="imagem" value={imagem} onChange={this.onChange} />
                                        </div>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="form-group">
                                            <label>Couteúdo</label>
                                            <div className="form-group">
                                                <label className="bmd-label-floating">Escreva todo o conteúdo da notícia.</label>
                                                <textarea className="form-control" rows={5} name="conteudo" value={conteudo} onChange={this.onChange} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-primary pull-right">Salvar</button>
                                <Link to="/noticias" className="btn btn-sucess pull-right">Voltar</Link>
                                <div className="clearfix" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Editar;