import { Badge } from "@mui/material";
import "./SingleContent.css";
import ContentModal from "../ContentModal/ContentModal";
const img_300 = "https://image.tmdb.org/t/p/w300";
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";




const SingleContent=({
    id,
    poster,  // like a argument in a fuction , all this is given from where is called
    title,
    date,
    media_type,
    vote_average,
    })=>{

    return(<ContentModal media_type={media_type} id={id} >
        <Badge badgeContent={vote_average} color={vote_average>6?'primary':'secondary'}/>
        <img classname='poster' src={poster?`${img_300}/${poster}`:unavailable} alt="{title}"/>
        <b className="title">{title}</b>
        <span className="sunTitle">
            {media_type==="tv"?" Series":"Movie"}
            
            <span className="sunTitle">{date}</span>

        </span>
    </ContentModal>);
};
export default SingleContent;