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
                <h1 className="text-4xl font-bold text-center mb-8">Adopción de Mascotas</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Llama a <AdoptionItem /> con diferentes imágenes y descripciones */}
                    <AdoptionItem 
                        image={Mascota1Image} 
                        name="Nombre de Mascota 1" 
                        description="Descripción de Mascota 1" 
                    />
                    <AdoptionItem 
                        image={Mascota2Image} 
                        name="Nombre de Mascota 2" 
                        description="Descripción de Mascota 2" 
                    />
                    <AdoptionItem 
                        image={Mascota3Image} 
                        name="Nombre de Mascota 3" 
                        description="Descripción de Mascota 3" 
                    />
                    {/* Agrega más mascotas según sea necesario */}
                </div>
            </div>
            <Footer />
        </Layout>
    );
}

export default Adoption;
