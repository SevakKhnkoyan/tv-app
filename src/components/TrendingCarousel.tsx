import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Movie } from '../models/movie';

export default function TrendingCarousel({ movies, onSelect }: { movies: Movie[], onSelect: (m: Movie) => void }) {
  return (
    <div
      className="
        h-[30vh]
        text-white
      "
    >
      <h3 className="text-white text-xl p-4">Trending Now</h3>
      <Swiper slidesPerView={8}>
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
