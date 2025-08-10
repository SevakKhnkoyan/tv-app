import { Button } from 'antd';
import { Movie } from '../models/movie';
import ReactPlayer from 'react-player';
import featuredCoverImage from '../assets/FeaturedCoverImage.png';
import featuredTitleImage from '../assets/FeaturedTitleImage.png';
import { CaretRightFilled } from '@ant-design/icons';
import { formatDuration } from '../utils/utils';

export interface IFeaturedVideo {
  movieToShow: Movie | null;
  onPlay?: () => void;
  onMoreInfo?: () => void;
};

const FeaturedVideo: React.FC<IFeaturedVideo> = ({
  movieToShow,
  onPlay,
  onMoreInfo,
}) => {
  if (!movieToShow) return null;
  const isMovieToShowSelected = Boolean(movieToShow?.VideoUrl);
  const bgStyle = isMovieToShowSelected
    ? {}
    : {
        backgroundImage: `url(${featuredCoverImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      };

  const titleImageSrc = movieToShow.TitleImage
    ? movieToShow.TitleImage
    : undefined;

  const YT_VARS = {
    autoplay: 1 as const,
    controls: 0 as const,
    rel: 0 as const,
    modestbranding: 1 as const,
    playsinline: 1 as const,
  };

  return (
    <div
      className="
        pl-[130px]
        flex-1
        flex flex-col
        justify-center
        text-white
        h-[70vh]
      "
      style={bgStyle}
    >
      {isMovieToShowSelected && (
        <div className="absolute inset-0 overflow-hidden">
          <ReactPlayer
            key={movieToShow.VideoUrl}      
            src={movieToShow.VideoUrl}
            playing
            muted
            loop
            width="100%"
            height="100%"
            style={{ position: 'absolute', zIndex: '-1', scale: '1.3'}}
            config={{
              youtube: YT_VARS,
            }}
          />
        </div>
      )}
      <div className='p-6'>
        <span className="uppercase font-semibold text-gray-600 tracking-widest">{movieToShow.Category}</span>
        {titleImageSrc ? (
          <img
          src={featuredTitleImage} // to be changed by urls, if there is such data in json
          alt={movieToShow.Title}
          className="w-1/3 mt-2"
          />
        ) : (
          <h2 className="text-4xl font-bold">{movieToShow.Title}</h2>
        )}
        <div className="flex gap-2 items-center mt-2 text-lg">
          <span>{movieToShow.ReleaseYear}</span>
          <span>{movieToShow.MpaRating}</span>
          <span>{formatDuration(movieToShow.Duration)}</span>
        </div>
        <p className="mt-2 max-w-lg">{movieToShow.Description}</p>
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
    </div>
    );
  };

export default FeaturedVideo;
