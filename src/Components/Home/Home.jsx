import React, { useState,useEffect } from 'react';
import "./Home.scss";
import axios from 'axios';


const apikey = "63dd2f81e07ee863b58fe14051873457";
const url = "https://api.themoviedb.org/3";
const imgUrl = "https://image.tmdb.org/t/p/original"
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => (
      <img className='card' src={img} alt="cover" />
  )

const Row = ({
  title,
   arr=[
   
] }) => (
    

  <div className='row'>
  <h2>{title}</h2>
   <div>
   {
    arr.map((item, index)=>(
        <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
    ))
   }
   </div>  
   </div>
 
)
const Home = () => {

    const [upcomingMovies, setUpcomingMovies] = useState([])
    const [nowPlaynigMovies, setNowPlayingMovies] = useState([])
    const [popularMovies, setPopularMovies] = useState([])
    const [topRatedMovies, setTopRatedMovies] = useState([])

    useEffect(() =>{
      const fetchUpcoming = async()=>{
         const {data: {results}} = await axios.get(`${url}/movie/${upcoming}?api_key=${apikey}`)
       
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

      fetchUpcoming();
      fetchnowPlaying();
      fetchpopular();
      fetchtopRated();

    }, [])


  return (
    
    <section className='home'>
      <div className="banner"></div>

     
      <Row title={"Upcoming"} arr={upcomingMovies}/>
      <Row title={"Now Playing"} arr={nowPlaynigMovies}/>
      <Row title={"Popular"} arr={popularMovies}/>
      <Row title={"Top Rated"} arr={topRatedMovies}/>

     
    </section>
  )
}

export default Home;
