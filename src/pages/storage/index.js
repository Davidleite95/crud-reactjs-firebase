/*
import React, { Component } from 'react';
import firebase from '../../config/Firebase';
const storage = firebase.storage().ref()
class FileUpload extends Component {
    constructor() {
        //construtor inicia ante de tudo
        super()
        this.state = {
            uploadValue: 0,
            lithuania: '',
            uk: ''
        }

        this.getImage('teste');
        this.getImage('teste');
    }

    //upload
    handleOnChange = (event) => {
        event.preventDefault();
        const file = event.target.files[0]
        const storageRef = firebase.storage().ref(`pictures/${file.name}`)
        const task = storageRef.put(file)

        task.on('state_changed', (snapshot) => {
            let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            this.setState({
                uploadValue: percentage
            })
        }, (error) => {
            this.setState({
                message: 'Ocorreu algum erro!',
            })
        }, () => {
            this.setState = () => ({
                message: 'Upload feito com sucesso!',
                picture: task.snapshot.ref.getDownloadURL()
                //picture: task.snapshot.downloadURL
            })
        })
    }

    getImage(image) {
        let { state } = this
        storage.child(`${image}.png`).getDownloadURL().then((url) => {
            state[image] = url
            this.setState(state)
        }).catch((error) => {
            // Handle any errors
        })
    }


    render() {
        console.log(this.imgUrl);
        return (
            <div>
                <div className="card-header card-header-primary">
                    <h4 className="card-title ">Minha galeira de Fotos</h4>
                    <p className="card-category">Faça upload das imagnes!</p>
                </div>
                <hr />
                <span style={{ color: "#ffffff" }}>Processamento do Upload da Imagem:</span>
                <progress className="progress progress-bar w-100" value={this.state.uploadValue} max='100' style={{ color: "red" }}>
                    {this.state.uploadValue} %
                    </progress>
                <br />
                <input type='file' style={{ color: "#ffffff" }} onChange={this.handleOnChange.bind(this)} />
                <br />
                <hr />
                <div className="row">
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card-chart">
                            <div className="card-header card-header-success">
                                <img src="//s2.glbimg.com/q1aFkS_7Ducno9D2wUNhuG7KOz4=/e.glbimg.com/og/ed/f/original/2019/10/22/101819_jl_nikon_feat-1028x579.jpg" alt="Imagem" width="335px" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">IMAGEM 1</h4>
                                <p className="card-category">https://firebasestorage.googleapis.com/v0/b/projeto-abemec.appspot.com/o/img01.jpg?alt=media&token=d4d1861a-88e4-4c10-b431-85db9e6bf68c</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card-chart">
                            <div className="card-header card-header-success">
                                <img src="//s2.glbimg.com/q1aFkS_7Ducno9D2wUNhuG7KOz4=/e.glbimg.com/og/ed/f/original/2019/10/22/101819_jl_nikon_feat-1028x579.jpg" alt="Imagem" width="335px" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">IMAGEM 1</h4>
                                <p className="card-category">https://firebasestorage.googleapis.com/v0/b/projeto-abemec.appspot.com/o/img01.jpg?alt=media&token=d4d1861a-88e4-4c10-b431-85db9e6bf68c</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-12">
                        <div className="card card-chart">
                            <div className="card-header card-header-success">
                                <img src="//s2.glbimg.com/q1aFkS_7Ducno9D2wUNhuG7KOz4=/e.glbimg.com/og/ed/f/original/2019/10/22/101819_jl_nikon_feat-1028x579.jpg" alt="Imagem" width="335px" />
                            </div>
                            <div className="card-body">
                                <h4 className="card-title">IMAGEM 1</h4>
                                <p className="card-category">https://firebasestorage.googleapis.com/v0/b/projeto-abemec.appspot.com/o/img01.jpg?alt=media&token=d4d1861a-88e4-4c10-b431-85db9e6bf68c</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    };
}

export default FileUpload;