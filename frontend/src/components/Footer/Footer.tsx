
export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white text-sm font-nunito py-4 px-6 mt-auto">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        {/* Texto izquierda */}
        <p>
          © {new Date().getFullYear()} PlaniCat. Todos los derechos reservados.
        </p>

        {/* Créditos / Enlaces opcionales */}
        <div className="flex gap-4 text-center md:text">
          <a href="https://github.com/AnaJiRo/TFG" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center gap-1 hover:underline">
            <img src="/assets/github.svg" alt="GitHub" className="w-5 h-5" />
            <span>GitHub</span>
          </a>
          
        </div>
      </div>
    </footer>
  );
}
