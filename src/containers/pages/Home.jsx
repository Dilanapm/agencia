import Feature from "components/home/Feature";
import Header from "components/home/Header";
import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";

function Home() {
  return (
    
    <Layout>
      <Navbar />
      <div className="pt-20">
        <Header />
        <Feature />
      </div>
      <Footer />
    </Layout>
  );
}

export default Home;
