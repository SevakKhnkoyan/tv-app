import { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import FeaturedVideo from '../components/FeaturedVideo';
import TrendingCarousel from '../components/TrendingCarousel';
import { useGetVideosQuery } from '../videos/videosApi';
import { useDispatch } from 'react-redux';
import { setLastSeen } from '../videos/videosSlice';

export default function Home() {
  const { data: movies = [] } = useGetVideosQuery();
  const [featured, setFeatured] = useState<any>(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (movies.length) {
      setFeatured(movies[0]);
    }
  }, [movies]);

  const handleSelect = (movie: any) => {
    setFeatured(movie);
    dispatch(setLastSeen(movie.id));
    setTimeout(() => {
      // Here you can switch to background video
    }, 2000);
  };

  return (
    <div className="flex">
      <SidebarMenu />
      <div className="ml-[60px] flex-1">
        <FeaturedVideo movie={featured} />
        <h3 className="text-white text-xl p-4">Trending Now</h3>
        <TrendingCarousel movies={movies} onSelect={handleSelect} />
      </div>
    </div>
  );
}
