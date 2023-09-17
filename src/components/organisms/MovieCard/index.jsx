import { useEffect, useState } from "react";
import axios from "axios";
import IMOB from "./../../../assets/IMOB.png";
import cherry from "./../../../assets/strawberry.png";
import favorite from "./../../../assets/Favorite.png";
import { Icon } from "../../atoms/Icons";
import "./index.scss";
import { Link } from "react-router-dom";

export const MovieCard = () => {
    const [movies, setMovies] = useState([]);
    const [displayedMovies, setDisplayedMovies] = useState([]);

    const countryAbbreviations = {
        "United States of America": "USA",
        "United Kingdom": "UK",
        "Nigeria": "NG",
        "China": "CHN",
        "Japan": "JP"
    };

    useEffect(() => {
        const fetchDefaultMovies = async () => {
            try {
                const apiKey = import.meta.env.VITE_API_KEY;
                const response = await axios.get(
                    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&language=en-US&page=1`
                );

                const randomMovies = response.data.results.slice(0, 10);
                setMovies(randomMovies);
                setDisplayedMovies(randomMovies);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchDefaultMovies();
    }, []);

    return (
        <>
            <div className="movie-card-header text-black flex justify-between items-center">
                <h2 className="text-2xl font-bold">Featured Movie</h2>
                <div className="text-[#BE123C] flex justify-between items-center">
                    <p>See more</p>
                    <Icon name="arrow-right" />
                </div>
            </div>
            <h3 className="text-black favorite">TV SERIES</h3>
            <div className="flex gap-x-8 main-div mx-24 max-[500px]:mx-0 max-[768px]:mx-0 max-[980px]:mx-10">
                <div className="w-full p-2 overflow-x-auto">
                    <ol className="grid grid-cols-4 max-[980px]:grid-cols-3 max-[768px]:grid-cols-2 max-[500px]:grid-cols-1 gap-6 max-[982px]:gap-2 ">
                        {displayedMovies.map((movie) => (
                            <Link to={`/movies/${movie.id}`} key={movie.id} className="div-sect" data-testid="movie-card">
                                <li className="p-4 mb-2 text-white">
                                    <div className="movie-box">
                                        <img src={favorite} className="favorite-btn float-right relative top-12 mr-5" alt="Favorite" />
                                        <img
                                            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                            alt={movie.title}
                                            data-testid="movie-poster"
                                        />
                                    </div>
                                    <div key={movie.id} className="card-main text-black">
                                        <p className="my-3 text-sm text-grey font-medium">
                                            {movie.productionCountries ? movie.productionCountries.join(", ") + " - " : ""}
                                            {movie.productionYear}
                                        </p>
                                        <h3 className="text-xl text-black" data-testid="movie-title">{movie.title}</h3>
                                        <div className="flex my-3 text-xs justify-between items-center">
                                            <div className="flex items-center">
                                                <img src={IMOB} alt="IMOB" />
                                                <span className="ml-2">
                                                    {movie.voteAverage ? `${movie.voteAverage}.0 / 100` : ""}
                                                </span>
                                            </div>
                                            <div className="flex mr-6 items-center">
                                                <img src={cherry} alt="Cherry" className="mr-2" />
                                                <span>
                                                    {movie.voteAverage ? `${movie.voteAverage}%` : ""}
                                                </span>
                                            </div>
                                        </div>
                                        <p className="text-sm text-grey font-medium">
                                            {movie.genres ? movie.genres.join(", ") : ""}
                                        </p>
                                        <p className="text-sm text-grey font-medium" data-testid="movie-release-date">{movie.releaseDate}</p>
                                    </div>
                                </li>
                            </Link>
                        ))}
                    </ol>
                </div>
            </div>
        </>
    );
};
