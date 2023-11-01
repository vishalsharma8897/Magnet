import {React,useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import "./style.scss"
import useFetch from '../../../hooks/useFetch';
import {useSelector } from 'react-redux/es/hooks/useSelector';
import Img from "../../../components/lazyLoadImage/Img"
import ContentWrapper from '../../../components/contentWrapper/contentWrapper';

const HeroBanner = () => {
    const {url} = useSelector((state)=>state.home);
    const [query,setQuery]= useState("");
    const [background,setbackground] = useState("");

    const {data,loading,error} =useFetch("/movie/upcoming");
 
    useEffect(()=>{
     const bg = url.backdrop+data?.results[Math.floor(Math.random()*20)]?.backdrop_path;
     setbackground(bg);
   
    },[data])
    
  
    
    const navigate= useNavigate();

    const handleOnChange=(event)=>{
        setQuery(event.target.value);
    }

    const searchQueryHandler=(event)=>{
      if(event.key==="Enter" && query.length>0)
      {
         navigate(`/search/${query}`);
      }
    }


  return (
      <div className="heroBanner">

        {!loading && <div className="backdrop_img">
          <Img src={background} className=""/> 
        </div>}

        <div className="opacity-layer">
          
        </div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome.</span>
                <span className="subTitle">
                    Millions of Movies, shows and People 
                    to discover.
                    Explore now.
                </span>
                <div className="searchInput">

                    <input 
                    type="text" 
                    placeholder="Search for a movie or a show"  
                    onKeyUp={searchQueryHandler}
                    onChange={handleOnChange}
                    />
    

                    <button>Search</button>

                </div>
            </div>
        </ContentWrapper>
      </div>
  
  )
}

export default HeroBanner
