import { useEffect, useState } from "react";
import axios from "../../axios";
import './Row.css';

const base_url = "https://image.tmdb.org/t/p/original";

type Props = {
    title: string;
    fetchUrl: string;
};

type Movie = {
    id: string;
    name: string;
    title: string;
    original_name: string;
    poster_path: string;
};

export const Row = ({ title, fetchUrl }: Props) => {
    const [movies, setMovies] = useState<Movie[]>([]);

    // fetchUrlが更新される度に映画データを取得して更新
    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    console.log(movies)

    return (
        <div className="Row" >
            <h2>{title}</h2>
            <div className="Row-posters">
                {movies.map((movie, i) => (
                    <img key={movie.id} className={`Row-poster`} src={`${base_url}${movie.poster_path}`} alt={`${movie.name}`} />
                ))}
            </div>
        </div>
    );
};
