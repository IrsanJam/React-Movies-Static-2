import axios from "axios";

const baseUrl = `https://api.themoviedb.org/3/`;
const apiKey = `f150276c4e0b2101017c933bd6f025ce`;

const dapatkanFilmPopulerAPI = async () => {
  const film = await axios.get(`${baseUrl}/movie/popular?api_key=${apiKey}`);
  try {
    return film.data.results;
  } catch (error) {
    alert("Tidak ada Internet ");
  }
};

const cariFilm = async (hasil) => {
  const film = await axios.get(`${baseUrl}/search/movie?query=${hasil}&api_key=${apiKey}`);
  try {
    return film.data.results;
  } catch (error) {
    alert("salah");
  }
};

export { dapatkanFilmPopulerAPI, cariFilm };
// https://api.themoviedb.org/3/movie/550?api_key=f150276c4e0b2101017c933bd6f025ce
