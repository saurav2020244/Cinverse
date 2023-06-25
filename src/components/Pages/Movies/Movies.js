import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import "./Movies.css"
//import CustomPagination from "../../Pagination/CustomPagination";
const Movies=()=>{
    
    const [content,setContent]=useState([]);


    const fetchMovies=async()=>{
        const { data } = await axios({
          method:"GET",
          // eslint-disable-next-line no-template-curly-in-string
          url: 'https://api.themoviedb.org/3/discover/movie?api_key=a1d69b225498714e27a5d5da58c050ea&include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc',
           //?api_key=a1d69b225498714e27a5d5da58c050ea&
           

          })
          //console.log(data);
        setContent(data.results);
        
        };   
        
        useEffect(() => {
            window.scroll(0, 0);
            fetchMovies();
         
          }, []);
    return(
        <div>
             <span className="pageTitle"> Movies</span>
             <div className="m">
                {
                    content && content.map((c)=>(
                       <SingleContent 
                       key={c.id}
                       id={c.id}
                       poster={c.poster_path}
                       title={c.title || c.name}
                       date={c.first_air_date || c.release_date}
                       media_type="movie"
                       vote_average={c.vote_average}
                       />
                    ))
                }
             </div>
             
        </div>
    );
};
export default Movies;

//<CustomPagination setPage={setPage} numOfPages={numOfPages} />