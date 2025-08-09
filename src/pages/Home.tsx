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
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('home');
  const [featured, setFeatured] = useState<Movie | null>(data?.Featured ?? null);
  const dispatch = useDispatch();
  const [movies, setMovies] = useState<Movie[]>([]);
  const featuredRef = useRef<FeaturedVideoHandle>(null);
  const lastSeenId = useSelector((state: RootState) => state.videos.lastSeenId);
  const playTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

  const handlePlay = () => {
    if (featured) {
      if (lastSeenId !== featured.Id) {
        dispatch(setLastSeen(featured.Id));
      }
      featuredRef.current?.play();
    }
  };

  const handleMoreInfo = () => {
    if (featured) {
      console.log('More info for', featured.Title);
    }
  };


  const handleSelect = (movie: Movie) => {
    setFeatured(movie);
     if (lastSeenId !== movie.Id) {
      dispatch(setLastSeen(movie.Id));
    }
    if (playTimeoutRef.current) {
      clearTimeout(playTimeoutRef.current);
    }
    playTimeoutRef.current = setTimeout(() => {
      featuredRef.current?.play();
    }, 2000);
  };

  return (
    <div className="flex">
      <SidebarMenu selectedMenuItem={selectedMenuItem} onSelectMenuItem={setSelectedMenuItem}/>
      <div 
        className="
          z-0
          pl-[130px]
          flex-1
          h-[calc(100vh-110px)]
        "
      >
        <FeaturedVideo
          ref={featuredRef}
          movie={featured}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
        />
        {/* <h3 className="text-white text-xl p-4">Trending Now</h3>
        <TrendingCarousel movies={movies} onSelect={handleSelect} /> */}
      </div>
    </div>
  );
}
