import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import axios from "axios";
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useState } from 'react';
import { useEffect } from 'react';
import "./ContentModal.css";
const img_300 = "https://image.tmdb.org/t/p/w300";
export const img_500 = "https://image.tmdb.org/t/p/w500";
export const unavailableLandscape =
  "https://user-images.githubusercontent.com/10515204/56117400-9a911800-5f85-11e9-878b-3f998609a6c8.jpg";
export const unavailable =
  "https://www.movienewz.com/img/films/poster-holder.jpg";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: "80%",
  height:"80%",
  bgcolor: '#18293b',
  border: "1px solid #282c34",
  borderRadius: 10,
  
};

export default function ContentModal({children,media_type,id}) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [content, setContent] = useState();
  const[video,setVideo]=useState();
  const fetchData=async ()=>{
    const{data}=await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}?api_key=a1d69b225498714e27a5d5da58c050ea&language=en-US`
    );
    setContent(data);
  }; 
 
  
  const fetchVideo=async ()=>{
    const{data}=await axios.get(
        `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=a1d69b225498714e27a5d5da58c050ea&language=en-US`);
        console.log(data);
        setVideo(data.results[0]?.key);
  }; 
   
  useEffect(() => {
    fetchData();
    fetchVideo();
    // eslint-disable-next-line
  }, []);
  return (
    <div>
      <div className="media" onClick={handleOpen}>
        {children}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>

           {content &&  (<div className='ContentModal'>
                 <img
                  src={
                    content.poster_path
                      ? `${img_300}/${content.poster_path}`
                      : unavailable
                  }
                  alt={content.name || content.title}
                  className="ContentModal__portrait"
                />
                <img
                  src={
                    content.backdrop_path
                      ? `${img_500}/${content.backdrop_path}`
                      : unavailableLandscape
                  }
                  alt={content.name || content.title}
                  className="ContentModal__Lanscape"
                />

                <div className='contentmodal_about'>
                    <span className='contentModal_title'>
                        {content.name || content.title}(
                        {(
                            content.first_air_date || content.release_date ||
                            "----"
                        ).substring(0,4)}
                        )
                    </span>
                
                {content.tagline && (
                    <i className="tagline">{content.tagline}</i>
                )}

                <span className="ContentModal__description">
                    {content.overview}
                </span>
                
                <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Teaser
                  </Button>


                </div>
            
            </div>)}
        </Box>
      </Modal>
    </div>
  );
}

