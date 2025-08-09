import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Movie } from '../models/movie';

export default function TrendingCarousel({ movies, onSelect }: { movies: Movie[], onSelect: (m: Movie) => void }) {
  return (
    <div >
      <h3 className="text-white text-xl p-4">Trending Now</h3>
      <Swiper slidesPerView={8} spaceBetween={10}>
        {movies.map(movie => (
          <SwiperSlide key={movie.Id}>
            <div onClick={() => onSelect(movie)} className="cursor-pointer">
              <img
                src={`../assets/${movie.CoverImage}`}
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
