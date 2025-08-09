import { Button } from 'antd';

export default function FeaturedVideo({ movie }: { movie: any }) {
  if (!movie) return null;

  return (
    <div
      className="relative h-[500px] flex flex-col justify-end p-6 text-white"
      style={{
        backgroundImage: `url(${movie.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <h2 className="text-4xl font-bold">{movie.title}</h2>
      <p className="mt-2 max-w-lg">{movie.description}</p>
      <div className="mt-4 flex gap-2">
        <Button type="primary">Play</Button>
        <Button ghost>More Info</Button>
      </div>
    </div>
  );
}
