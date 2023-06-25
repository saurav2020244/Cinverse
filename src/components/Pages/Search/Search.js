import { Button, Tab, Tabs, TextField, ThemeProvider, createTheme } from "@mui/material";
//import SearchIcon from "@material-ui/icons/Search";
//import { useState } from "react";
import "./Search.css";
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import axios from "axios";
import SingleContent from "../../SingleContent/SingleContent";

const Search=()=>{
    const [type, setType] = useState(0);
    const[page,setPage]=useState(1);
    const [searchText, setSearchText] = useState("");
    const[content,setContent]=useState();
    const darktheme=createTheme({
        palette:{
          type:"dark",
          primary:{
            main:"#fff",//white
          }
        }
      });

      const fetchSearch=async()=>{
        
          const { data } = await axios.get(
            `https://api.themoviedb.org/3/search/${type?"tv":"movie"}?api_key=a1d69b225498714e27a5d5da58c050ea&query=${searchText}&include_adult=false&language=en-US&page=${page}` 
     
          );
          setContent(data.results);
          
          // console.log(data);
        
      };
      useEffect(()=>{
        window.scroll(0,0);
        fetchSearch();
      // eslint-disable-next-line react-hooks/exhaustive-deps
      },[type])

    
    return(
        <div>
            <ThemeProvider theme={darktheme}>
            <div style={{display:"flex",margin:"15px 0"}}>
            <TextField
                className="searchBox"
                style={{flex:1}}
                label="search"
                variant="filled"
                onChange={(e)=>setSearchText(e.target.value)}
            />
            <Button variant="contained" style={{marginLeft:10}} onClick={fetchSearch}>
              <SearchIcon/>
            </Button>
            </div>
            <Tabs value={type} indicatorColor="primary" textColor="#fff"
              onChange={(event,newValue)=>{
              setType(newValue);
              setPage(1);
              }}
            >
            <Tab style={{width:"50%"}} label=" Movies " textColor="#fff"/>
            <Tab style={{width:"50%"}} label=" TV Series " textColor="#fff"/>
            </Tabs>
            </ThemeProvider>
            <div className="trending">
              {content &&
              content.map((c) => (
                <SingleContent
                key={c.id}
                id={c.id}
                poster={c.poster_path}
                title={c.title || c.name}
                date={c.first_air_date || c.release_date}
                media_type={type ? "tv" : "movie"}
                vote_average={c.vote_average}
                />
              ))}
            {searchText && !content &&
              (type ? <h1>No Series Found</h1> : <h1>No Movies Found</h1>)}
        </div>
        </div>
    );
};
export default Search;