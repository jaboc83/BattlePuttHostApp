import { Typography } from '@mui/material';

const KnockoutRules = ({
  numberOfDiscs,
  distance,
}: {
  numberOfDiscs: number;
  distance: number;
}) => (
  <>
    <Typography variant="h3" align="center" marginBottom={1}>
      Knockout Rules
    </Typography>
    <Typography variant="body1" gutterBottom>
      All players start with {numberOfDiscs} putters and a mark is made{' '}
      {distance} feet from the basket.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Players take turns putting their putters from the specified mark. Each
      player uses all of their remaining putters before moving to the next
      player.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Each made putt is worth {distance} (distance from the basket) points. A
      miss means that the putter is removed from that players available discs
      for the remainder of the game.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Once a player has finished putting their remaining putters they should
      mark the number of made putts on their app. Play will continue with the
      next player.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Once a player has run out of discs they are removed from the putting
      rotation for the remainder of the game.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Play continues until all players have run out of discs. The winner is the
      person with the most points in the end.
    </Typography>
  </>
);
export default KnockoutRules;
