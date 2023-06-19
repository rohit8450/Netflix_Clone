import React, { useState,useEffect } from 'react';
import "./Home.scss";
import axios from 'axios';
import {Link} from "react-router-dom";
import {BsFillPlayFill} from "react-icons/bs";
import{AiOutlinePlus} from "react-icons/ai";


const apikey = "63dd2f81e07ee863b58fe14051873457";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => {console.log("card img",img) 
  return(
      <img className='card' src={img} alt="cover" />

  )}
  

const Row = ({
  title,
   arr=[
   
] }) => (
    

  <div className='row'>
  <h2>{title}</h2>
   <div>
   {

    arr.map((item, index)=>{  console.log(`${imgUrl}/${item.poster_path}`) 
      return (
     
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    )})
   }

   </div>  
   </div>
 
)
const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([]);
    const [nowPlaynigMovies, setNowPlayingMovies] = useState([]);
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [genre, setGenre] = useState([]);

    useEffect(() =>{
      const fetchUpcoming = async()=>{
         const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}&page=5`)
       
         setUpcomingMovies(results);

      };
      const fetchnowPlaying = async()=>{
        const {data: {results}} = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apikey}`)
      
        setNowPlayingMovies(results);

     };
     const fetchpopular = async()=>{
      const {data: {results}} = await axios.get(`${url}/movie/${popular}?api_key=${apikey}`)
      
      setPopularMovies(results);

   };
   const fetchtopRated = async()=>{
    const {data: {results}} = await axios.get(`${url}/movie/${topRated}?api_key=${apikey}`)
   
    setTopRatedMovies(results);

 };
 const getAllGenre = async()=>{
  const {data: {genres}} = await axios.get(`${url}/genre/movie/list?api_key=${apikey}`)
 
  setGenre(genres);
  console.log(genres);
};

      getAllGenre();
      fetchUpcoming();
      fetchnowPlaying();
      fetchpopular();
      fetchtopRated();

    }, [])

// console.log(popularMovies[0].overview)
  return (
    
    <section className='home'>
      <div className="banner" style={{
        backgroundImage: popularMovies[0] ? `url(${`${imgUrl}/${popularMovies[0].poster_path}`})` 
        : "rgb(16,16,16)"
      }}>


      {popularMovies[0] && <h1>{popularMovies[0].original_title}</h1>}
      {popularMovies[0] && <p>{popularMovies[0].overview}</p>}

        <div>

        <button><BsFillPlayFill  /> Play </button>
        <button>My List< AiOutlinePlus/></button>

        </div>
      </div>

     
      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlaynigMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topRatedMovies}/>

      <div className="genreBox">
        {genre.map((item)=>(
            <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}
      </div>

     
    </section>
  )
}

export default Home;
