import React, { useEffect, useState } from 'react';
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function AddMovie(props) {
    const [movie, setMovie] = useState(initialState)

    // useEffect(() => {
    //     axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
    //     .then(res => setMovie(res.data))
    //     .catch(err => console.log(err))
    // }, [props.match.params.id])

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/movies}`, movie)
        .then(res => {
            setMovie(initialState)
            props.history.push(`/movies/${props.match.params.id}`)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Add a Movie!</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Title'></input>
                <input type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Director'></input>
                <input type='text' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Metascore'></input>
                <input type='text' name='stars' value={movie.stars} onChange={handleChange} placeholder='Actors'></input>
                <button>Update Movie</button>
            </form>
        </div>
    )
}