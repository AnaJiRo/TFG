
export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white text-sm font-nunito py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Texto izquierda */}
        <p className="text-center md:text-left">
          © {new Date().getFullYear()} Gestor de Colonias. Todos los derechos reservados.
        </p>

        {/* Créditos / Enlaces opcionales */}
        <div className="flex gap-4 text-center md:text">
          <a href="https://github.com/AnaJiRo/TFG" target="_blank" rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:underline">
            <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
          <a href="#" className="hover:underline">Contacto</a>
        </div>
      </div>
    </footer>
  );
}
