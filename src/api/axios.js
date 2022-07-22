import axios from "axios";
import * as gvar from '../../src/global_variables'

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  params: {
    api_key: gvar.MOVIE_DB_API,
    language: "ko-KR",
  },
});

export default instance;
