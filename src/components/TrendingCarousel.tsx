import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

export default function TrendingCarousel({ movies, onSelect }: { movies: any[], onSelect: (m: any) => void }) {
  return (
    <Swiper slidesPerView={8} spaceBetween={10}>
      {movies.map(movie => (
        <SwiperSlide key={movie.id}>
          <div onClick={() => onSelect(movie)} className="cursor-pointer">
            <img src={movie.cover} alt={movie.title} className="rounded" />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
