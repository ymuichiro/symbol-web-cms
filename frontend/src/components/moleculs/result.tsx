import { PollResult } from '@/pages/symbol-poll/poll';
import { SymbolService } from '@/services/symbolService';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';

interface Column {
  id: 'option' | 'votes' | 'count';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'option', label: 'Option', minWidth: 170 },
  { id: 'votes', label: 'Votes', minWidth: 100 },
  { id: 'count', label: 'Count', minWidth: 100 },
];

type Props = {
  data: PollResult[] | null;
};

export interface VoteResult {
  option: string;
  votes: number;
  count: number;
}

export const ResultTable = ({ data }: Props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [tableData, setTableData] = useState<VoteResult[]>([]);

  useEffect(() => {
    let voteResult: VoteResult[] = [];
    data?.forEach((item: any) => {
      const result = {
        option: item.option,
        votes: SymbolService.uint64toNumber([item.totalAmount.lower, item.totalAmount.higher]),
        count: item.count,
      };
      voteResult.push(result);
    });
    setTableData(voteResult);
  }, [data]);

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((data) => {
              return (
                <TableRow hover role='checkbox' tabIndex={-1} key={data.option}>
                  {columns.map((column) => {
                    const value = data[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'number' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};
