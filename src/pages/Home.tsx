import { useState, useEffect, useRef } from 'react';
import SidebarMenu from '../components/SidebarMenu';
import FeaturedVideo from '../components/FeaturedVideo';
import TrendingCarousel from '../components/TrendingCarousel';
import { useGetVideosQuery } from '../videos/videosApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Movie } from '../models/movie';
import { useActions } from '../hooks/actions';

export default function Home() {
  const {data} = useGetVideosQuery();
  const {setLastSeen} = useActions();
  const dispatch = useDispatch();
  const [selectedMenuItem, setSelectedMenuItem] = useState<string>('home');
  const [movieToShow, setMovieToShow] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const lastSeenId = useSelector((state: RootState) => state.videos.lastSeenId);
  const delayRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => () => delayRef.current && clearTimeout(delayRef.current), []);

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
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => {
      setMovieToShow(movie);
      if (lastSeenId !== movie.Id) dispatch(setLastSeen(movie.Id));
    }, 2000);
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
