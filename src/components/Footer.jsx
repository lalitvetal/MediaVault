import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const year = new Date().getFullYear();
  const theme = useSelector((state) => state.theme.mode);
  const isDark = theme === 'dark';

  const techStack = [
    { name: 'React 19', color: '#61dafb' },
    { name: 'Redux Toolkit', color: '#764abc' },
    { name: 'Tailwind CSS', color: '#38bdf8' },
    { name: 'Vite', color: '#646cff' },
    { name: 'Axios', color: '#5a29e4' },
    { name: 'Intersection Observer', color: '#34d399' }
  ];

  const apis = [
    { name: 'Unsplash API', url: 'https://unsplash.com/developers' },
    { name: 'Pexels API', url: 'https://www.pexels.com/api/' },
    { name: 'Giphy API', url: 'https://developers.giphy.com/' }
  ];

  return (
    <footer
      className={`w-full mt-20 border-t transition-colors duration-300 ${isDark
          ? 'border-white/10 bg-gradient-to-b from-black/20 to-black/40'
          : 'border-gray-200 bg-gradient-to-b from-gray-50 to-white'
        } backdrop-blur-xl`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-12 md:py-16">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 lg:gap-20">

          {/* Brand Section */}
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl shadow-purple-500/30 hover:shadow-purple-500/50 transition-shadow duration-300">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="white">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" />
                  <rect x="14" y="3" width="7" height="7" rx="1.5" />
                  <rect x="3" y="14" width="7" height="7" rx="1.5" />
                  <rect x="14" y="14" width="7" height="7" rx="1.5" />
                </svg>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                MediaVault
              </span>
            </div>
            <p className={`${isDark ? 'text-gray-400' : 'text-slate-600'
              } text-sm leading-relaxed max-w-xs`}>
              A high-performance media discovery engine built for speed and visual excellence.
              Save and download stunning assets instantly.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-5">
            <h3 className={`${isDark ? 'text-white' : 'text-slate-900'
              } font-semibold text-sm uppercase tracking-wider`}>
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  to="/"
                  className={`${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'
                    } text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group`}
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Discover
                </Link>
              </li>
              <li>
                <Link
                  to="/collections"
                  className={`${isDark ? 'text-gray-400 hover:text-purple-400' : 'text-slate-600 hover:text-purple-600'
                    } text-sm transition-all duration-200 hover:translate-x-1 inline-flex items-center gap-2 group`}
                >
                  <span className="w-1 h-1 rounded-full bg-purple-500 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  My Collection
                </Link>
              </li>
            </ul>
          </div>

          {/* APIs Section */}
          <div className="flex flex-col gap-5">
            <h3 className={`${isDark ? 'text-white' : 'text-slate-900'
              } font-semibold text-sm uppercase tracking-wider`}>
              Powered By
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {apis.map((api) => (
                <a
                  key={api.name}
                  href={api.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`px-4 py-2 rounded-lg border text-xs font-medium transition-all duration-200 hover:scale-105 ${isDark
                      ? 'bg-white/5 border-white/10 text-gray-300 hover:border-purple-500/50 hover:bg-purple-500/10'
                      : 'bg-black/5 border-black/10 text-slate-700 hover:border-purple-500/50 hover:bg-purple-500/5'
                    }`}
                >
                  {api.name}
                </a>
              ))}
            </div>
          </div>

        </div>

        {/* Tech Stack Section */}
        <div className={`mt-16 pt-12 border-t ${isDark ? 'border-white/10' : 'border-gray-200'
          }`}>
          <p className={`text-xs uppercase tracking-widest mb-6 font-semibold ${isDark ? 'text-gray-500' : 'text-slate-500'
            }`}>
            Built with Robust Technologies
          </p>
          <div className="flex flex-wrap gap-2.5">
            {techStack.map((tech) => (
              <span
                key={tech.name}
                style={{
                  borderColor: `${tech.color}40`,
                  color: tech.color
                }}
                className={`px-4 py-1.5 rounded-full border text-xs font-semibold transition-all duration-200 hover:scale-105 ${isDark ? 'bg-white/5 hover:bg-white/10' : 'bg-black/5 hover:bg-black/10'
                  }`}
              >
                {tech.name}
              </span>
            ))}
          </div>
        </div>

        {/* Copyright Bar */}
        <div className={`mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 border-t ${isDark ? 'border-white/5 text-gray-500' : 'border-gray-200 text-slate-500'
          } text-xs`}>
          <p>© {year} MediaVault. Crafted with precision for visual storytellers.</p>

          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-tight text-green-500">
                Systems Live
              </span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;