import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
function Curiosities(){
    return(
        
        <Layout>
            <Navbar/>
            <div className="text-red-500 pt-36">
             Curiosidades
            </div>
            <Footer/>
            
        </Layout>
    )
}
export default Curiosities