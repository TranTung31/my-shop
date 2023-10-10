import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./routes";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { Fragment, useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

function App() {
  // useEffect(() => {
  //   fetch();
  // }, []);
  const fetchAPI = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API}/product/get-all`);
    return res.data;
  }
  const query = useQuery({ queryKey: ['todos'], queryFn: fetchAPI });
  console.log('query', query);
  return (
    <div>
      <Router>
        <Routes>
          {routes.map((route, index) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                path={route.path}
                element={
                  <>
                    <Layout>
                      <Page />
                    </Layout>
                  </>
                }
                key={index}
              ></Route>
            );
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
