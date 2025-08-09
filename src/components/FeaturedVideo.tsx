import { Button } from 'antd';
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Movie } from '../models/movie';
import featuredCoverImage from '../assets/FeaturedCoverImage.png';

export interface FeaturedVideoHandle {
  play: () => void;
}

const formatDuration = (duration: string) => {
  const seconds = parseInt(duration, 10);
  if (Number.isNaN(seconds)) return duration;
  const totalMinutes = Math.floor(seconds / 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return hours ? `${hours}h ${minutes}m` : `${minutes}m`;
};

const FeaturedVideo = forwardRef<
  FeaturedVideoHandle,
  { movie: Movie | null; onPlay?: () => void; onMoreInfo?: () => void }
>(({
  movie,
  onPlay,
  onMoreInfo,
}, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [showVideo, setShowVideo] = useState(false);

    useEffect(() => {
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
      }
      setShowVideo(false);
    }, [movie]);

    useImperativeHandle(ref, () => ({
      play: () => {
        if (videoRef.current) {
          videoRef.current.play();
          setTimeout(() => setShowVideo(true), 1000);
        }
      },
    }));

    if (!movie) return null;

    const bgStyle = showVideo
      ? {}
      : {
          backgroundImage: `url(${featuredCoverImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        };

    const titleImageSrc = movie.TitleImage
      ? new URL(`../assets/${movie.TitleImage}`, import.meta.url).toString()
      : undefined;

    return (
      <div
        className="
          relative
          flex flex-col
          justify-end p-6
          text-white
        "
        style={bgStyle}
      >
        <video
          ref={videoRef}
          src={movie.VideoUrl}
          className={`absolute top-0 left-0 w-full h-full object-cover ${
            showVideo ? '' : 'hidden'
          }`}
          muted
          playsInline
        />
        <span className="uppercase font-semibold">{movie.Category}</span>
        {titleImageSrc ? (
          <img
            src={titleImageSrc}
            alt={movie.Title}
            className="w-1/3 max-w-xs mt-2"
          />
        ) : (
          <h2 className="text-4xl font-bold">{movie.Title}</h2>
        )}
        <div className="flex gap-2 items-center mt-2 text-sm">
          <span>{movie.ReleaseYear}</span>
          <span>{movie.MpaRating}</span>
          <span>{formatDuration(movie.Duration)}</span>
        </div>
        <p className="mt-2 max-w-lg">{movie.Description}</p>
        <Button type="primary" onClick={onPlay}>
            Play
          </Button>
          <Button ghost onClick={onMoreInfo}>
            More Info
          </Button>
      </div>
    );
  }
);

export default FeaturedVideo;
