import { useState } from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Grid } from "@mui/material";
import { createPayment } from "../api/payments-post.api";
import { CreatePaymentBody } from "../common/types";
import { APIResult } from "../common/enums/api-result.enum";

const FormComponent = () => {
  const [expValue, setExpValue] = useState("");
  const [referenceId, setReferenceId] = useState("");

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    const expMonth = data.expiration.split("/")[0].startsWith("0")
      ? data.expiration.split("/")[0].substring(1)
      : data.expiration.split("/")[0];
    const expYear = "20" + data.expiration.split("/")[1];
    const bodyForCreatePayment: CreatePaymentBody = {
      referenceId: data.referenceId,
      amount: Number(data.paymentAmount) * 1000,
      cardNumber: data.cardNumber,
      cardExpMonth: Number(expMonth),
      cardExpYear: Number(expYear),
      note: `{"book_title": "${data.bookTitle}", "payer_name": "${data.name}"}`,
      processAt: "now",
    };
    const res = await createPayment(bodyForCreatePayment);
    if (res.status === APIResult.SUCCESS) {
      alert("Payment sent successfully !");
      reset();
      setExpValue("");
      setReferenceId("");
    }
  };

  /****
  		Description: this function is for creating the expiration date format as required: MM/YY  
		@returns void
	****/
  const expriyFormat = (expValueInserted: string) => {
    if (expValueInserted) {
      const expdate = expValueInserted;
      const expDateFormatter =
        expdate.replace(/\//g, "").substring(0, 2) +
        (expdate.length > 2 ? "/" : "") +
        expdate.replace(/\//g, "").substring(2, 4);
      setExpValue(expDateFormatter);
    } else {
      setExpValue("");
    }
  };

  /****
  		Description: this function is for creating the reference id format as required: 5 letterrs - 4 numbers   
		@returns void
	****/
  const referenceIdFormat = (referenceIdInserted: string) => {
    if (referenceIdInserted) {
      const referenceId = referenceIdInserted;
      const refIdFormatter =
        referenceId.replace(/\//g, "").substring(0, 5) +
        (referenceId.length === 5 ? "-" : "") +
        referenceId.replace(/\//g, "").substring(5, 10);
      setReferenceId(refIdFormatter);
    } else {
      setReferenceId("");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-4">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            label="Reference ID"
            type="string"
            fullWidth
            variant="outlined"
            {...register("referenceId", {
              required: "Reference ID is required",
              maxLength: {
                value: 10,
                message: "Reference ID must be max 10 characters",
              },
              pattern: {
                value: /^[A-Za-z]{5}-\d{4}$/,
                message:
                  "Reference ID format is not valid, example: refId-1234",
              },
            })}
            value={referenceId}
            onChange={(e) => referenceIdFormat(e.target.value)}
            error={!!errors.referenceId}
            helperText={errors.referenceId?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Book Title"
            type="string"
            fullWidth
            variant="outlined"
            {...register("bookTitle", {
              required: "Book title is required",
              maxLength: {
                value: 30,
                message: "Book title must be at most 30 characters",
              },
            })}
            error={!!errors.bookTitle}
            helperText={errors.bookTitle?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Name of Payer"
            type="string"
            fullWidth
            variant="outlined"
            {...register("name", {
              required: "Name is required",
              maxLength: {
                value: 30,
                message: "Name must be at most 30 characters",
              },
            })}
            error={!!errors.name}
            helperText={errors.name?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Payment Amount (USD)"
            type="number"
            fullWidth
            variant="outlined"
            {...register("paymentAmount", {
              required: "Payment amount is required",
              min: {
                value: 0,
                message: "Payment amount must be positive",
              },
            })}
            error={!!errors.paymentAmount}
            helperText={errors.paymentAmount?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Card Number"
            fullWidth
            variant="outlined"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^\d{16}$/,
                message: "Card number must be a 16-digit number",
              },
            })}
            error={!!errors.cardNumber}
            helperText={errors.cardNumber?.message?.toString()}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            label="Expiration (mm/yy)"
            fullWidth
            variant="outlined"
            {...register("expiration", {
              required: "Expiration date is required",
              pattern: {
                value: /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
                message: "Expiration is not valid",
              },
            })}
            onChange={(e) => expriyFormat(e.target.value)}
            placeholder="mm / yy"
            value={expValue}
            error={!!errors.expiration}
            helperText={errors.expiration?.message?.toString()}
          />
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormComponent;
