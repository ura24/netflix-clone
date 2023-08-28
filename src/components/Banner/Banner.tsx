import { useEffect, useState } from "react";
import axios from "../../axios";
import { requests } from "../../request";
import './Banner.css';

type movieProps = {
    title?: string;
    name?: string;
    original_name?: string;
    backdrop_path?: string;
    overview?: string;
}

export const Banner = () => {
    const [movie, setMovie] = useState<movieProps>({});

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            console.log(request.data.result);

            // apiからランダムで値を取得する
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, [])
    console.log(movie);

    // 文章の文字数を制限する
    function truncate(str: any, num: number) {
        // undefinedを弾く
        if (str !== undefined) {
            return str.length > num ? str?.substr(0, num - 1) + "..." : str;
        }
    }

    return (
        <header
            className="Banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
                backgroundPosition: "center center"
            }}
        >
            <div className="Banner-contents">
                <h1 className="Banner-title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>

                <div>
                    <button className="Banner-button">Play</button>
                    <button className="Banner-button">My List</button>
                </div>

                <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
            </div>

            <div className="Banner-fadeBottom" />
        </header>
    )
}
