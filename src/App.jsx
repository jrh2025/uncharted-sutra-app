import React, { useState, createContext, useContext, useMemo, useCallback, useEffect } from 'react';

// --- 模擬圖示 (使用 SVG) ---
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 0 0 9 22a4 4 0 0 0 5-5.172" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 0 1 15 22a4 4 0 0 1-5-5.172" /><path d="M12 5a3 3 0 0 0-3 3" /><path d="M12 5a3 3 0 0 1 3 3" /><path d="M12 8v4" /><path d="M12 17v-1" /><path d="m15 13-3 1-3-1" /><path d="M9 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M15 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M6.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /><path d="M18.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /><path d="M9 15a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M15 15a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /></svg>
);
const SparklesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-sparkles"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
);
const ZapIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-zap"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>;
const CombineIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-combine"><rect width="8" height="8" x="2" y="2" rx="2"/><path d="M14 2h6a2 2 0 0 1 2 2v6"/><path d="M2 14v6a2 2 0 0 0 2 2h6"/><rect width="8" height="8" x="14" y="14" rx="2"/></svg>;
const ArrowRightIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>;
const Volume2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14"/></svg>;
const VolumeXIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-volume-x"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>;
const RefreshCwIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-refresh-cw"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/><path d="M3 21v-5h5"/></svg>;
const KeyRoundIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-key-round"><path d="M2 18v3c0 .6.4 1 1 1h4v-3h3v-3h2l1.4-1.4a6.5 6.5 0 1 0-4-4Z"/><circle cx="16.5" cy="7.5" r=".5"/></svg>;


// --- 加載動畫元件 ---
const LoadingAnimation = () => {
    const [animationType, setAnimationType] = useState(null);

    useEffect(() => {
        const types = ['ripples', 'threads', 'seed', 'lotus', 'dharmaWheel', 'bodhiLeaf'];
        const randomType = types[Math.floor(Math.random() * types.length)];
        setAnimationType(randomType);
    }, []);

    const renderAnimation = () => {
        switch (animationType) {
            case 'ripples':
                return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="0" fill="none" stroke="#66fcf1" strokeWidth="2">
                            <animate attributeName="r" from="0" to="45" dur="2.5s" begin="0s" repeatCount="indefinite" /><animate attributeName="opacity" from="1" to="0" dur="2.5s" begin="0s" repeatCount="indefinite" />
                        </circle>
                        <circle cx="50" cy="50" r="0" fill="none" stroke="#45a29e" strokeWidth="2">
                            <animate attributeName="r" from="0" to="45" dur="2.5s" begin="1.2s" repeatCount="indefinite" /><animate attributeName="opacity" from="1" to="0" dur="2.5s" begin="1.2s" repeatCount="indefinite" />
                        </circle>
                    </svg>
                );
            case 'threads':
                 return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#c5c6c7" /><stop offset="100%" stopColor="#45a29e" /></linearGradient></defs>
                        <line x1="0" y1="50" x2="100" y2="50" stroke="url(#g)" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="10s" repeatCount="indefinite" /></line>
                        <line x1="50" y1="0" x2="50" y2="100" stroke="url(#g)" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="0 50 50" to="-360 50 50" dur="12s" repeatCount="indefinite" /></line>
                         <line x1="0" y1="0" x2="100" y2="100" stroke="url(#g)" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="45 50 50" to="405 50 50" dur="8s" repeatCount="indefinite" /></line>
                         <line x1="100" y1="0" x2="0" y2="100" stroke="url(#g)" strokeWidth="1"><animateTransform attributeName="transform" type="rotate" from="-45 50 50" to="315 50 50" dur="9s" repeatCount="indefinite" /></line>
                    </svg>
                 );
            case 'seed':
                return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="5" fill="#66fcf1"><animate attributeName="r" values="5;8;5" dur="3s" repeatCount="indefinite" /><animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" /></circle>
                        {[...Array(8)].map((_, i) => (<g key={i} transform={`rotate(${i * 45} 50 50)`}><circle cx="70" cy="50" r="2.5" fill="#c5c6c7" opacity="0"><animate attributeName="opacity" values="0;1;1;0" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" /><animate attributeName="cx" values="60;75;60" dur="2s" begin={`${i * 0.25}s`} repeatCount="indefinite" /></circle></g>))}
                    </svg>
                );
            case 'lotus':
                return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <g transform="translate(50, 80)">
                            {[...Array(8)].map((_, i) => (
                                <path key={i} transform={`rotate(${i * 45})`} d="M0,0 C10,-20 20,-40 0,-60 C-20,-40 -10,-20 0,0" fill="#66fcf1" fillOpacity="0">
                                    <animate attributeName="fill-opacity" values="0;0.5;0" dur="4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                                    <animateTransform attributeName="transform" type="scale" values="1;1.1;1" dur="4s" begin={`${i * 0.2}s`} repeatCount="indefinite" />
                                </path>
                            ))}
                        </g>
                    </svg>
                );
            case 'dharmaWheel':
                return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <g stroke="#66fcf1" strokeWidth="3" fill="none">
                            <circle cx="50" cy="50" r="35" />
                            <circle cx="50" cy="50" r="10" />
                            {[...Array(8)].map((_, i) => (
                                <line key={i} x1="50" y1="50" x2="50" y2="15" transform={`rotate(${i * 45}, 50, 50)`} />
                            ))}
                        </g>
                        <animateTransform attributeName="transform" type="rotate" from="0 50 50" to="360 50 50" dur="15s" repeatCount="indefinite" />
                    </svg>
                );
            case 'bodhiLeaf':
                return (
                    <svg width="80" height="80" viewBox="0 0 100 100">
                        <path d="M50,10 C80,30 80,70 50,90 C20,70 20,30 50,10 Z" fill="#45a29e" />
                        <line x1="50" y1="10" x2="50" y2="90" stroke="#66fcf1" strokeWidth="1.5" />
                        <animateTransform attributeName="transform" type="rotate" from="-10 50 50" to="10 50 50" dur="3s" values="-10 50 50; 10 50 50; -10 50 50" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.8;1;0.8" dur="3s" repeatCount="indefinite" />
                    </svg>
                );
            default:
                return null;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center">
            {renderAnimation()}
            <p className="text-gray-300 animate-pulse mt-2">正在觀照因緣...</p>
        </div>
    );
};

// --- 遊戲狀態管理 (Context API) ---
const GameStateContext = createContext();

const getInitialPlayerState = () => ({
    skandhas: { rupa: 70, vedana: 50, samjna: 50, samskara: 40, vijnana: 50 },
    karma: { greed: 50, hatred: 40, delusion: 60 },
    bodhisattvaPath: { stage: '十信位', progress: 0 },
    thoughts: {
        equipped: [],
        available: [],
        synthesized: []
    },
    loginCount: 1
});

const PlayerStateProvider = ({ children }) => {
    const [playerState, setPlayerState] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            const savedStateJSON = localStorage.getItem(`sutra_save_${storedKey}`);
            if (savedStateJSON) {
                try {
                    const savedState = JSON.parse(savedStateJSON);
                    savedState.loginCount = (savedState.loginCount || 1) + 1;
                    setPlayerState(savedState);
                    setShowWelcomeModal(true);
                } catch (e) {
                    console.error("解析存檔失敗:", e);
                    setPlayerState(getInitialPlayerState());
                    setShowWelcomeModal(true);
                }
            } else {
                setPlayerState(getInitialPlayerState());
                setShowWelcomeModal(true);
            }
        } else {
            setPlayerState(getInitialPlayerState());
        }
    }, []);

    useEffect(() => {
        if (playerState && apiKey) {
            localStorage.setItem(`sutra_save_${apiKey}`, JSON.stringify(playerState));
        }
    }, [playerState, apiKey]);

    const applyEffects = useCallback((effects) => {
        if (!effects) return;
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            if (effects.karma) {
                for (const [key, value] of Object.entries(effects.karma)) {
                    if (newState.karma[key] !== undefined) newState.karma[key] = Math.max(0, Math.min(100, newState.karma[key] + value));
                }
            }
            if (effects.skandhas) {
                for (const [key, value] of Object.entries(effects.skandhas)) {
                     if (newState.skandhas[key] !== undefined) newState.skandhas[key] = Math.max(0, Math.min(100, newState.skandhas[key] + value));
                }
            }
            return newState;
        });
    }, []);
    
    const equipThought = useCallback((thoughtId) => {
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const thoughtToEquip = newState.thoughts.available.find(t => t.id === thoughtId);
            if (!thoughtToEquip) return newState;
            newState.thoughts.available = newState.thoughts.available.filter(t => t.id !== thoughtId);
            newState.thoughts.equipped.push({ ...thoughtToEquip, internalizing: true, progress: 0 });
            return newState;
        });
    }, []);

    const addNewThought = useCallback((thought) => {
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const newId = Math.max(0, ...(newState.thoughts.available.map(t => t.id)), ...(newState.thoughts.equipped.map(t => t.id))) + 1;
            newState.thoughts.available.push({ ...thought, id: newId });
            return newState;
        });
    }, []);

    const synthesizeThoughts = useCallback((thoughtId1, thoughtId2, newThought) => {
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            newState.thoughts.equipped = newState.thoughts.equipped.filter(t => t.id !== thoughtId1 && t.id !== thoughtId2);
            const newId = Math.max(0, ...(newState.thoughts.available.map(t => t.id)), ...(newState.thoughts.equipped.map(t => t.id))) + 1;
            const synthesizedThought = { ...newThought, id: newId, internalizing: false, progress: 100 };
            newState.thoughts.equipped.push(synthesizedThought);
            newState.thoughts.synthesized.push({ from: [thoughtId1, thoughtId2], to: newId });
            return newState;
        });
    }, []);
    
    const reincarnate = useCallback(() => {
        const prevState = playerState;
        const newKarma = {
            greed: Math.max(10, 50 - Math.floor((100 - prevState.karma.greed) / 3) + (Math.random() * 30 - 15)),
            hatred: Math.max(10, 50 - Math.floor((100 - prevState.karma.hatred) / 3) + (Math.random() * 30 - 15)),
            delusion: Math.max(10, 50 - Math.floor((100 - prevState.karma.delusion) / 3) + (Math.random() * 30 - 15)),
        };
        const newSkandhas = {
            rupa: Math.max(20, 60 + (Math.random() * 40 - 20)),
            vedana: Math.max(20, 50 + (prevState.karma.hatred / 10) + (Math.random() * 20 - 10)),
            samjna: Math.max(20, 50 - (prevState.karma.delusion / 10) + (Math.random() * 20 - 10)),
            samskara: Math.max(20, 40 + (Math.random() * 20 - 10)),
            vijnana: 50,
        };
        const carriedOverThought = prevState.thoughts.equipped.length > 0 && Math.random() < 0.2
            ? { ...prevState.thoughts.equipped[Math.floor(Math.random() * prevState.thoughts.equipped.length)], internalizing: false, progress: 0 }
            : null;
        const newInitialState = {
            ...getInitialPlayerState(),
            skandhas: { rupa: Math.round(newSkandhas.rupa), vedana: Math.round(newSkandhas.vedana), samjna: Math.round(newSkandhas.samjna), samskara: Math.round(newSkandhas.samskara), vijnana: Math.round(newSkandhas.vijnana) },
            karma: { greed: Math.round(newKarma.greed), hatred: Math.round(newKarma.hatred), delusion: Math.round(newKarma.delusion) },
            thoughts: { equipped: [], available: carriedOverThought ? [carriedOverThought] : [], synthesized: [] },
        };
        return newInitialState;
    }, [playerState]);

    const value = useMemo(() => ({ playerState, setPlayerState, apiKey, setApiKey, applyEffects, equipThought, addNewThought, synthesizeThoughts, reincarnate, showWelcomeModal, setShowWelcomeModal }), [playerState, setPlayerState, apiKey, setApiKey, applyEffects, equipThought, addNewThought, synthesizeThoughts, reincarnate, showWelcomeModal, setShowWelcomeModal]);

    return <GameStateContext.Provider value={value}>{children}</GameStateContext.Provider>;
};

const usePlayerState = () => useContext(GameStateContext);

// --- UI 元件 (無重大變更的元件將被簡化) ---
const MandalaUI = React.memo(() => {
    const { playerState } = usePlayerState();
    if (!playerState) return null;
    const { rupa, vedana, samjna, samskara, vijnana } = playerState.skandhas;
    const { greed, hatred, delusion } = playerState.karma;
    const size = 320;
    const center = size / 2;

    const getPathData = (radius, value) => {
        const angle = (value / 100) * 360;
        const x = center + radius * Math.cos((angle - 90) * Math.PI / 180);
        const y = center + radius * Math.sin((angle - 90) * Math.PI / 180);
        const largeArcFlag = angle <= 180 ? "0" : "1";
        return `M ${center},${center - radius} A ${radius},${radius} 0 ${largeArcFlag},1 ${x},${y}`;
    };

    const getKarmaColor = (value) => `hsl(0, ${value}%, 50%)`;
    const getSkandhaColor = (value) => `hsl(${120 - (value / 100 * 120)}, 80%, 60%)`;
    const netKarma = 100 - (greed + hatred + delusion) / 3;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700 flex flex-col items-center">
            <h2 className="text-2xl font-light text-teal-200 mb-4">心靈曼陀羅</h2>
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
                <defs>
                    <radialGradient id="mandala-bg">
                        <stop offset="0%" stopColor="#1a202c" /><stop offset="100%" stopColor="#2d3748" />
                    </radialGradient>
                </defs>
                <circle cx={center} cy={center} r={center - 5} fill="url(#mandala-bg)" stroke="#4a5568" strokeWidth="1" />
                <circle cx={center} cy={center} r={vijnana / 5 + 10} fill="#f0e68c" opacity={vijnana / 100}>
                     <animate attributeName="r" values={`${vijnana / 5 + 8};${vijnana / 5 + 12};${vijnana / 5 + 8}`} dur="5s" repeatCount="indefinite" />
                </circle>
                <circle cx={center} cy={center} r={10} fill="#f0e68c" opacity="0.5" />
                <text x={center} y={center + 4} textAnchor="middle" fontSize="10" fill="#1a202c">識</text>
                {[
                    { value: rupa, radius: 40, name: '色' }, { value: vedana, radius: 65, name: '受' },
                    { value: samjna, radius: 90, name: '想' }, { value: samskara, radius: 115, name: '行' },
                ].map((skandha, i) => (
                    <path key={i} d={getPathData(skandha.radius, skandha.value)} fill="none" stroke={getSkandhaColor(skandha.value)} strokeWidth="8" strokeLinecap="round" style={{ transition: 'all 0.5s ease-in-out' }} />
                ))}
                <g transform={`rotate(${delusion - 50}, ${center}, ${center})`} style={{ transition: 'transform 0.5s ease-in-out' }}>
                    <rect x={center - (netKarma * 1.2)} y={center - (netKarma * 1.2)} width={netKarma * 2.4} height={netKarma * 2.4} fill="none" stroke={`rgba(134, 239, 172, ${netKarma/100})`} strokeWidth="2" rx="10" />
                </g>
                <path d={`M ${center},${center} L ${center + greed}, ${center - greed}`} stroke={getKarmaColor(greed)} strokeWidth="2" strokeDasharray="4" />
                <path d={`M ${center},${center} L ${center - hatred}, ${center + hatred}`} stroke={getKarmaColor(hatred)} strokeWidth="2" strokeDasharray="4" />
                <path d={`M ${center},${center} L ${center + delusion}, ${center + delusion}`} stroke={getKarmaColor(delusion)} strokeWidth="2" strokeDasharray="4" />
                <text x={center} y={22} textAnchor="middle" fill="#9ae6b4" fontSize="12">色</text>
                <text x={center} y={50} textAnchor="middle" fill="#9ae6b4" fontSize="12">受</text>
                <text x={center} y={78} textAnchor="middle" fill="#9ae6b4" fontSize="12">想</text>
                <text x={center} y={106} textAnchor="middle" fill="#9ae6b4" fontSize="12">行</text>
            </svg>
        </div>
    );
});
const KarmaDashboard = React.memo(() => {
    const { playerState } = usePlayerState();
    if (!playerState) return null;
    const { greed, hatred, delusion } = playerState.karma;
    const getPath = () => {
        const totalPoison = greed + hatred + delusion;
        if (totalPoison > 250 && hatred > 80) return { name: '地獄道', color: 'text-red-400', desc: '極端瞋恨' };
        if (totalPoison > 250 && greed > 80) return { name: '餓鬼道', color: 'text-yellow-400', desc: '極端貪婪' };
        if (totalPoison > 250 && delusion > 80) return { name: '畜生道', color: 'text-gray-400', desc: '極端愚癡' };
        const netKarma = (300 - totalPoison) / 3;
        if (netKarma > 80) return { name: '天道', color: 'text-sky-300', desc: '巨大善業' };
        if (netKarma > 50 && hatred > 50) return { name: '阿修羅道', color: 'text-orange-400', desc: '善妒好鬥' };
        return { name: '人道', color: 'text-green-300', desc: '善惡平衡' };
    };
    const destination = getPath();
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700">
            <h2 className="text-2xl font-light text-teal-200 mb-4">業力儀表板</h2>
            <div className="space-y-4">
                {Object.entries(playerState.karma).map(([key, value]) => (
                    <div key={key}>
                        <div className="flex justify-between mb-1">
                            <span className="text-base font-medium text-cyan-200 capitalize">{ {greed: '貪', hatred: '瞋', delusion: '癡'}[key] }</span>
                            <span className="text-sm font-medium text-cyan-200">{value}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2.5">
                            <div className="bg-red-500 h-2.5 rounded-full" style={{ width: `${value}%`, transition: 'width 0.5s' }}></div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 border-t border-gray-700 pt-4 text-center">
                <h3 className="text-lg text-cyan-300">當前業力引導方向：</h3>
                <p className={`text-3xl font-bold ${destination.color} my-2`}>{destination.name}</p>
                <p className="text-sm text-gray-400">({destination.desc})</p>
            </div>
        </div>
    );
});
const BodhisattvaPath = React.memo(() => {
    const { playerState } = usePlayerState();
    if (!playerState) return null;
    const { stage, progress } = playerState.bodhisattvaPath;
    const stages = ['十信位', '十住位', '十行位', '十迴向位', '十地位'];
    const currentStageIndex = stages.indexOf(stage);
    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700">
            <h2 className="text-2xl font-light text-teal-200 mb-4">菩薩道階位</h2>
            <div className="relative">
                <div className="flex justify-between items-center text-xs text-gray-400">{stages.map(s => <span key={s}>{s}</span>)}</div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 my-2">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2.5 rounded-full" style={{ width: `${(currentStageIndex * 25) + (progress * 0.25)}%`, transition: 'width 0.5s' }}></div>
                </div>
                <div className="text-center mt-2"><p className="text-lg text-white">當前境界：<span className="font-bold text-teal-300">{stage}</span></p></div>
            </div>
        </div>
    );
});

// --- 思想櫥櫃 (v4) ---
const ThoughtCabinet = React.memo(() => {
    const { playerState, equipThought, synthesizeThoughts } = usePlayerState();
    if (!playerState) return null;
    const { equipped, available } = playerState.thoughts;

    const findConflicts = () => {
        const conflicts = [];
        const equippedIds = equipped.map(t => t.id);
        for (const thought of equipped) {
            if (thought.conflictsWith) {
                for (const conflictId of thought.conflictsWith) {
                    if (equippedIds.includes(conflictId)) {
                        const conflictPair = [thought.id, conflictId].sort((a,b) => a-b);
                        if (!conflicts.some(p => p[0] === conflictPair[0] && p[1] === conflictPair[1])) {
                            conflicts.push(conflictPair);
                        }
                    }
                }
            }
        }
        return conflicts;
    };

    const conflicts = findConflicts();
    const isConflicting = (thoughtId) => conflicts.flat().includes(thoughtId);

    const handleSynthesize = (conflictPair) => {
        const newSynthesizedThought = {
            name: '修復性正義',
            effect: '在衝突後能選擇恢復關係的選項，並獲得智慧。',
            description: '在慈悲與憤怒的衝突中，找到了中道。'
        };
        synthesizeThoughts(conflictPair[0], conflictPair[1], newSynthesizedThought);
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700 flex-1">
            <h2 className="text-2xl font-light text-teal-200 mb-4 flex items-center"><BrainIcon /> <span className="ml-2">思想櫥櫃</span></h2>
            
            {conflicts.length > 0 && (
                <div className="mb-4 p-3 bg-red-900/50 border border-red-500 rounded-lg">
                    <h4 className="font-bold text-red-300 flex items-center"><ZapIcon className="mr-2"/>內心衝突</h4>
                    <p className="text-sm text-red-400 mb-2">相互矛盾的思想正在你的心中交戰，這會阻礙你的修行。</p>
                    {conflicts.map((pair, index) => (
                        <button key={index} onClick={() => handleSynthesize(pair)} className="w-full text-center bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-500 transition-colors text-sm flex items-center justify-center">
                           <CombineIcon className="mr-2"/> 尋求中道，昇華思想
                        </button>
                    ))}
                </div>
            )}

            <div>
                <h3 className="text-lg text-cyan-300 font-semibold mb-2">已裝備 / 內化中</h3>
                <div className="space-y-3">
                    {equipped.map(thought => (
                        <div key={thought.id} className={`bg-gray-900/70 p-3 rounded-lg border ${isConflicting(thought.id) ? 'border-red-500 animate-pulse' : 'border-transparent'}`}>
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-white">{thought.name}</span>
                                <span className={`text-xs px-2 py-1 rounded-full ${thought.internalizing ? 'bg-yellow-500 text-black' : 'bg-green-500 text-black'}`}>{thought.internalizing ? '內化中' : '已完成'}</span>
                            </div>
                            <p className="text-sm text-gray-400 mt-1 italic">效果：{thought.effect}</p>
                        </div>
                    ))}
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg text-cyan-300 font-semibold mb-2">可用的思想</h3>
                <div className="space-y-2">
                    {available.map(thought => (
                        <div key={thought.id} className="bg-gray-700/50 p-3 rounded-lg flex justify-between items-center">
                            <div>
                               <p className="font-bold text-white">{thought.name}</p>
                               <p className="text-xs text-gray-400 mt-1">{thought.description}</p>
                            </div>
                            <button onClick={() => equipThought(thought.id)} className="bg-cyan-500 text-white px-3 py-1 rounded-md hover:bg-cyan-400 transition-colors text-sm">裝備</button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});


// 5. 因果劇場 (KarmicTheater) - v8 多元時事
const KarmicTheater = () => {
    const { apiKey, applyEffects, playerState, addNewThought } = usePlayerState();
    const [scenario, setScenario] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newThoughtFeedback, setNewThoughtFeedback] = useState(null);
    const [recentThemes, setRecentThemes] = useState([]);

    const fetchNewScenario = useCallback(async () => {
        if(!playerState) return;

        setLoading(true);
        setError(null);
        setScenario(null);
        setFeedback(null);
        setNewThoughtFeedback(null);

        const themes = [
            { name: '微觀個人', detail: '關於個人習慣、內心掙扎、或一個無人知曉的選擇' },
            { name: '人際關係', detail: '關於家庭、朋友、或愛情中的互動與矛盾' },
            { name: '職場倫理', detail: '關於工作場合的公平、誠信與利益衝突' },
            { name: '社會參與', detail: '關於社區議題、公共政策或對弱勢群體的態度' },
            { name: '科技倫理', detail: '關於人工智慧、社交媒體、或新科技帶來的道德挑戰' },
            { name: '環境永續', detail: '關於個人消費選擇對環境的影響或對氣候變遷的看法' },
            { name: '全球時事', detail: '關於國際衝突、經濟不平等或全球性危機的抽象思辨' },
        ];
        
        let availableThemes = themes.filter(t => !recentThemes.includes(t.name));
        if (availableThemes.length === 0) {
            availableThemes = themes;
            setRecentThemes([]);
        }

        const selectedTheme = availableThemes[Math.floor(Math.random() * availableThemes.length)];
        
        setRecentThemes(prev => {
            const updated = [...prev, selectedTheme.name];
            if (updated.length > 3) return updated.slice(1);
            return updated;
        });

        const prompt = `你是一位充滿佛學智慧的遊戲設計師。請為一款名為《未書之經》的深度哲學遊戲，創造一個道德兩難情境。

        核心主題：**${selectedTheme.name}**
        具體方向：**${selectedTheme.detail}**

        請基於此主題，設計一個中性且具現實感的情境，可結合當代時事，避免過於戲劇化或善惡分明。提供3到4個反映不同心態的玩家選項。為每個選項，分析其動機，並評估其對佛教「三毒」（貪、瞋、癡）及「五蘊」的影響（數值在-15到+15之間）。

        請務必嚴格遵循以下的JSON格式輸出，不得包含任何額外文字。

        玩家當前狀態（供參考）：貪：${playerState.karma.greed}, 瞋：${playerState.karma.hatred}, 癡：${playerState.karma.delusion}, 階位：${playerState.bodhisattvaPath.stage}。`;
        
        const schema = {
            type: "OBJECT",
            properties: {
                scenario: { type: "STRING" },
                choices: {
                    type: "ARRAY",
                    items: {
                        type: "OBJECT",
                        properties: {
                            text: { type: "STRING" },
                            analysis: { type: "STRING" },
                            effects: {
                                type: "OBJECT",
                                properties: {
                                    karma: {
                                        type: "OBJECT",
                                        properties: {
                                            greed: { type: "NUMBER" },
                                            hatred: { type: "NUMBER" },
                                            delusion: { type: "NUMBER" },
                                        },
                                    },
                                    skandhas: {
                                        type: "OBJECT",
                                        properties: {
                                            rupa: { type: "NUMBER" },
                                            vedana: { type: "NUMBER" },
                                            samjna: { type: "NUMBER" },
                                            samskara: { type: "NUMBER" },
                                        },
                                    },
                                },
                            },
                        },
                        required: ["text", "analysis", "effects"],
                    },
                },
            },
            required: ["scenario", "choices"],
        };

        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { 
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema
                }
            };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) throw new Error(`API 請求失敗，狀態碼：${response.status}`);
            const result = await response.json();
            
            if (result.candidates && result.candidates.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                try {
                    setScenario(JSON.parse(jsonText));
                } catch(e) {
                    console.error("解析AI回應的JSON失敗:", e, "原始文字:", jsonText);
                    throw new Error("AI 回應格式錯誤。");
                }
            } else { throw new Error("從API收到的回應無效。"); }
        } catch (err) {
            console.error(err);
            setError("無法生成新的因緣，請稍後再試。可能是 API 金鑰有誤或模型暫時無法回應。");
        } finally {
            setLoading(false);
        }
    }, [playerState, recentThemes, apiKey]);

    const generateNewThought = useCallback(async (context) => {
        if (!apiKey) return;
        const prompt = `基於以下情境和玩家的選擇，生成一個新的「思想」。這個思想應該是一個哲學概念、世界觀或偏見。請提供思想的名稱、描述（它是如何形成的）和一個遊戲內效果。嚴格遵循JSON格式輸出，無額外文字。情境：${context.scenario} 選擇：${context.choiceText}`;
        
        const schema = {
            type: "OBJECT",
            properties: {
                name: { type: "STRING" },
                description: { type: "STRING" },
                effect: { type: "STRING" },
                conflictsWith: { type: "ARRAY", items: { type: "NUMBER" } },
            },
            required: ["name", "description", "effect"],
        };

        try {
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { 
                contents: [{ role: "user", parts: [{ text: prompt }] }],
                generationConfig: {
                    responseMimeType: "application/json",
                    responseSchema: schema
                }
            };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            if (!response.ok) return;
            const result = await response.json();
            if (result.candidates && result.candidates.length > 0) {
                const jsonText = result.candidates[0].content.parts[0].text;
                 try {
                    const newThought = JSON.parse(jsonText);
                    addNewThought(newThought);
                    setNewThoughtFeedback(`一個新的思想已在你心中萌芽：「${newThought.name}」`);
                } catch(e) {
                    console.error("解析AI回應的JSON失敗:", e, "原始文字:", jsonText);
                }
            }
        } catch (err) { console.error("生成思想失敗:", err); }
    }, [addNewThought, apiKey]);

    const handleChoice = (choice) => {
        applyEffects(choice.effects);
        const karmaFeedback = Object.entries(choice.effects.karma || {}).map(([key, value]) => `${{greed: '貪', hatred: '瞋', delusion: '癡'}[key]} ${value > 0 ? '+' : ''}${value}`).join(', ');
        setFeedback({ analysis: choice.analysis, karma: karmaFeedback, });

        if (Math.random() < 0.33) {
            generateNewThought({ scenario: scenario.scenario, choiceText: choice.text });
        }
    };

    const proceed = () => {
        setScenario(null);
        setFeedback(null);
        setNewThoughtFeedback(null);
    };

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700 flex flex-col justify-between min-h-[400px]">
            <div className="flex-grow flex flex-col">
                <h2 className="text-2xl font-light text-teal-200 mb-4">因果劇場</h2>
                
                <div className="flex-grow flex items-center justify-center">
                    {!scenario && !loading && !feedback && (
                        <div className="text-center flex flex-col items-center justify-center h-full">
                            <p className="text-gray-400 mb-4">諸法因緣生，諸法因緣滅。</p>
                            <button onClick={fetchNewScenario} className="bg-teal-500/80 text-white px-6 py-3 rounded-lg hover:bg-teal-400/90 transition-colors flex items-center justify-center text-lg shadow-lg disabled:opacity-50 disabled:cursor-not-allowed" disabled={!apiKey || !playerState}>
                                <SparklesIcon className="mr-2" /> 尋求新的因緣
                            </button>
                            {!apiKey && <p className="text-xs text-yellow-400 mt-2">請先設定您的 API 金鑰</p>}
                        </div>
                    )}

                    {loading && <LoadingAnimation />}
                    {error && <div className="text-center p-8 text-red-400">{error}</div>}

                    {scenario && !feedback && (
                        <div className="w-full">
                            <p className="text-gray-300 mb-4 ">{scenario.scenario}</p>
                            <div className="space-y-3">
                                {Array.isArray(scenario.choices) && scenario.choices.map((choice, index) => (
                                    <button key={index} onClick={() => handleChoice(choice)} className="w-full text-left bg-gray-700/60 text-white p-3 rounded-lg hover:bg-cyan-600/70 transition-colors">
                                        {choice.text}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {feedback && (
                         <div className="w-full p-4 bg-black/60 rounded-lg text-left flex flex-col h-full">
                            <div className="flex-grow">
                                <h3 className="font-semibold text-cyan-300">行為分析：</h3>
                                <p className="text-gray-300 text-sm mb-3 italic">"{feedback.analysis}"</p>
                                <h3 className="font-semibold text-yellow-300">業力變化：</h3>
                                <p className="text-yellow-400 text-sm mb-3">{feedback.karma || "無顯著業力變化。"}</p>

                                {newThoughtFeedback && <p className="text-teal-300 text-sm animate-pulse">{newThoughtFeedback}</p>}
                            </div>
                            <button onClick={proceed} className="mt-4 w-full bg-gray-600/80 text-white px-4 py-2 rounded-lg hover:bg-gray-500/90 transition-colors flex items-center justify-center text-base">
                                繼續旅程 <ArrowRightIcon className="ml-2 h-4 w-4"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// --- 背景音樂播放器 ---
const BackgroundMusicPlayer = () => {
    const [isMuted, setIsMuted] = useState(true);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const scriptId = 'tone-js-script';
        if (document.getElementById(scriptId)) {
            if (window.Tone) setIsInitialized(true);
            return;
        };

        const script = document.createElement('script');
        script.id = scriptId;
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/tone/14.7.77/Tone.js";
        script.async = true;
        script.onload = () => setIsInitialized(true);
        document.body.appendChild(script);

    }, []);

    useEffect(() => {
        if (!isInitialized || typeof window.Tone === 'undefined') return;

        const synth = new window.Tone.PolySynth(window.Tone.Synth, {
            oscillator: { type: 'sine' },
            envelope: { attack: 0.1, decay: 0.5, sustain: 0.2, release: 2 },
        }).toDestination();
        
        const reverb = new window.Tone.Reverb({ decay: 10, wet: 0.4 }).toDestination();
        synth.connect(reverb);

        const scale = ['C4', 'E4', 'G4', 'A4', 'C5', 'E5', 'G5'];
        
        const loop = new window.Tone.Sequence((time, note) => {
            synth.triggerAttackRelease(note, '2n', time);
        }, scale, '2n').start(0);
        
        loop.probability = 0.6;
        window.Tone.Transport.bpm.value = 40;

        return () => {
            if (window.Tone) {
                window.Tone.Transport.stop();
                window.Tone.Transport.cancel();
                synth.dispose();
                reverb.dispose();
                loop.dispose();
            }
        };
    }, [isInitialized]);

    const toggleMute = async () => {
        if (!isInitialized || typeof window.Tone === 'undefined') return;

        if (window.Tone.context.state !== 'running') {
            await window.Tone.start();
        }

        const shouldBeMuted = !isMuted;
        window.Tone.Destination.mute = shouldBeMuted;
        if (!shouldBeMuted) {
            window.Tone.Transport.start();
        }
        setIsMuted(shouldBeMuted);
    };

    return (
        <button 
            onClick={toggleMute} 
            className="fixed bottom-4 right-16 bg-gray-800/70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors backdrop-blur-sm z-50"
            aria-label={isMuted ? "開啟音樂" : "關閉音樂"}
        >
            {isMuted ? <VolumeXIcon /> : <Volume2Icon />}
        </button>
    );
};

// --- 輪迴轉生元件 ---
const ReincarnationManager = () => {
    const { reincarnate, setPlayerState, apiKey } = usePlayerState();
    const [confirmationVisible, setConfirmationVisible] = useState(false);
    const [rebirthInfo, setRebirthInfo] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleReincarnateClick = () => {
        setConfirmationVisible(true);
    };

    const confirmReincarnation = async () => {
        setConfirmationVisible(false);
        setLoading(true);

        const newInitialState = reincarnate();

        const prompt = `你是一位充滿佛學智慧的遊戲敘事設計師。玩家即將開始一段新的人生旅程，請根據其新的初始狀態，為他撰寫一段簡短（約2-3句話）而富有詩意的「轉生開示」。這段話要能反映出他的先天條件與潛在挑戰。

        新的人生初始狀態如下：
        - 貪：${newInitialState.karma.greed} (數值越低，越不容易起貪念)
        - 瞋：${newInitialState.karma.hatred} (數值越低，越不容易起瞋恨)
        - 癡：${newInitialState.karma.delusion} (數值越低，越有智慧，不易愚癡)
        - 色（身體）：${newInitialState.skandhas.rupa} (數值越高，身體越強健)
        - 受（感受）：${newInitialState.skandhas.vedana} (數值越高，感受越敏銳，也越容易受情緒影響)
        - 想（認知）：${newInitialState.skandhas.samjna} (數值越高，學習與認知能力越強)
        
        請直接輸出開示的文字，不要有任何額外的標籤或解釋。`;

        try {
            if (!apiKey) throw new Error("API 金鑰未設定");
            const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
            const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
            const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
            const result = await response.json();
            
            let rebirthMessage = "此生已盡，業風吹送到新的旅程。願你保持覺照，善用此身。";
            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
                rebirthMessage = result.candidates[0].content.parts[0].text;
            }

            setRebirthInfo({ state: newInitialState, message: rebirthMessage });

        } catch (error) {
            console.error("生成轉生開示失敗:", error);
            setRebirthInfo({ state: newInitialState, message: "因緣變幻莫測，你的新旅程已在未知中展開。" });
        } finally {
            setLoading(false);
        }
    };

    const startNewLife = () => {
        setPlayerState(rebirthInfo.state);
        setRebirthInfo(null);
    };

    return (
        <>
            <div className="text-center mt-8">
                <button 
                    onClick={handleReincarnateClick}
                    className="text-gray-400 hover:text-teal-300 transition-colors flex items-center justify-center mx-auto text-sm"
                >
                    <RefreshCwIcon className="mr-2 h-4 w-4"/> 重啟人生
                </button>
            </div>

            {confirmationVisible && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm text-center border border-teal-500/20">
                        <h3 className="text-2xl font-light text-teal-200 mb-4">確認輪迴？</h3>
                        <p className="text-gray-300 mb-6">此生的所有行爲與思想，都將成為下一段旅程的因。你準備好了嗎？</p>
                        <div className="flex justify-center gap-4">
                            <button onClick={() => setConfirmationVisible(false)} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">再思量</button>
                            <button onClick={confirmReincarnation} className="px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors">墮入輪迴</button>
                        </div>
                    </div>
                </div>
            )}

            {(loading || rebirthInfo) && (
                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                    <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md text-center border border-teal-500/30">
                        {loading ? (
                            <LoadingAnimation />
                        ) : (
                            <>
                                <h3 className="text-2xl font-light text-teal-200 mb-4">轉生開示</h3>
                                <p className="text-gray-300 mb-8 whitespace-pre-wrap leading-relaxed">{rebirthInfo.message}</p>
                                <button onClick={startNewLife} className="w-full px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors flex items-center justify-center text-lg">
                                    開始新的旅程 <ArrowRightIcon className="ml-2"/>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

// --- API 金鑰管理員 ---
const ApiKeyManager = () => {
    const { apiKey, setApiKey, setPlayerState, setShowWelcomeModal } = usePlayerState();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [inputKey, setInputKey] = useState("");

    useEffect(() => {
        if (!apiKey) {
            const timer = setTimeout(() => setIsModalOpen(true), 1500); // 延遲彈出
            return () => clearTimeout(timer);
        }
    }, [apiKey]);

    const handleSaveKey = () => {
        const trimmedKey = inputKey.trim();
        if (trimmedKey) {
            localStorage.setItem('gemini_api_key', trimmedKey);
            setApiKey(trimmedKey);
            
            const savedState = localStorage.getItem(`sutra_save_${trimmedKey}`);
            if (savedState) {
                try {
                    const parsedState = JSON.parse(savedState);
                    parsedState.loginCount = (parsedState.loginCount || 1); // 讀取時不增加
                    setPlayerState(parsedState);
                } catch (e) {
                    setPlayerState(getInitialPlayerState());
                }
            } else {
                setPlayerState(getInitialPlayerState());
            }
            
            setShowWelcomeModal(true);
            setIsModalOpen(false);
        }
    };

    const handleClearKey = () => {
        const currentKey = localStorage.getItem('gemini_api_key');
        if(currentKey) {
            localStorage.removeItem(`sutra_save_${currentKey}`);
        }
        localStorage.removeItem('gemini_api_key');
        setApiKey(null);
        setInputKey("");
        setPlayerState(getInitialPlayerState());
        setIsModalOpen(true);
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="fixed bottom-4 right-4 bg-gray-800/70 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors backdrop-blur-sm z-50"
                aria-label="設定 API 金鑰"
            >
                <KeyRoundIcon />
            </button>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                    <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center border border-teal-500/20">
                        <h3 className="text-2xl font-light text-teal-200 mb-4">設定您的 API 金鑰</h3>
                        <p className="text-gray-400 mb-4 text-sm">
                            此應用程式需要 Google Gemini API 金鑰才能運作。您的金鑰將僅儲存在您的瀏覽器中，不會被分享。
                        </p>
                        <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline mb-6 block">
                            點此免費取得您的 Google Gemini API 金鑰
                        </a>
                        <input
                            type="password"
                            value={inputKey}
                            onChange={(e) => setInputKey(e.target.value)}
                            placeholder="在此貼上您的 API 金鑰"
                            className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                        />
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={handleSaveKey} className="px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors flex-1">儲存金鑰</button>
                            {apiKey && <button onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors flex-1">關閉</button>}
                        </div>
                         {apiKey && <button onClick={handleClearKey} className="text-xs text-gray-500 hover:text-gray-400 mt-4">清除已儲存的金鑰</button>}
                    </div>
                </div>
            )}
        </>
    );
};

// **歡迎訊息元件**
const WelcomeModal = () => {
    const { playerState, showWelcomeModal, setShowWelcomeModal, apiKey } = usePlayerState();
    
    if (!showWelcomeModal || !playerState || !apiKey) return null;

    const isNewUser = playerState.loginCount <= 1;

    return (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-lg w-full text-left border border-teal-500/20 mx-4">
                {isNewUser ? (
                    <>
                        <h3 className="text-2xl font-light text-teal-200 mb-4">初次見面，旅人</h3>
                        <div className="text-gray-300 space-y-3">
                            <p>歡迎來到《未書之經》，這是一場關於內在探索的互動冥想。這裡沒有對錯，沒有勝負，只有您與您內心的對話。</p>
                            <p>在「因果劇場」中，您將面臨由 AI 生成的無數情境。請不必揣測系統的偏好，只需**全然地遵從您的本心**，做出最真實的選擇。您的每個起心動念，都將編織出獨一無二的心靈曼陀羅。</p>
                            <p className="text-sm text-gray-400 border-t border-gray-700 pt-3 mt-4">
                                **金鑰安全須知**：您提供的 API 金鑰將僅儲存在您本機的瀏覽器中，我們絕不會上傳或紀錄它。這是您的個人旅程，您的憑證將完全由您自己保管。
                            </p>
                        </div>
                    </>
                ) : (
                    <>
                        <h3 className="text-2xl font-light text-teal-200 mb-4">歡迎回來，旅人</h3>
                        <div className="text-gray-300 space-y-3">
                            <p>這是您第 <span className="font-bold text-teal-300">{playerState.loginCount}</span> 次回到這裡，繼續書寫您這部未完的經文。</p>
                            <p>願您依然記得，這趟旅程的唯一準則，便是**全然地遵從您的本心**。放下所有預設，讓每一次選擇都成為一次清澈的觀照。</p>
                        </div>
                    </>
                )}
                <div className="mt-6 text-right">
                    <button onClick={() => setShowWelcomeModal(false)} className="px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors">繼續旅程</button>
                </div>
            </div>
        </div>
    );
};


// --- 主應用程式 ---
export default function App() {
    return (
        <PlayerStateProvider>
            <AppContent />
        </PlayerStateProvider>
    );
}

// 將主要內容分離，以便 context 能正常運作
function AppContent() {
    const { playerState } = usePlayerState();

    if (!playerState) {
        return (
            <div className="bg-gray-900 text-white min-h-screen flex items-center justify-center">
                <LoadingAnimation />
            </div>
        );
    }
    
    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans bg-cover bg-fixed" style={{backgroundImage: 'url(https://placehold.co/1920x1080/0a101f/1e293b.png?text=.)'}}>
            <WelcomeModal />
            <div className="p-4 sm:p-8 backdrop-blur-md bg-black/30 min-h-screen">
                <header className="text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extralight text-teal-200 tracking-wider">未書之經</h1>
                    <p className="text-cyan-300/80 mt-2">互動式遊戲設計原型 v15 (部署最終版)</p>
                </header>
                <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                    <div className="lg:col-span-2 space-y-6">
                        <BodhisattvaPath />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <KarmaDashboard />
                            <ThoughtCabinet />
                        </div>
                    </div>
                    <div className="lg:col-span-1 flex flex-col space-y-6">
                        <MandalaUI />
                        <KarmicTheater />
                    </div>
                </main>
                <footer className="text-center mt-12 text-gray-500 text-sm">
                    <p>此原型基於《未書之經：一場穿越業與空的遊戲設計框架》文件實現。</p>
                    <p>「因果劇場」與「思想櫥櫃」由生成式AI驅動，每次體驗皆不相同。</p>
                    <ReincarnationManager />
                </footer>
            </div>
            <BackgroundMusicPlayer />
            <ApiKeyManager />
        </div>
    );
}
