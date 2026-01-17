import { useEffect, useState } from "react";
import apiClient from "../services/api-client";


export interface MovieResults {
    adult:boolean,
    original_language:string,
    original_title:string,
    title:string,
    backdrop_path:string,
    poster_path:string,
    overview:string,
    name?:string,
}


const useMovieList = (genre?: number|null)=> {

    const [movieList,setMovieList] = useState<MovieResults[]>()

    const fetchMovieList = async () => {
        try{
           const res = await apiClient.get('/discover/movie',{
             params:{
                with_genres: genre,
            }
           })

           


           setMovieList(res.data.results)
           console.log(res.data.results)
        }
        catch(error){

        }
    }
    useEffect(()=>{
        fetchMovieList()
    },[genre])

    return{
        movieList
    }

}

export default useMovieList;