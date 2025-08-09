import { useState, useEffect, useRef } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import FeaturedVideo, { FeaturedVideoHandle } from '../components/FeaturedVideo';
import TrendingCarousel from '../components/TrendingCarousel';
import { useGetVideosQuery } from '../videos/videosApi';
import { useDispatch } from 'react-redux';
import { setLastSeen } from '../videos/videosSlice';

export default function Home() {
  const { data } = useGetVideosQuery();
  const movies: any[] = data?.TrendingNow ?? [];
  const [featured, setFeatured] = useState<any>(data?.Featured ?? null);
  const dispatch = useDispatch();
  const featuredRef = useRef<FeaturedVideoHandle>(null);

  useEffect(() => {
     if (data?.TrendingNow.length) {
      setFeatured(data.Featured);
    }
  }, [data]);

  const handleSelect = (movie: any) => {
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
