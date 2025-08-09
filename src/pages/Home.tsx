import { useState, useEffect } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import FeaturedVideo from '../components/FeaturedVideo';
import TrendingCarousel from '../components/TrendingCarousel';
import { useGetVideosQuery } from '../videos/videosApi';
import { useDispatch, useSelector } from 'react-redux';
import { setLastSeen } from '../videos/videosSlice';
import { RootState } from '../app/store';
import { Movie } from '../models/movie';

export default function Home() {
  const { data } = useGetVideosQuery();
  const dispatch = useDispatch();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('home');
  const [movieToShow, setMovieToShow] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const lastSeenId = useSelector((state: RootState) => state.videos.lastSeenId);

  useEffect(() => {
    if (data?.Featured) setMovieToShow(data.Featured);
  }, [data]);

  useEffect(() => {
     if (data?.TrendingNow.length) {
      const sorted = [...data.TrendingNow]
        .sort(
          (a, b) => Date.parse(b.Date) - Date.parse(a.Date)
        )

      if (lastSeenId) {
        const index = sorted.findIndex((m) => m.Id === lastSeenId);
        if (index > -1) {
          const [lastSeen] = sorted.splice(index, 1);
          sorted.unshift(lastSeen);
        }
      }

      setMovies(sorted);
    }
  }, [data, lastSeenId]);

  const handlePlay = () => {
    console.log('Play clicked');
  };

  const handleMoreInfo = () => {
    console.log('More info clicked');
  };


  const handleSelect = (movie: Movie) => {
    setMovieToShow(movie);
    if (lastSeenId !== movie.Id) {
      dispatch(setLastSeen(movie.Id));
    }
  };

  return (
    <>
      <SidebarMenu selectedMenuItem={selectedMenuItem} onSelectMenuItem={setSelectedMenuItem}/>
      <FeaturedVideo
        movieToShow={movieToShow}
        onPlay={handlePlay}
        onMoreInfo={handleMoreInfo}
      />
      <TrendingCarousel movies={movies} onSelect={handleSelect} />
    </>
  );
}
