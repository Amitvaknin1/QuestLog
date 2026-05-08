export default function Header() {
  return (
    <header className="bg-gray-900 border-b border-gray-700 shadow-lg">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Logo / Icon */}
          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow">
            Q
          </div>
          <div>
            <h1 className="text-white font-bold text-xl tracking-tight leading-none">
              QuestLog
            </h1>
            <p className="text-gray-400 text-xs mt-0.5">Quest Tracker Dashboard</p>
          </div>
        </div>

        <nav className="flex items-center gap-4">
          <span className="text-gray-400 text-sm">v0.1.0</span>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
