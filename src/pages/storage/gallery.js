import React, { useState, useEffect } from 'react';
import firebase from '../../config/Firebase';

const db = firebase.firestore();

export default function App() {
    const [albums, setAlbums] = useState([
        {
            
        }
    ]);

    useEffect(() => {
        db.collection('albums').onSnapshot((snapshot) => {
            const tempAlbums = []
            snapshot.forEach(doc => {
                tempAlbums.push(doc.data());
            })
            setAlbums(tempAlbums)
        })
    })

    //Album
    return (
        <div>
            <section>
                {
                    albums.map(album => (
                        <aside key={albums.name}>
                            <img src={albums.image} alt="album " />
                            <h3>{albums.name}</h3>
                        </aside>
                    ))
                }

                <aside>
                    <img src="//s2.glbimg.com/q1aFkS_7Ducno9D2wUNhuG7KOz4=/e.glbimg.com/og/ed/f/original/2019/10/22/101819_jl_nikon_feat-1028x579.jpg" alt="açbum " />
                    <h3>Album1</h3>
                </aside>
                <aside>
                    <img src="//s2.glbimg.com/q1aFkS_7Ducno9D2wUNhuG7KOz4=/e.glbimg.com/og/ed/f/original/2019/10/22/101819_jl_nikon_feat-1028x579.jpg" alt="açbum " />
                    <h3>Album1</h3>
                </aside>
            </section>
        </div>
    )
};
