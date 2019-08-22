import React, { useState } from 'react';
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: ['']
}

export default function AddMovie(props) {
    const [movie, setMovie] = useState(initialState)

    const handleChange = e => {
        setMovie({...movie, [e.target.name]: e.target.value})
    }

    const starsChangeHandler = (idx, e) => {
        const updatedStars = [...movie.stars]
        updatedStars[idx] = e.target.value
        setMovie({
        ...movie,
        stars: updatedStars
        })
    }

    const handleSubmit = e => {
        e.preventDefault()
        axios.post(`http://localhost:5000/api/movies`, movie)
        .then(res => {
            setMovie(initialState)
            props.history.push(`/`)
        })
        .catch(err => console.log(err))
    }

    const addActors = e => {
        e.preventDefault()
        setMovie({...movie,
            stars: [...movie.stars, '']
        })
    }
    return (
        <div className='form-wrapper'>
            <h1>Add a Movie!</h1>
            <form className='form' onSubmit={handleSubmit}>
                <input className='input-style' type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Title'></input>
                <input className='input-style' type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Director'></input>
                <input className='input-style' type='text' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Metascore'></input>
                {movie.stars.map((star, idx) => <input className='input-style' key={idx} type='text' name='stars' value={star} onChange={(e) => starsChangeHandler(idx, e)} placeholder={`Actor ${idx + 1}`}></input>)}
                <button className='form-btn actor-btn' onClick={addActors}>Add More Actors</button>
                <button className='form-btn post-btn'>Add Movie</button>
            </form>
        </div>
    )
}