import React, { useEffect, useState } from 'react';
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

export default function UpdateMovie(props) {
    const [movie, setMovie] = useState(initialState)

    useEffect(() => {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => setMovie(res.data))
        .catch(err => console.log(err))
    }, [props.match.params.id])

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
        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            setMovie(initialState)
            props.history.push(`/movies/${props.match.params.id}`)
        })
        .catch(err => console.log(err))
    }
    return (
        <div>
            <h1>Update Movie!</h1>
            <form onSubmit={handleSubmit}>
                <input type='text' name='title' value={movie.title} onChange={handleChange} placeholder='Title'></input>
                <input type='text' name='director' value={movie.director} onChange={handleChange} placeholder='Director'></input>
                <input type='text' name='metascore' value={movie.metascore} onChange={handleChange} placeholder='Metascore'></input>
                {movie.stars.map((star, idx) => <input key={star[idx]} type='text' name='stars' value={star} onChange={(e) => starsChangeHandler(idx, e)} placeholder='Actors'></input>)}
                <button>Update Movie</button>
            </form>
        </div>
    )
}
// const starsOnChangeHandler = (idx, e) => {
//     const updatedStars = [...movie.stars]
//     updatedStars[idx] = e.target.value
//     setMovie({
//       ...movie,
//       stars: updatedStars
//     })
//   }