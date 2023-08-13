import React, { useEffect, useState } from "react";
import { getPayments } from "../api/payments-get.api";
import { APIResult } from "../common/enums/api-result.enum";
import { GetPaymentsResponse, DataForTable } from "../common/types";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const PaymentOverdueTable = () => {
  const [overduePayments, setOverduePayments] =
    useState<GetPaymentsResponse[]>([]);
  const [rowsForTable, setRowsForTable] = useState<DataForTable[]>([]);

  useEffect(() => {
    getOverduePayments();
  }, []);

  useEffect(() => {
    fillRows();
  }, [overduePayments]);

  const getOverduePayments = async () => {
    const pastOverduePayments = await getPayments();
    if (pastOverduePayments.status === APIResult.SUCCESS) {		
      setOverduePayments(pastOverduePayments.body);
    }
  };

  const createData = (
	id: string,
    bookTitle: string,
    payerName: string,
    amount: number,
    datePaid: string,
    paymentStatus: string
  ) => {
    return { id, bookTitle, payerName, amount, datePaid, paymentStatus };
  };

  const fillRows = () => {
    if (overduePayments) {
	  const rows:DataForTable[]  = []
      overduePayments.map((payment) => {
		const note = JSON.parse(payment.note);
		rows.push(
          createData(
			payment.id,
            note.book_title,
            note.payer_name,
            payment.amountPennies,
            payment.createdAt,
            payment.status
          )
        );
      });
	  setRowsForTable(rows)
    }
  };

  return (
	<React.Fragment>
	{!overduePayments.length ? <p>No overdue payments to display</p> : 
	<div className="md:w-9/12 mx-auto mt-8">
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} >
        <TableHead>
          <TableRow>
            <TableCell>Book Title</TableCell>
            <TableCell align="left">Payer Name</TableCell>
            <TableCell align="left">Payment Amount</TableCell>
            <TableCell align="left">Date Paid</TableCell>
			<TableCell align="left">Payment Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rowsForTable.map((row) => (
            <TableRow
              key={row.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
			  <TableCell align="left">{row.bookTitle}</TableCell>
              <TableCell align="left">{row.payerName}</TableCell>
			  <TableCell align="left">{row.amount}</TableCell>
              <TableCell align="left">{new Date(row.datePaid).toUTCString()}</TableCell>
			  <TableCell align="left">{row.paymentStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
	</div>}
	</React.Fragment>
  );
};

export default PaymentOverdueTable;
