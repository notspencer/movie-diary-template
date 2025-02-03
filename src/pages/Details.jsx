import { Router, Routes, Route, useParams } from 'react-router'; // ❌ This will break in web apps
import { useState, useEffect } from 'react';
import { IMG_URL } from '../data/tmdb';
import { getSingleMovie } from '../data/tmdb';

const Details = () => {
    const id = window.location.pathname.split('/').pop(); // Get movie ID from URL
    const [currMovie, setCurrMovie] = useState(null)

    useEffect(() => {
        (async () => {
            try { 
                const movieData = await getSingleMovie(id);
                setCurrMovie(movieData);
            } catch (error) {
                console.error('Error fetching movie:', error);
            }
        })();
    }, [id]);

    if (!currMovie) {
        return <div>Sorry, no movie found</div>;
    }

    return (
        <div className='card card-side bg-base-100 shadow-xl w-3/4 mx-auto'>
            <div className='hero bg-base-200 min-h-[50vh]'>
                <div className='hero-content flex-col lg:flex-row'>
                    <img
                        src={IMG_URL + currMovie?.poster_path}
                        alt={currMovie?.original_title}
                        className='max-w-sm rounded-lg shadow-2xl'
                    />
                    <div className="card-body">
                        <h1 className='text-5xl font-bold mb-2 card-title'> 
                            {currMovie?.original_title}
                        </h1>
                        <h2 className='text-3xl indent-4 mb-4'>
                            {currMovie?.tagline}
                        </h2>
                        <p className='mb-6'>{currMovie?.overview}</p>
                        <div>
                            <h3 className='font-bold'>Genres: </h3>
                            <ul className='list-disc ml-8'>
                                {currMovie?.genres?.map((genre) => (
                                    <li key={genre.id}>{genre.name}</li>
                                ))}
                            </ul>
                        </div>
                        <button onClick={() => window.history.back()} className="btn btn-primary mt-4">
                            ← Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Details;