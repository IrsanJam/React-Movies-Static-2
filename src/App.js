import Footer from "./componen/Footer";
import { dapatkanFilmPopulerAPI, cariFilm } from "./componen/Api";
import { useEffect, useState } from "react";
//import { AiFillCloseCircle } from "react-icons/ai";

export const App = () => {
  //Untuk Scroll
  window.onscroll = () => {
    const nav = document.querySelector(".navbar");
    if (nav.offsetTop < window.pageYOffset) {
      nav.classList.add("green");
      nav.classList.remove("green-muda");
    } else {
      nav.classList.remove("green");
      nav.classList.add("green-muda");
    }
  };

  //untuk API

  const [filmPopuler, setFilmPopuler] = useState([]);

  useEffect(() => {
    try {
      dapatkanFilmPopulerAPI().then((result) => setFilmPopuler(result));
    } catch (error) {
      alert(Error);
    }
  }, []);

  //source gambar di the movie API
  const gambar = `https://image.tmdb.org/t/p/w500/`;

  //fungsi untuk menampilkan data dari API berbentuk card
  const TampilkanData = () => {
    return filmPopuler.map((movie, i) => {
      return (
        <>
          <div className="relative box-border h-72 w-60 overflow-y-scroll  rounded-md bg-amber-50 text-green-100 shadow-xl  lg:h-[25rem] lg:w-64" key={i}>
            <img src={`${gambar}/${movie.poster_path}`} alt="" className="h-40 w-full rounded-t-md lg:h-60 " />
            <h3 className="  bg-green-600 py-3 text-center font-bold ">{movie.title}</h3>
            <hr className="mx-auto w-24 border-green-500" />
            <p className=" overflow-hidden p-3 text-justify text-[9px]  -tracking-tight text-slate-700">{movie.overview}</p>
          </div>
        </>
      );
    });
  };

  const cari = async (hasil) => {
    let cariData = await cariFilm(hasil);
    //const inputa = document.querySelector(".inputa");
    if (!filmPopuler) {
      alert("Gagal");
    }
    return setFilmPopuler(cariData);
  };

  window.scrollTo({
    behavior: "smooth",
  });

  const eksekusi = () => {
    const inputa = document.querySelector(".inputa");
    cari(inputa.value);
  };

  //semua nilai yg ditampilkan dari app.js
  return (
    <div>
      <div className=" navbar fixed z-10 flex w-full flex-col items-center justify-center  p-10 shadow-lg  ">
        <p className="p-2 text-[13px] font-bold uppercase ">Landing Page Pencarian Film</p>
        <h1 className="text-center font-bold uppercase text-primary lg:text-4xl">Find... movie Present</h1>
        <p className="p-2  text-[10px] font-bold text-slate-400">Cari film Favorit anda dengan api terbaik</p>
        <div className="flex items-center justify-center">
          <input type="text" placeholder="Masukan nama film" className="inputa rounded-xl border-[1px] border-teal-200 px-5 text-center lg:px-32 lg:py-2"></input>
          <button onClick={eksekusi} className=" ml-3 rounded-xl bg-primary px-5 py-[0.2em] text-sm text-green-50 lg:px-10 lg:py-2 lg:font-medium">
            Cari
          </button>
        </div>
      </div>

      <div className=" grid h-auto max-w-full grid-cols-1 items-center justify-items-center gap-16 bg-green-100 p-28 pt-56 md:grid-cols-2 lg:grid-cols-4 lg:pt-80">
        <TampilkanData></TampilkanData>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;
