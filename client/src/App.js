import { observer } from "mobx-react-lite";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { useContext } from "react";
import { Context } from "./index";
import { useState } from "react";
import { check } from "./http/useAPI";
import { useEffect } from "react";
import { Spinner } from "react-bootstrap";

const App = observer( () => {
  const {user} = useContext(Context)
  const {loading, setLoading} = useState(true)

  useEffect(  () =>{
    check().then(data => {
      user.setUser(true)
      user.setIsAuth(true)
    }).finally( () => setLoading(false))
  }, [])

  if (loading) {
    return <Spinner animation={"grow"}/>
  }

  return (
      <BrowserRouter>
        <NavBar />
        <AppRouter /> 
      </BrowserRouter>
  );
});

export default App;