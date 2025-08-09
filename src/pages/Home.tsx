import { useState, useEffect, useRef } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import FeaturedVideo, { FeaturedVideoHandle } from '../components/FeaturedVideo';
import TrendingCarousel from '../components/TrendingCarousel';
import { useGetVideosQuery } from '../videos/videosApi';
import { useDispatch, useSelector } from 'react-redux';
import { setLastSeen } from '../videos/videosSlice';
import { RootState } from '../app/store';
import { Movie } from '../models/movie';

export default function Home() {
  const { data } = useGetVideosQuery();
  const [featured, setFeatured] = useState<Movie | null>(data?.Featured ?? null);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const featuredRef = useRef<FeaturedVideoHandle>(null);
  const lastSeenId = useSelector((state: RootState) => state.videos.lastSeenId);

  useEffect(() => {
     if (data?.TrendingNow.length) {
      const sorted = [...data.TrendingNow]
        .sort(
          (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
        )
        .slice(0, 50);

      if (lastSeenId) {
        const index = sorted.findIndex((m) => m.Id === lastSeenId);
        if (index > -1) {
          const [lastSeen] = sorted.splice(index, 1);
          sorted.unshift(lastSeen);
        }
      }

      setMovies(sorted);
      setFeatured(data.Featured);
    }
  }, [data, lastSeenId]);

  const handleSelect = (movie: Movie) => {
    setFeatured(movie);
    dispatch(setLastSeen(movie.Id));
    setTimeout(() => {
      featuredRef.current?.play();
    }, 2000);
  };

  return (
    <div className="flex">
      <SidebarMenu />
      <div className="ml-[60px] flex-1">
        <FeaturedVideo ref={featuredRef} movie={featured} />
        <h3 className="text-white text-xl p-4">Trending Now</h3>
        <TrendingCarousel movies={movies} onSelect={handleSelect} />
      </div>
    </div>
  );
}
