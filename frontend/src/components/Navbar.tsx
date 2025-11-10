import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link href="/clients" className="text-2xl font-bold hover:text-blue-200 transition-colors">
            Sistema de Clientes
          </Link>
          <div className="flex items-center space-x-4">
            <Link 
              href="/clients" 
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
            >
              Listagem
            </Link>
            <Link 
              href="/clients/new" 
              className="bg-white text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors font-semibold shadow-md"
            >
              + Novo Cliente
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
