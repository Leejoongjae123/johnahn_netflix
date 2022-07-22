import axios from "../api/axios";
import React, { useState, useEffect } from "react";
import requests from "../api/requests";
import './Banner.css'
import styled from 'styled-components'

const Banner = () => {
  const [movie, setMovie] = useState([]);
  const [isClicked,setIsClicked]=useState(false)
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    //현재 상영중인 영화 정보를 가져온다.(여러영화)
    const {
      data: { results },
    } = await axios.get(requests.fetchNowPlaying);
    // console.log(results)
    const movieId = results[Math.floor(Math.random() * results.length)].id;
    // console.log(movieId)
    const { data: movieDetail } = await axios.get(`movie/${movieId}`, {
      params: { append_to_response: "videos" },
    });
    setMovie(movieDetail);
  };
  
  const truncate=(str,n)=>{
    return str?.length>n ? str.substr(0,n-1)+"...":str;
  }
  if(!isClicked){
    return (
      <header
        className="banner"
        style={{
          backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
          backgroundPosition: "top center",
          backgroundSize: "cover",
        }}
      >
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie.title||movie.name||movie.original_name}</h1>
        <div className='banner__buttons'>
          <button onClick={()=>{setIsClicked(true)}} className='banner_button play'>Play</button>
          <button className='banner_button info'>More Information</button>
        </div>
      <h1 className='banner__description'>{truncate(movie.overview,100)}</h1>  
      </div>
      <div className="banner--fadeBottom"></div>      
      </header>
    );
  } else{
    return (
      <Container>
        <HomeContainer>
          <Iframe
           width="560"
           height="315"
           src={`https://www.youtube.com/embed/${movie.videos.results[0].key}?controls=0&autoplay=1&loop=1&mute=1&playlist=${movie.videos.results[0].key}`}           
           title="YouTube video player" 
           frameborder="0" 
           allow="autoplay; fullscreen" 
           allowfullscreen>

           </Iframe>
        </HomeContainer>
      </Container>
    )
  }

};

export default Banner;


const Iframe=styled.iframe`
  width:100%;
  height:100%;
  z-index:-1;
  opacity:0.65 ;
  border:none;

  &::after{
    content:"";
    position: absolute;
    top:0;
    left:0;
    width:100%
    height:100%;
  }
`

const Container=styled.div`
  display:flex;
  justify-content:center ;
  align-items:center ;
  flex-direction: column;
  width:100%;
  height:100vh;
`

const HomeContainer=styled.div`
  width:100%;
  height:100%;
`
