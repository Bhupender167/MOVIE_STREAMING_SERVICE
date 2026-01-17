import axios from "axios";

export default axios.create({
    baseURL:'https://api.themoviedb.org/3/',
    params:{
        api_key:"7250409e02af2183ea18864b625fb281";
    }
    
})
