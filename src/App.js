import Footer from "./componen/Footer";
import { dapatkanFilmPopulerAPI, cariFilm } from "./componen/Api";
import { useEffect, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";

export const App = () => {
  const boxer = document.querySelector(".boxer");

  const tes = () => {
    boxer.classList.remove("idden");
    boxer.classList.add("fex");
  };

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
    dapatkanFilmPopulerAPI().then((result) => setFilmPopuler(result));
  }, []);

  console.log(filmPopuler);

  //source gambar di the movie API
  const gambar = `https://image.tmdb.org/t/p/w500/`;

  //fungsi untuk menampilkan data dari API berbentuk card
  const TampilkanData = () => {
    return filmPopuler.map((movie, i) => {
      return (
        <>
          <div className="relative box-border h-[25rem] w-64 overflow-y-scroll rounded-sm bg-amber-50 text-green-100 shadow-xl" key={i}>
            <img src={`${gambar}/${movie.poster_path}`} alt="" className="h-60 w-full " />
            <h3 className="  bg-green-600 py-3 text-center font-bold ">{movie.title}</h3>
            <hr className="mx-auto w-24 border-green-500" />
            <p className=" overflow-hidden p-3 text-justify text-[9px]  -tracking-tight text-slate-700">{movie.overview}</p>
            <button onClick={tes} className=" absolute top-1 z-[5] ml-1 rounded-xl bg-green-900 p-2 px-4 text-[9px]">
              Details
            </button>
          </div>
        </>
      );
    });
  };

  const cari = async (hasil) => {
    let cariData = await cariFilm(hasil);
    return setFilmPopuler(cariData);
  };

  window.scrollTo({
    behavior: "smooth",
  });

  const reloadPage = () => {
    const boxer = document.body.querySelector(".boxer");
    boxer.classList.add("idden");
  };

  const ModalBox = () => {
    return (
      <div className="flex-col items-center  justify-center rounded-md bg-green-800 px-3 text-primary">
        <div className="flex flex-col items-center justify-center p-3">
          <AiFillCloseCircle onClick={reloadPage} className="cursor-pointer hover:scale-125  hover:text-orange-500"></AiFillCloseCircle>
          <h2 className="px-3 font-bold uppercase">Paling Sesuai</h2>
        </div>
        <div className=" flex h-[17rem] w-52 flex-col flex-wrap">
          <img sizes={10} src={filmPopuler.map((e) => gambar + e.poster_path).find((e) => e[1])} className="mx-auto mb-5 h-28 w-28 rounded-md" alt="crypto" />
          <h5 className="text-center text-[12px]">{filmPopuler.map((e) => e.title).find((e) => e[0])}</h5>
          <hr />
          <h5 className="mx-auto my-3 w-24 rounded-md bg-green-400  text-center text-2xl text-white ">{filmPopuler.map((e) => e.vote_average).find((e) => e)}</h5>
          <hr />
          <h5 className="text-center text-green-50">{filmPopuler.map((e) => e.release_date).find((e) => e)}</h5>
        </div>
      </div>
    );
  };

  //semua nilai yg ditampilkan dari app.js
  return (
    <div>
      <div className="boxer bg-blend- fixed inset-0 z-40  hidden items-center justify-center  overflow-y-auto  bg-slate-400 bg-opacity-75 bg-blend-darken">
        <ModalBox></ModalBox>
      </div>

      <div className=" navbar fixed z-10 flex w-full flex-col items-center justify-center  p-10 shadow-lg  ">
        <p className="p-2 text-[13px] font-bold uppercase ">Landing Page Pencarian Film</p>
        <h1 className="text-center font-bold uppercase text-primary lg:text-4xl">Find... movie Present</h1>
        <p className="p-2  text-[10px] font-bold text-slate-400">Cari film Favorit anda dengan api terbaik</p>
        <div className="flex items-center justify-center">
          <input type="text" onChange={({ target }) => cari(target.value)} placeholder="Masukan nama film" className="inputa rounded-xl border-[1px] border-teal-200 px-32 py-2 text-center"></input>
          <button className="ml-3 rounded-xl bg-primary px-10 py-2 font-medium text-green-50">Cari</button>
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
