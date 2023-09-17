import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import "./index.scss"
import { Footer, NavBar } from '../../organisms';

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

    useEffect(() => {
        const fetchMovieCredits = async () => {
            try {
                // Fetch movie credits
                const creditsResponse = await fetch(
                    `${apiUrl}/movie/${id}/credits?api_key=${apiKey}`
                );
                const creditsData = await creditsResponse.json();

                // Find the director(s) in the credits
                const directors = creditsData.crew.filter(
                    (member) => member.job === 'Director'
                );

                // Find the writer(s) in the credits
                const writers = creditsData.crew.filter(
                    (member) => member.job === 'Writer'
                );

                // Find the stars (actors) in the credits
                const stars = creditsData.cast;

                // Set the director(s), writer(s), and stars in the movie data
                setMovie((prevMovie) => ({
                    ...prevMovie,
                    directors,
                    writers,
                    stars,
                }));
            } catch (error) {
                console.error('Error fetching movie credits:', error);
            }
        };

        fetchMovieCredits();
    }, [id]);


    if (!movie) {
        return <div className='text-black'>Loading...</div>;
    }

    return (
        <>
            <NavBar />
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
                        <h1 data-testid="movie-title" >{movie.title}</h1>
                        <span>.</span>
                        <p className='details-date' data-testid="movie-release-date">{movie.release_date}</p>
                        <span>.</span>
                        <p data-testid="movie-runtime">{+ movie.runtime}</p>
                    </div>
                    <p className='details-overview' data-testid="movie-overview">{movie.overview}</p>
                    <div className="characters">
                        <p>Director: <span className='character-span'>{movie.directors && movie.directors.map(director => director.name).join(', ')}</span></p>
                        <p>Writer: <span className='character-span'> {movie.writers && movie.writers.map(writer => writer.name).join(', ')}</span></p>
                        <p>Stars: <span className='character-span'>{movie.stars && movie.stars
                            .sort((a, b) => b.popularity - a.popularity)
                            .slice(0, 5)
                            .map(star => star.name)
                            .join(', ')
                        }</span></p>
                    </div>

                </div>
            </div>
            <Footer />
        </>
    );
};
