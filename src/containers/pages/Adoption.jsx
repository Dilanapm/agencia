import Footer from "components/navigation/Footer"
import Navbar from "components/navigation/Navbar"
import Layout from "hocs/layouts/Layout"
function Adoption(){
    return(
        
        <Layout>
            <Navbar/>
            <div className="text-red-500 pt-36">
            Adoptame ctmr
            </div>
            <Footer/>
            
        </Layout>
    )
}
export default Adoption