import { connect } from "react-redux"
import { Link } from "react-router-dom"
import logo_huella from 'assets/img/logo_vital.png'
import gif_load from 'assets/img/loadinggif.gif'
function Navbar(){
    return(
    <nav className="w-full  py-6 shadow-md fixed bg-orange-400">
        <div className="px-4 sm:px-6">
            <div className="ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap md:px-4 px-2">
                <div className="ml-4 mt-2">
                    <img 
                    src={logo_huella}
                    width={80}
                    height={70}
                    className=""></img>
                </div>
                <div className="ml-4 mt-2 flex-shrink-0">
                        <Link to='/home' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">inicio</Link>
                        <Link to='/adoptar' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Adoptame</Link>
                        <Link to='/donacion' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Donar</Link>
                        <Link to='/curiosidades' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Curiosidades/Tips</Link>
                        <Link to='/contactar' className="text-lg inline-flex font-sans leading-6 text-gray-900 hover:underline hover:underline-offset-8 mx-4">Contactanos</Link>
                        <button
                        type="button"
                        className="ml-12 relative inline-flex items-center rounded-md border border-transparent pl-3 pr-2 py-3 bg-orange-button text-white transition duration-300 hover:ease-in-out hover:bg-orange-700"
                        >
                            inciar sesion
                        <img src={gif_load} className="ml-2 w-7 h-4"></img>
                        </button>
                    </div>
                
            </div>
            
        </div>
    </nav>
    )
} 
const mapStateToProp=state=>({

}) 
export default connect(mapStateToProp,{

}) (Navbar)