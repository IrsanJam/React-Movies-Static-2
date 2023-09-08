import axios from "axios";

const baseUrl = `https://api.themoviedb.org/3/`;
const apiKey = `f150276c4e0b2101017c933bd6f025ce`;

//perintah supaya dapatkan API film Popular
const dapatkanDaftarFilmAPI = async () => {
  const film = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  return film.data.results;
};

//perintah supaya dapatkan API film Cari
const cariFilmAPI = async (hasil) => {
  const search = await axios.get(`${baseUrl}/search/movie?query=${hasil}&api_key=${apiKey}`);
  return search.data;
};

export { dapatkanDaftarFilmAPI, cariFilmAPI };
// https://api.themoviedb.org/3/movie/550?api_key=f150276c4e0b2101017c933bd6f025ce
