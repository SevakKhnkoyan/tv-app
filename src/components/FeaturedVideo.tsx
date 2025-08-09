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
import featuredTitleImage from '../assets/FeaturedTitleImage.png';
import { CaretRightFilled } from '@ant-design/icons';

export interface FeaturedVideoHandle {
  play: () => void;
}

const formatDuration = (duration: string) => {
  const seconds = Number(duration);
  // const seconds = parseInt(duration, 10);
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
      ? movie.TitleImage
      : undefined;

    return (
      <div
        className="
          p-6
          flex flex-col
          justify-center
          h-[75vh]
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
        <span className="uppercase font-semibold text-gray-600 tracking-widest">{movie.Category}</span>
        {titleImageSrc ? (
          <img
            src={featuredTitleImage} // to be changed by urls, if there is such data in json
            alt={movie.Title}
            className="w-1/3 mt-2"
          />
        ) : (
          <h2 className="text-4xl font-bold">{movie.Title}</h2>
        )}
        <div className="flex gap-2 items-center mt-2 text-lg">
          <span>{movie.ReleaseYear}</span>
          <span>{movie.MpaRating}</span>
          <span>{formatDuration(movie.Duration)}</span>
        </div>
        <p className="mt-2 max-w-lg">{movie.Description}</p>
        <div className="mt-4 flex gap-3">
          <Button
            type="primary"
            onClick={onPlay}
            icon={<CaretRightFilled />}
            className="
              h-[72px] w-[240px] rounded-[40px]
              bg-[#F1F1F1] text-black border-none
              font-bold text-3xl
              hover:opacity-90 active:opacity-80
              shadow-sm hover:shadow-md
            "
          >
            Play
          </Button>
          <Button
            ghost
            onClick={onMoreInfo}
            className="
              h-[72px] w-[240px] rounded-[40px]
              text-white border-none
              font-bold text-3xl
              hover:opacity-90 active:opacity-80
              shadow-sm hover:shadow-md
            "
            style={{
              backgroundImage: "linear-gradient(128deg, #2727F5 0%, #001671 100%)",
            }}
          >
            More Info
          </Button>
        </div>
      </div>
    );
  }
);

export default FeaturedVideo;
