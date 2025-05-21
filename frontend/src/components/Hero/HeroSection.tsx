import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section
      className="h-screen bg-cover bg-center flex flex-col items-center justify-center text-white text-center px-4"
      style={{
        backgroundImage: "url('/assets/landing/landing-bg.png')",
      }}
    >
      <h1 className="text-3xl md:text-5xl font-bold font-poppins drop-shadow-lg uppercase tracking-wide">
        Gestor de Colonias
      </h1>
      <h2 className="text-xl md:text-3xl mt-4 font-semibold font-poppins drop-shadow-sm">
        Gestiona colonias felinas
      </h2>
      <p className="mt-4 max-w-xl text-sm md:text-lg font-nunito text-white/90">
        Tu aplicación para el manejo y cuidado de los gatos callejeros.
      </p>
      <Link to="/login">
        <button className="mt-8 px-6 py-3 text-lg rounded-xl bg-purpleTheme-primary hover:bg-purpleTheme-dark font-poppins transition-colors shadow-lg">
          Empezar
        </button>
      </Link>
    </section>
  );
}
