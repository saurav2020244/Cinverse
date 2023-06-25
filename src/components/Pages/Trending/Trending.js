
import axios from "axios";
import { useEffect, useState } from "react";
import SingleContent from "../../SingleContent/SingleContent";
import "./Trending.css"
//import CustomPagination from "../../Pagination/CustomPagination";
const Trending=()=>{
 //const [current, setPage] = useState(1);
 const [content,setContent]=useState([]);  
 const fetchTrending=async()=>{
  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/all/week?api_key=a1d69b225498714e27a5d5da58c050ea&language=en-US`
  );
    
    console.log(data);
    setContent(data.results);
    };   
    
    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);
    
    return(
        <div>
             <span className="pageTitle">Discover Trending</span>
             <div className="trending">
                {
                    content && content.map((c)=>(
                       <SingleContent 
                       key={c.id}
                       id={c.id}
                       poster={c.poster_path}
                       title={c.title || c.name}
                       date={c.first_air_date || c.release_date}
                       media_type={c.media_type}
                       vote_average={c.vote_average}
                       />
                    ))
                }
             </div>
             
        </div>
    );
};
export default Trending;

//<CustomPagination setPage={setPage}/>