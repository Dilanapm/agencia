import Footer from "components/navigation/Footer";
import Navbar from "components/navigation/Navbar";
import Layout from "hocs/layouts/Layout";
import AdoptionItem from "components/adoption/AdoptionItem";

// Importa las imágenes
import Mascota1Image from "assets/adoption/mascota1.jpg";
import Mascota2Image from "assets/adoption/mascota2.jpg";
import Mascota3Image from "assets/adoption/mascota3.jpg";

function Adoption() {
    return (
        <Layout>
            <Navbar />
            <div className="pt-36 container mx-auto px-4">
                <h1 className="text-5xl font-bold text-center text-gray-800 mb-8">Adopción de Mascotas</h1>
                <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
                    Ayúdanos a darles una segunda oportunidad a estos adorables amigos peludos. ¡Haz clic en "Adoptar" para darle un hogar!
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    <AdoptionItem 
                        image={Mascota1Image} 
                        name="Canelo" 
                        description="Un perrito cariñoso y fiel, perfecto para cualquier familia." 
                    />
                    <AdoptionItem 
                        image={Mascota2Image} 
                        name="Luna" 
                        description="Es juguetona y le encanta correr al aire libre." 
                    />
                    <AdoptionItem 
                        image={Mascota3Image} 
                        name="Rocky" 
                        description="Un guardián fiel y amigable que ama la compañía." 
                    />
                    {/* Agrega más mascotas según sea necesario */}
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default Adoption;
