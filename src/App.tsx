import { BrowserRouter as Router } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import { registerServiceWorker } from "@/utils/registerServiceWorker";
import { Layout } from "@/Layout";

const App = () => {
  // registerServiceWorker();
  return (
    <HelmetProvider>
      <Router basename="/">
        <Layout />
      </Router>
    </HelmetProvider>
  );
}

export default App;