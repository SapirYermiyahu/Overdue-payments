import React, { useEffect } from "react";
import Form from "./components/create-payment-form";
import Navbar from "./components/navbar";
import PaymentOverdueTable from "./components/payment-overdue-table";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getAuthToken } from "./api/auth.api";
import { APIResult } from "./common/enums/api-result.enum";
import { AUTH_COOKIE } from './constant'
import { getCookie, setCookie } from './common/utils/cookies'

const App = () => {
  useEffect(() => {
    storeAuthToken();
  }, []);

/****
  Description: this function checks if we already have auth token saved in cookies,
  in case we don't have - we send API call to get one 
  @ returns void
****/
  const storeAuthToken = async () => {
    const exsitingToken = getCookie(AUTH_COOKIE)
    if (!exsitingToken) {
      const authToken = await getAuthToken();
      if (authToken.status === APIResult.SUCCESS) {	
		setCookie(AUTH_COOKIE, authToken.body.token,  new Date(new Date().getTime() + 30 * 60 * 1000))
      }
    }
  };
  return (
    <React.Fragment>
      <BrowserRouter>
        <Navbar></Navbar>
        <Routes>
          <Route path="/history" element={<PaymentOverdueTable></PaymentOverdueTable>} />
          <Route path="/" element={<Form></Form>} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
};

export default App;
