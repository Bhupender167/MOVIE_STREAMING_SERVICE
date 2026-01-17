import { useEffect, useState } from "react"
import apiClient from "../services/api-client"


const useTvShowList = ()=>{
    const [tvShow,setTvShow] = useState()
    const fetchTvShowList = async ()=>{
        try{
            const res = await apiClient.get('/discover/tv')
            console.log(res.data.results)
            setTvShow(res.data.results)
        }
        catch(error){
            
        }
    }
    useEffect(()=>{
        fetchTvShowList()
    },[])
    return {tvShow}
}

export default useTvShowList;