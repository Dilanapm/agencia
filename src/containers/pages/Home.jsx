import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
function Home(){
    return(
        
        <Layout>
            <Navbar/>
            <div className="text-red-500 pt-36">
            Homes para hacer la bienvenida
            
            </div>
            <Footer/>
        </Layout>
    )
}
export default Home