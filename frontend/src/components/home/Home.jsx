import React, { useEffect, useState } from 'react';
import Featured from '../featured/Featured';
import Footer from '../footer/Footer';
import List from '../list/List';
import Navbar from '../navbar/Navbar';
import "./home.css";
import axios from "axios";



export default function Home(props) {

    const [movieList, setMovieList] = useState([]);

    useEffect(
        () => {
            const fetchMovies = async () => {
                try {
                    const res = await axios.get("http://127.0.0.1:8000/api/v1/movies");
                    setMovieList(res.data.data)
                } catch (err) {
                    console.log(err);
                }
            }
            fetchMovies()
        },
        [props]
    )

    return (
        <div className='bg-main overflow-hidden'>
            <Navbar></Navbar>
            <Featured type={props.type}></Featured>
            <List list={movieList} listname="Trending Movies"></List>
            <Footer></Footer>
        </div>
    )
}
