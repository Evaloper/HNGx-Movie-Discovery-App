import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./index.scss"

const apiUrl = 'https://api.themoviedb.org/3';
const apiKey = import.meta.env.VITE_API_KEY;

export const MovieDetails = () => {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [trailerKey, setTrailerKey] = useState(null);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {

                const response = await fetch(
                    `${apiUrl}/movie/${id}?api_key=${apiKey}`
                );
                const data = await response.json();
                setMovie(data);


                const videosResponse = await fetch(
                    `${apiUrl}/movie/${id}/videos?api_key=${apiKey}`
                );
                const videosData = await videosResponse.json();


                const trailer = videosData.results.find(
                    (video) => video.type === 'Trailer'
                );

                if (trailer) {
                    setTrailerKey(trailer.key);
                }
            } catch (error) {
                console.error('Error fetching movie details:', error);
            }
        };

        fetchMovieDetails();
    }, [id]);

    if (!movie) {
        return <div className='text-black'>Loading...</div>;
    }

    return (
        <div className="movie-details text-black w-full">

            {trailerKey && (
                <div className="trailer">
                    <iframe
                        title={`${movie.title} Trailer`}
                        width="560"
                        height="315"
                        src={`https://www.youtube.com/embed/${trailerKey}`}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>

                </div>
            )}

            <div className='details'>
                <div className='title-runtime'>
                    <h1>{movie.title} * </h1>
                    <sub>{" " + movie.runtime}</sub>
                </div>
                <p className='details-date'>{movie.release_date}</p>
                <p className='details-overview'>{movie.overview}</p>
            </div>
        </div>
    );
};
