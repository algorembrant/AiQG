import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { X, ExternalLink, Grip, AlertCircle, Layout, Grid, Search, Github, TrendingUp, TrendingDown, Layers, ZoomIn, Maximize2, Monitor, AppWindow, ChevronRight, ChevronLeft } from 'lucide-react';

const ALL_LLMS = [
  // Major AI Assistants
  { id: 'chatgpt', name: 'ChatGPT', url: 'https://chatgpt.com/', icon: 'https://cdn.oaistatic.com/_next/static/media/apple-touch-icon.59f2e898.png', category: 'Major' },
  { id: 'claude', name: 'Claude', url: 'https://claude.ai/', icon: 'https://claude.ai/images/claude_app_icon.png', category: 'Major' },
  { id: 'gemini', name: 'Google Gemini', url: 'https://gemini.google.com/app', icon: 'https://www.gstatic.com/lamda/images/gemini_favicon_f069958c85030456e93de685481c559f160ea06b.png', category: 'Major' },
  { id: 'copilot', name: 'Microsoft Copilot', url: 'https://copilot.microsoft.com/', icon: 'https://th.bing.com/th/id/ODF.gvTtwYZxRukae9S8YAPqoA?w=32&h=32&qlt=90&pcl=fffffc&o=6&pid=1.2', category: 'Major' },

];

// Mock stock data generator
const generateMockStocks = () => {
  const symbols = [
    'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX', 'AMD', 'INTC', 
    'CRM', 'ORCL', 'ADBE', 'CSCO', 'AVGO', 'QCOM', 'TXN', 'IBM', 'INTU', 'NOW',
    'JPM', 'BAC', 'WFC', 'GS', 'MS', 'C', 'BLK', 'SCHW', 'AXP', 'V', 'MA', 'PYPL',
    'JNJ', 'UNH', 'PFE', 'ABBV', 'TMO', 'MRK', 'LLY', 'ABT', 'DHR', 'BMY', 'AMGN',
    'WMT', 'HD', 'PG', 'KO', 'PEP', 'COST', 'MCD', 'NKE', 'SBUX', 'TGT', 'LOW',
    'XOM', 'CVX', 'COP', 'SLB', 'EOG', 'PXD', 'MPC', 'PSX', 'VLO', 'OXY',
    'BA', 'HON', 'UPS', 'CAT', 'DE', 'GE', 'MMM', 'LMT', 'RTX', 'FDX',
    'DIS', 'CMCSA', 'T', 'VZ', 'TMUS', 'NFLX', 'WBD', 'PARA', 'FOXA',
    'TSLA', 'F', 'GM', 'TM', 'HMC', 'RIVN', 'LCID',
    'NVDA', 'AMD', 'INTC', 'TSM', 'AVGO', 'QCOM', 'MU', 'AMAT', 'LRCX', 'KLAC',
    'AMZN', 'BABA', 'SHOP', 'MELI', 'SQ', 'PYPL', 'EBAY',
    'CRM', 'NOW', 'SNOW', 'DDOG', 'PLTR', 'U', 'NET', 'ZS', 'CRWD', 'OKTA',
    'META', 'SNAP', 'PINS', 'RDDT',
    'GILD', 'VRTX', 'REGN', 'BIIB', 'MRNA', 'BNTX',
    'BA', 'LMT', 'NOC', 'GD', 'RTX', 'TDG',
    'NKE', 'LULU', 'TJX', 'ROST',
    'PLD', 'AMT', 'CCI', 'EQIX', 'PSA', 'O',
    'COIN', 'MSTR', 'RIOT', 'MARA',
    'SPY', 'QQQ', 'DIA', 'IWM', 'VTI', 'VOO',
    'TSM', 'ASML', 'NVO', 'SAP', 'TM', 'SONY', 'SNY'
  ];
  return symbols.map(symbol => {
    const basePrice = Math.random() * 500 + 100;
    const change = (Math.random() - 0.5) * 10;
    const percentChange = (change / basePrice) * 100;
    
    return {
      symbol,
      price: basePrice.toFixed(2),
      change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
      percent: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
      isUp: change >= 0
    };
  });
};

// Memoized Sidebar Item
const SidebarItem = React.memo(({ llm, onDragStart }) => (
  <div
    draggable
    onDragStart={(e) => onDragStart(e, llm)}
    className="p-3 border border-gray-200 rounded-lg cursor-move hover:border-gray-400 hover:shadow-sm transition-all bg-white"
  >
    <div className="flex items-center gap-3">
      <img 
        src={llm.icon} 
        alt={llm.name} 
        loading="lazy" 
        className="w-8 h-8 rounded-lg flex-shrink-0" 
        onError={(e) => {
          e.target.style.display = 'none';
        }} 
      />
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm truncate">{llm.name}</h3>
        <span className="text-xs text-gray-500">{llm.category}</span>
      </div>
      <Grip className="w-4 h-4 text-gray-400 flex-shrink-0" />
    </div>
  </div>
), (prevProps, nextProps) => {
  return prevProps.llm.id === nextProps.llm.id;
});

function App() {
  const [activeLLMs, setActiveLLMs] = useState([]);
  const draggedItemRef = useRef(null); 

  const [showSidebar, setShowSidebar] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [stocks, setStocks] = useState(() => generateMockStocks());
  const [showIntro, setShowIntro] = useState(true);
  
  // ADJUSTMENT: Hide themes by default
  const [showThemes, setShowThemes] = useState(false);
  
  const [zoomLevel, setZoomLevel] = useState(100);
  
  // ADJUSTMENT: Page state for the "Show 50 / Unshow previous" logic
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 50;

  const categories = useMemo(() => {
    return ['All', ...new Set(ALL_LLMS.map(llm => llm.category))].sort();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  // Reset page to 0 if filter changes
  useEffect(() => {
    setPage(0);
  }, [selectedCategory, searchQuery]);

  // 1. Get ALL matches (The Total Count)
  const filteredLLMs = useMemo(() => {
    return ALL_LLMS.filter(llm => {
      const matchesCategory = selectedCategory === 'All' || llm.category === selectedCategory;
      const matchesSearch = llm.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // --- OPTIMIZATION: Pagination Slice ---
  // Shows items [0-50], then [50-100], etc.
  const visibleLLMs = useMemo(() => {
    const startIndex = page * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return filteredLLMs.slice(startIndex, endIndex);
  }, [filteredLLMs, page]);
  // --------------------------------------

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        const API_KEY = 'ct9pr41r01qnhfe93jagct9pr41r01qnhfe93jb0';
        const symbols = [
          'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META', 'NVDA', 'TSLA', 'NFLX', 'AMD', 'INTC',
          'JPM', 'BAC', 'V', 'MA', 'WMT', 'HD', 'DIS', 'BA', 'KO', 'PEP',
          'COST', 'NKE', 'MCD', 'SBUX', 'XOM', 'CVX', 'JNJ', 'UNH', 'PFE', 'ABBV'
        ];
        
        const stockData = [];
        for (let i = 0; i < symbols.length; i++) {
          try {
            const symbol = symbols[i];
            const response = await fetch(
              `https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${API_KEY}`
            );
            const data = await response.json();
            
            if (data.c && data.c > 0) {
              const currentPrice = data.c;
              const change = data.d || 0;
              const percentChange = data.dp || 0;
              
              stockData.push({
                symbol,
                price: currentPrice.toFixed(2),
                change: change >= 0 ? `+${change.toFixed(2)}` : change.toFixed(2),
                percent: `${percentChange >= 0 ? '+' : ''}${percentChange.toFixed(2)}%`,
                isUp: change >= 0
              });
            }
            if (i < symbols.length - 1) {
              await new Promise(resolve => setTimeout(resolve, 100));
            }
          } catch (err) {
            console.error(`Error fetching ${symbols[i]}:`, err);
          }
        }
        
        if (stockData.length > 0) {
          setStocks(stockData);
        }
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    fetchStocks();
    const interval = setInterval(fetchStocks, 100000);
    return () => clearInterval(interval);
  }, []);

  const handleDragStart = useCallback((e, llm) => {
    draggedItemRef.current = llm;
    e.dataTransfer.effectAllowed = 'copy';
    e.dataTransfer.setData('text/plain', llm.id); 
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    const item = draggedItemRef.current;
    
    if (item) {
      setActiveLLMs(prev => {
        if (!prev.find(llm => llm.id === item.id)) {
          return [...prev, item];
        }
        return prev;
      });
    }
    draggedItemRef.current = null;
  }, []);

  const removeLLM = (id) => {
    setActiveLLMs(activeLLMs.filter(llm => llm.id !== id));
  };

  const openInNewWindow = (llm) => {
    const w = 1000, h = 800;
    const left = (window.screen.width - w) / 2;
    const top = (window.screen.height - h) / 2;
    window.open(llm.url, `llm_${llm.id}`, `width=${w},height=${h},left=${left},top=${top}`);
  };

  const openAllTabs = () => {
    if (activeLLMs.length === 0) return;
    if (window.confirm(`Attempting to open ${activeLLMs.length} new tabs. Please ensure pop-ups are enabled for this site.`)) {
      activeLLMs.forEach((llm, index) => {
        setTimeout(() => {
          window.open(llm.url, '_blank');
        }, index * 300);
      });
    }
  };

  const openAllPopups = () => {
    if (activeLLMs.length === 0) return;
    const count = activeLLMs.length;
    const screenW = window.screen.availWidth;
    const screenH = window.screen.availHeight;
    let cols = count;
    let rows = 1;
    if (count > 3) {
      cols = Math.ceil(Math.sqrt(count));
      rows = Math.ceil(count / cols);
    }
    const w = Math.floor(screenW / cols);
    const h = Math.floor(screenH / rows);

    if (window.confirm(`Attempting to open ${count} popup windows arranged side-by-side.`)) {
      activeLLMs.forEach((llm, index) => {
        const colIndex = index % cols;
        const rowIndex = Math.floor(index / cols);
        const left = colIndex * w;
        const top = rowIndex * h;
        setTimeout(() => {
          window.open(llm.url, `popup_${llm.id}_${Date.now()}`, `width=${w},height=${h},left=${left},top=${top}`);
        }, index * 300);
      });
    }
  };

  const bannerItems = useMemo(() => [...ALL_LLMS.slice(0, 20), ...ALL_LLMS.slice(0, 20)], []);
  const tickerItems = useMemo(() => stocks.length > 0 ? [...stocks, ...stocks] : [], [stocks]);

  return (
    <div className="flex flex-col h-screen bg-white text-gray-900 overflow-hidden font-sans selection:bg-yellow-200">
      
      {/* Animated Intro Screen */}
      {showIntro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black intro-screen will-change-transform">
          <div className="text-center space-y-6 px-8">
            <div className="intro-logo">
              <img 
                src="image-2.png" 
                className="w-300 h-300 mx-auto mb-4 logo-glow-glitter"
                alt="AiQuasarous Logo"
              />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold golden-glow-intro intro-title">
              AiQuasarous Global
            </h1>
            <p className="text-2xl text-gray-200 intro-subtitle font-serif italic tracking-wide">
              Drag-drop-open your favorite Model
            </p>
            <p className="text-xl text-yellow-300 intro-count font-light tracking-widest uppercase">
              Explore {ALL_LLMS.length} AI platforms available worldwide
            </p>
            <div className="flex justify-center gap-2 mt-8 intro-dots">
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      )}

      {/* Top LLM Banner */}
      <div className="h-16 flex-shrink-0 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 overflow-hidden relative border-b border-gray-700">
        <div className="absolute inset-0 flex items-center">
          <div className={`flex animate-scroll whitespace-nowrap will-change-transform ${showIntro ? 'paused' : ''}`}>
            {bannerItems.map((llm, index) => (
              <div key={`${llm.id}-${index}`} className="inline-flex items-center gap-3 px-6 py-2 mx-2 bg-white/10 rounded-lg backdrop-blur-sm hover:bg-white/20 transition-all cursor-pointer">
                <img 
                  src={llm.icon} 
                  alt={llm.name} 
                  loading="lazy"
                  className="w-6 h-6 rounded" 
                  onError={(e) => e.target.style.display = 'none'} 
                />
                <span className="font-medium text-white text-sm">{llm.name}</span>
                <span className="text-xs text-gray-300 bg-white/10 px-2 py-0.5 rounded">{llm.category}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar */}
        <div 
          className={`${showSidebar ? 'w-80' : 'w-0'} transition-all duration-300 border-r border-gray-200 flex flex-col overflow-hidden flex-shrink-0 bg-white z-10 origin-top-left`}
        >
          <div style={{ 
            zoom: `${zoomLevel}%`,
            MozTransform: `scale(${zoomLevel / 100})`,
            MozTransformOrigin: 'top left',
            width: navigator.userAgent.includes("Firefox") ? `${100 * (100 / zoomLevel)}%` : '100%',
            height: '100%'
           }} className="flex flex-col h-full">
            
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <h1 className="text-xl font-bold golden-glow whitespace-nowrap">
                  AiQuasarous Global
                </h1>
                <a 
                  href="https://github.com/algorembrant/AiQG-v1.0" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 px-3 py-1.5 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                >
                  <Github className="w-4 h-4" />
                  Star
                </a>
              </div>
              <p className="text-sm text-gray-600">Drag-drop-open your favorite Model</p>
              {/* Show total count, but mention pagination */}
              <p className="text-xs text-gray-500 mt-1">
                {filteredLLMs.length} models total
                {filteredLLMs.length > ITEMS_PER_PAGE && ` (Page ${page + 1})`}
              </p>
            </div>

            <div className="px-4 py-3 border-b border-gray-200">
              <div className="relative mb-3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search platforms..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
                />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-600">Themes</span>
                <button
                  onClick={() => setShowThemes(!showThemes)}
                  className="text-xs text-gray-600 hover:text-gray-900 underline"
                >
                  {showThemes ? 'Hide' : 'Show more'}
                </button>
              </div>
              {showThemes && (
                <div className="flex gap-2 flex-wrap">
                  {categories.map(cat => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                        selectedCategory === cat ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* List area with content-visibility for performance */}
            <div className="flex-1 overflow-y-auto p-4 content-visibility-auto">
              <div className="space-y-2">
                {visibleLLMs.map(llm => (
                  <SidebarItem 
                    key={llm.id} 
                    llm={llm} 
                    onDragStart={handleDragStart} 
                  />
                ))}
                
                {/* PAGINATION CONTROLS */}
                {(filteredLLMs.length > ITEMS_PER_PAGE) && (
                  <div className="flex items-center justify-between pt-4 mt-2 border-t border-gray-100">
                    <button 
                      onClick={() => setPage(p => Math.max(0, p - 1))}
                      disabled={page === 0}
                      className={`text-xs flex items-center gap-1 px-3 py-2 rounded ${
                        page === 0 ? 'text-gray-300' : 'text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <ChevronLeft className="w-3 h-3" />
                      Prev
                    </button>

                    <span className="text-xs text-gray-400">
                       {page * ITEMS_PER_PAGE + 1} - {Math.min((page + 1) * ITEMS_PER_PAGE, filteredLLMs.length)}
                    </span>

                    <button 
                       onClick={() => setPage(p => p + 1)}
                       disabled={(page + 1) * ITEMS_PER_PAGE >= filteredLLMs.length}
                       className={`text-xs flex items-center gap-1 px-3 py-2 rounded font-medium ${
                         (page + 1) * ITEMS_PER_PAGE >= filteredLLMs.length 
                         ? 'text-gray-300' 
                         : 'text-blue-600 hover:bg-blue-50'
                       }`}
                    >
                      + Show Next 50
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                )}

                {filteredLLMs.length === 0 && (
                    <div className="text-center text-gray-400 text-xs py-10">
                        No matches found
                    </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <div className="h-14 flex-shrink-0 border-b border-gray-200 flex items-center justify-between px-4 bg-white">
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSidebar(!showSidebar)} className="p-2 hover:bg-gray-100 rounded-lg">
                <Layout className="w-5 h-5" />
              </button>
              <div className="text-sm text-gray-600 hidden md:block">
                {activeLLMs.length} {activeLLMs.length === 1 ? 'model' : 'models'} active
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-200">
                <ZoomIn className="w-4 h-4 text-gray-500" />
                <input 
                  type="range" 
                  min="25" 
                  max="150" 
                  value={zoomLevel} 
                  onChange={(e) => setZoomLevel(e.target.value)}
                  className="w-24 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer accent-gray-900"
                />
                <span className="text-xs font-mono w-10 text-right">{zoomLevel}%</span>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={openAllTabs} 
                  disabled={activeLLMs.length === 0}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    activeLLMs.length === 0 
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
                    : 'text-white bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  <span className="hidden sm:inline">Openall Tabs</span>
                </button>

                <button 
                  onClick={openAllPopups} 
                  disabled={activeLLMs.length === 0}
                  className={`flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors ${
                    activeLLMs.length === 0 
                    ? 'text-gray-400 bg-gray-50 cursor-not-allowed' 
                    : 'text-white bg-purple-600 hover:bg-purple-700'
                  }`}
                >
                  <AppWindow className="w-4 h-4" />
                  <span className="hidden sm:inline">Openall Popups</span>
                </button>

                <button 
                  onClick={() => setActiveLLMs([])} 
                  disabled={activeLLMs.length === 0}
                  className="px-3 py-1.5 text-sm text-gray-700 hover:bg-gray-100 rounded-lg border border-transparent hover:border-gray-200 transition-all"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>

          <div 
            onDragOver={handleDragOver} 
            onDrop={handleDrop} 
            className="flex-1 overflow-auto bg-gray-50 relative p-4"
          >
            {activeLLMs.length === 0 ? (
              <div className="h-full flex items-center justify-center text-gray-400">
                <div className="text-center">
                  <Grid className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">Drop AI models here</p>
                  <p className="text-sm mt-2">Drag from sidebar</p>
                </div>
              </div>
            ) : (
              <div className={`grid gap-4 h-full ${
                activeLLMs.length === 1 ? 'grid-cols-1' :
                activeLLMs.length === 2 ? 'grid-cols-2' :
                activeLLMs.length === 3 ? 'grid-cols-3' :
                activeLLMs.length === 4 ? 'grid-cols-2 grid-rows-2' : 
                'grid-cols-3 auto-rows-fr'
              }`}>
                {activeLLMs.map((llm) => (
                  <div key={llm.id} className="relative border border-gray-200 rounded-lg overflow-hidden bg-white flex flex-col shadow-sm h-full">
                    <div className="h-10 flex-shrink-0 flex items-center justify-between px-3 border-b border-gray-200 bg-gray-50">
                      <div className="flex items-center gap-2">
                        <img 
                          src={llm.icon} 
                          alt={llm.name} 
                          className="w-5 h-5 rounded" 
                          onError={(e) => e.target.style.display = 'none'} 
                        />
                        <span className="font-medium text-sm">{llm.name}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button onClick={() => openInNewWindow(llm)} className="p-1.5 hover:bg-gray-200 rounded">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => removeLLM(llm.id)} className="p-1.5 hover:bg-gray-200 rounded">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 relative bg-gray-50 overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center p-8">
                        <div className="text-center space-y-4">
                          <AlertCircle className="w-12 h-12 mx-auto text-gray-400" />
                          <div>
                            <h3 className="font-medium text-gray-900 mb-2">Direct Embedding Blocked</h3>
                            <p className="text-sm text-gray-600 mb-4">Security policies prevent iframe loading</p>
                            <div className="space-y-2 max-w-xs mx-auto">
                              <button onClick={() => openInNewWindow(llm)} className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5">
                                <ExternalLink className="w-4 h-4" />
                                Open Popup Window
                              </button>
                              <a href={llm.url} target="_blank" rel="noopener noreferrer" className="block w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-white text-center text-sm transition-colors">
                                Open in New Tab
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Stock Ticker */}
      <div className="h-10 flex-shrink-0 bg-gray-900 overflow-hidden relative border-t border-gray-700 z-20">
        <div className="absolute inset-0 flex items-center">
          {stocks.length > 0 && (
            <div className={`flex animate-scroll-reverse whitespace-nowrap will-change-transform ${showIntro ? 'paused' : ''}`}>
              {tickerItems.map((stock, index) => (
                <div key={`${stock.symbol}-${index}`} className="inline-flex items-center gap-2 px-4 py-1 mx-2 text-sm">
                  <span className="font-semibold text-white">{stock.symbol}</span>
                  <span className="text-gray-300">${stock.price}</span>
                  <span className={`flex items-center gap-1 ${stock.isUp ? 'text-green-400' : 'text-red-400'}`}>
                    {stock.isUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {stock.change} ({stock.percent})
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        /* Forces GPU usage to prevent repaint lag */
        .will-change-transform {
          will-change: transform;
          transform: translateZ(0);
        }

        /* Stops animations that eat CPU when intro is up */
        .paused {
          animation-play-state: paused !important;
        }

        /* Massive performance boost for long lists - tells browser to not render off-screen items fully */
        .content-visibility-auto {
          content-visibility: auto; 
          contain-intrinsic-size: 60px; /* Approximate height of one item */
        }

        @keyframes scroll {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-33.33%, 0, 0); }
        }
        @keyframes scroll-reverse {
          0% { transform: translate3d(-33.33%, 0, 0); }
          100% { transform: translate3d(0, 0, 0); }
        }
        
        @keyframes glitter {
          0%, 100% { filter: drop-shadow(0 0 4px rgba(255, 215, 0, 0.6)); transform: scale(1); }
          50% { filter: drop-shadow(0 0 8px rgba(255, 215, 0, 0.8)); transform: scale(1.05); }
        }
        @keyframes glow-pulse {
          0%, 100% { text-shadow: 0 0 5px rgba(255, 215, 0, 0.4); }
          50% { text-shadow: 0 0 10px rgba(255, 215, 0, 0.6); }
        }
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; pointer-events: none; visibility: hidden; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        
        .intro-screen { animation: fadeOut 0.5s ease-in-out 3.5s forwards; }
        .intro-logo { animation: scaleIn 0.6s ease-out; }
        .logo-glow-glitter { animation: glitter 3s ease-in-out infinite; border-radius: 8px; }
        .intro-title { animation: slideUp 0.8s ease-out 0.3s both; }
        .intro-subtitle { animation: slideUp 0.8s ease-out 0.6s both; }
        .intro-count { animation: slideUp 0.8s ease-out 0.9s both; letter-spacing: 0.15em; }
        .intro-dots { animation: slideUp 0.8s ease-out 1.2s both; }
        
        .golden-glow {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffa500 50%, #ffed4e 75%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow-pulse 3s ease-in-out infinite, gradient-shift 5s ease infinite;
        }
        .golden-glow-intro {
          background: linear-gradient(135deg, #ffd700 0%, #ffed4e 25%, #ffa500 50%, #ffed4e 75%, #ffd700 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: glow-pulse 3s ease-in-out infinite, gradient-shift 5s ease infinite;
        }

        .animate-scroll { animation: scroll 300s linear infinite; }
        .animate-scroll-reverse { animation: scroll-reverse 1500s linear infinite; }
        .animate-scroll:hover, .animate-scroll-reverse:hover { animation-play-state: paused; }
        
        input[type=range] {
          -webkit-appearance: none;
          background: transparent;
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #111827;
          cursor: pointer;
          margin-top: -6px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.3);
        }
        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #E5E7EB;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}

export default App;