import React, { useEffect, useState } from "react";
import { dapatkanDaftarFilmAPI, cariFilmAPI } from "./componen/Api";
import Footer from "./componen/Footer";

export const App = () => {
  //seleksi input yang mempunyai kelas inputa
  const input = document.querySelector(".inputa");

  //menambahkan data state (nilai sementara) yang sebuah array
  // const [filmPopular, setFilmPopular] = useState([]);

  const [filmPopuler, setFilmPopuler] = useState([]);

  //Efek yg dihasilkan ketika aplikasi di reload, karena arraynya kosong berarti di eksekusi ketika reload
  // useEffect(() => {
  //   dapatkanDaftarFilmAPI().then((result) => setFilmPopular(result));
  // }, [input]);

  useEffect(() => {
    dapatkanDaftarFilmAPI().then((hasil) => setFilmPopuler(hasil));
  }, []);

  //source gambar di the movie API
  const gambar = `https://image.tmdb.org/t/p/w500/`;

  //fungsi untuk menampilkan data dari API berbentuk card
  const TampilkanData = () => {
    return filmPopuler.map((movie, i) => {
      return (
        <div className="box-border h-[25rem] w-64 overflow-y-scroll rounded-sm bg-amber-50  text-green-100 shadow-xl" key={i}>
          <img src={`${gambar}/${movie.poster_path}`} alt="" className="h-60 w-full " />
          <h3 className="  bg-green-600 py-3 text-center font-bold ">{movie.title}</h3>
          <hr className="mx-auto w-24 border-green-500" />
          <p className=" overflow-hidden p-3 text-justify text-[9px]  -tracking-tight text-slate-700">{movie.overview}</p>
        </div>
      );
    });
  };

  //sebuah fungsi untuk mendapatkan sebuah nilai dari input kelas inputa
  const mCari = () => {
    console.log(input.value);
  };

  //sebuah fungsi untuk mencari film
  const search = async (hasil) => {
    const cari = await cariFilmAPI(hasil);
    if (hasil.length > 4) {
      setFilmPopuler(cari.results);
    }
  };

  //semua nilai yg ditampilkan dari app.js
  return (
    <div>
      <div className="  fixed z-10 flex w-full flex-col items-center justify-center bg-green-50 p-10 shadow-lg backdrop-blur-lg ">
        <p className="p-2 text-[13px] font-bold uppercase text-slate-600">Landing Page Pencarian Film</p>
        <h1 className="text-center font-bold uppercase text-primary lg:text-4xl">Find... movie Present</h1>
        <p className="p-2  text-[10px] font-bold text-slate-400">Cari film Favorit anda dengan api terbaik</p>
        <div className="flex items-center justify-center">
          <input type="text" onChange={({ target }) => search(target.value)} placeholder="Masukan nama film" className="inputa rounded-xl border-[1px] border-teal-200 px-32 py-2 text-center"></input>
          <button onClick={mCari} className="ml-3 rounded-xl bg-primary px-10 py-2 font-medium text-green-50">
            Cari
          </button>
        </div>
      </div>

      <div className=" grid h-auto max-w-full grid-cols-4 items-center justify-items-center gap-16 bg-green-100 p-28 pt-80">
        <TampilkanData></TampilkanData>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
