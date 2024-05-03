import { useParams } from "@remix-run/react";

const GameId = () => {
  const { gameId } = useParams();

  return (
    <div>
      { gameId }
    </div>
  );
};

export default GameId