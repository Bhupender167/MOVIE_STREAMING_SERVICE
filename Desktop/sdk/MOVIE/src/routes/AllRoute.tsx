import { Routes,Route } from "react-router-dom"
import MovieList from "../components/MovieList"
import TvShowsList from "../components/ui/TvShowsList"
import NewAndPop from "../components/ui/NewAndPop"
import SearchList from "../components/ui/SearchList"
import Trending from "../components/Trending/Trending"
import Player from "../components/ui/Player"
import PlayerTv from "../components/ui/PlayerTv"
import InfoPanel from "../components/extras/InfoPanel"
import MovieInfoPanel from "../components/extras/MovieInfoPanel"

const AllRoute = () => {
  return(
    <Routes>
        <Route path="/" element={<Trending/>} />
        <Route path="/movies" element={<MovieList/>} />

        <Route path="/tvshows" element={<TvShowsList/>} />

        <Route path="/latest" element={<NewAndPop/>} />

         <Route path="/search/:searchName/" element={<SearchList/>} />

         <Route path="/player/:playerId" element={<Player/>}  />
         <Route path="/playerTv/:playerId" element={<PlayerTv/>}  />

          <Route path="/infoPanel/:infoId" element={<InfoPanel/>}  />
          <Route path="/infoPanelMovie/:infoId" element={<MovieInfoPanel/>}  />

    </Routes>
  )
}

export default AllRoute