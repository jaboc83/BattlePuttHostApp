import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import * as React from 'react';

interface PerfectPuttRulesProps {
  distances: Array<number>;
  numberOfDiscs: number;
}

const PerfectPuttRules: React.FC<PerfectPuttRulesProps> = ({
  distances,
  numberOfDiscs,
}) => (
  <>
    <Typography variant="h3" align="center" marginBottom={1}>
      Perfect Putt Rules
    </Typography>
    <Typography variant="body1" gutterBottom>
      In Perfect Putt players each take turns putting {numberOfDiscs} putts from
      5 different locations at progressively farther distances{' '}
      {distances.map(d => `${d}'`).join(', ')}.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Players take turns at each station putting their {numberOfDiscs} discs and
      tracking their score. At the end of the final station the player with the
      most points wins.
    </Typography>
    <Typography variant="body1" gutterBottom>
      Putts made are worth one point and for each set of {numberOfDiscs} putts
      there are a number of bonus points outlined in the table below.
    </Typography>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Putting station</TableCell>
          <TableCell>Make First Putt Bonus</TableCell>
          <TableCell>Make Last Putt Bonus</TableCell>
          <TableCell>Make All Putts Bonus</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>First</TableCell>
          <TableCell>2</TableCell>
          <TableCell>1</TableCell>
          <TableCell>6</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Second</TableCell>
          <TableCell>2</TableCell>
          <TableCell>1</TableCell>
          <TableCell>7</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Third</TableCell>
          <TableCell>4</TableCell>
          <TableCell>2</TableCell>
          <TableCell>9</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fourth</TableCell>
          <TableCell>6</TableCell>
          <TableCell>3</TableCell>
          <TableCell>11</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Fifth</TableCell>
          <TableCell>8</TableCell>
          <TableCell>4</TableCell>
          <TableCell>14</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </>
);
export default PerfectPuttRules;
