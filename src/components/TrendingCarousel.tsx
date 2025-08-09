import { Swiper, SwiperSlide } from 'swiper/react';
import { Mousewheel } from 'swiper/modules';
import 'swiper/css';
import { Movie } from '../models/movie';

export default function TrendingCarousel({ movies, onSelect }: { movies: Movie[], onSelect: (m: Movie) => void }) {
  return (
    <div
      className="
        pl-[154px]
        -mt-[10vh]
        text-white
        h-[40vh]
      "
      style={{
        background: 'linear-gradient(to top, rgba(0,0,0,1) 80%, rgba(0,0,0,0) 100%)'
      }}
    >
      <h3 className="text-white text-2xl p-4">Trending Now</h3>
      <Swiper
        modules={[Mousewheel]} 
        mousewheel={{
          sensitivity: 1,
        }}
        slidesPerView={8}
        spaceBetween={32}
      >
        {movies.map(movie => (
          <SwiperSlide key={movie.Id}>
            <div onClick={() => onSelect(movie)} className="cursor-pointer">
              <img
                src={`/publicAssets/${movie.CoverImage}`}
                alt={movie.Title}
                className="rounded"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
