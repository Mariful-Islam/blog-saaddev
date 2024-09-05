import { Helmet } from "react-helmet-async";
import HomeMain from "../components/Home/HomeMain";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Saad Insider | Blog</title>
        <meta title="description" content="A blog for programming lover" />
        <link rel="canonical" href="/" />
      </Helmet>
      <HomeMain />
    </>
  );
};

export default Home;
