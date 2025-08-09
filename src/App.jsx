import React, { useState, createContext, useContext, useMemo, useCallback, useEffect } from 'react';

// --- 模擬圖示 (使用 SVG) ---
const BrainIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-brain-circuit"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 0 0 9 22a4 4 0 0 0 5-5.172" /><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 0 1 15 22a4 4 0 0 1-5-5-1.72" /><path d="M12 5a3 3 0 0 0-3 3" /><path d="M12 5a3 3 0 0 1 3 3" /><path d="M12 8v4" /><path d="M12 17v-1" /><path d="m15 13-3 1-3-1" /><path d="M9 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M15 9a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M6.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /><path d="M18.5 12.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z" /><path d="M9 15a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /><path d="M15 15a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1Z" /></svg>
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
const Edit2Icon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-edit-2"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>;


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

const BODHISATTVA_PATH_CONFIG = [
    { name: '十信位', focus: '建立信心與正見', subStages: ['信心', '念心', '精進心', '慧心', '定心', '不退心', '護法心', '迴向心', '戒心', '願心'], progressPerAction: 15 },
    { name: '十住位', focus: '安住於菩提心', subStages: ['發心住', '治地住', '修行住', '生貴住', '方便具足住', '正心住', '不退住', '童真住', '法王子住', '灌頂住'], progressPerAction: 10 },
    { name: '十行位', focus: '廣行利他', subStages: ['歡喜行', '饒益行', '無瞋行', '無盡行', '離癡亂行', '善現行', '無著行', '尊重行', '善法行', '真實行'], progressPerAction: 8 },
    { name: '十迴向位', focus: '功德迴向眾生', subStages: ['救護眾生離眾生相迴向', '不壞迴向', '等一切佛迴向', '至一切處迴向', '無盡功德藏迴向', '隨順平等善根迴向', '隨順等觀一切眾生迴向', '真如相迴向', '無縛無著解脫迴向', '入法界無量迴向'], progressPerAction: 5 },
    { name: '十地位', focus: '圓滿智慧功德', subStages: ['歡喜地', '離垢地', '發光地', '焰慧地', '極難勝地', '現前地', '遠行地', '不動地', '善慧地', '法雲地'], progressPerAction: 3 },
    { name: '等覺', focus: '等同佛之覺悟', subStages: ['等覺菩薩'], progressPerAction: 1 },
    { name: '妙覺', focus: '究竟圓滿成佛', subStages: ['妙覺菩薩'], progressPerAction: 0 },
];
const STAGES = BODHISATTVA_PATH_CONFIG.map(p => p.name);

const getInitialPlayerState = () => ({
    playerName: null,
    skandhas: { rupa: 70, vedana: 50, samjna: 50, samskara: 40, vijnana: 50 },
    karma: { greed: 50, hatred: 40, delusion: 60 },
    bodhisattvaPath: {
        stageIndex: 0,
        subStageIndex: 0,
        progress: 0,
    },
    thoughts: {
        equipped: [],
        available: [],
        synthesized: []
    },
    loginCount: 1,
    endGame: null,
});

const PlayerStateProvider = ({ children }) => {
    const [playerState, setPlayerState] = useState(null);
    const [apiKey, setApiKey] = useState(null);
    const [showWelcomeModal, setShowWelcomeModal] = useState(false);
    const [showProgressionModal, setShowProgressionModal] = useState(null);

    useEffect(() => {
        const storedKey = localStorage.getItem('gemini_api_key');
        if (storedKey) {
            setApiKey(storedKey);
            const savedStateJSON = localStorage.getItem(`sutra_save_${storedKey}`);
            if (savedStateJSON) {
                try {
                    const savedState = JSON.parse(savedStateJSON);
                    const initialState = getInitialPlayerState();
                    // **核心修正：合併舊存檔與新結構，確保所有屬性存在**
                    const mergedState = {
                        ...initialState,
                        ...savedState,
                        skandhas: { ...initialState.skandhas, ...savedState.skandhas },
                        karma: { ...initialState.karma, ...savedState.karma },
                        bodhisattvaPath: { ...initialState.bodhisattvaPath, ...savedState.bodhisattvaPath },
                        thoughts: { ...initialState.thoughts, ...savedState.thoughts },
                    };
                    mergedState.loginCount = (savedState.loginCount || 1) + 1;
                    setPlayerState(mergedState);
                    if (mergedState.playerName) {
                        setShowWelcomeModal(true);
                    }
                } catch (e) {
                    console.error("解析存檔失敗:", e);
                    setPlayerState(getInitialPlayerState());
                }
            } else {
                setPlayerState(getInitialPlayerState());
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

    const setPlayerName = useCallback((name) => {
        setPlayerState(prev => ({ ...prev, playerName: name }));
    }, []);

    const checkBodhisattvaProgression = useCallback(() => {
        setPlayerState(prev => {
            const { karma, bodhisattvaPath } = prev;
            const newState = { ...prev };
            const { stageIndex, subStageIndex } = bodhisattvaPath;
            const stageConfig = BODHISATTVA_PATH_CONFIG[stageIndex];
            
            let didRegress = false;
            if (stageIndex > 0) {
                const avgPoison = (karma.greed + karma.hatred + karma.delusion) / 3;
                if (avgPoison > 75) {
                    didRegress = true;
                    if (subStageIndex > 0) {
                        newState.bodhisattvaPath.subStageIndex -= 1;
                        newState.bodhisattvaPath.progress = 50;
                    } else {
                        newState.bodhisattvaPath.stageIndex -= 1;
                        const prevStageConfig = BODHISATTVA_PATH_CONFIG[stageIndex - 1];
                        newState.bodhisattvaPath.subStageIndex = prevStageConfig.subStages.length - 1;
                        newState.bodhisattvaPath.progress = 50;
                    }
                    setShowProgressionModal({ from: `${stageConfig.name} - ${stageConfig.subStages[subStageIndex]}`, to: `${BODHISATTVA_PATH_CONFIG[newState.bodhisattvaPath.stageIndex].name} - ${BODHISATTVA_PATH_CONFIG[newState.bodhisattvaPath.stageIndex].subStages[newState.bodhisattvaPath.subStageIndex]}`, type: 'regression' });
                }
            }

            if (!didRegress && bodhisattvaPath.progress >= 100) {
                if (subStageIndex < stageConfig.subStages.length - 1) {
                    newState.bodhisattvaPath.subStageIndex += 1;
                    newState.bodhisattvaPath.progress = 0;
                } else if (stageIndex < STAGES.length - 1) {
                    newState.bodhisattvaPath.stageIndex += 1;
                    newState.bodhisattvaPath.subStageIndex = 0;
                    newState.bodhisattvaPath.progress = 0;
                }
                
                const newStageIndex = newState.bodhisattvaPath.stageIndex;
                const newSubStageIndex = newState.bodhisattvaPath.subStageIndex;

                if(newStageIndex === STAGES.length - 1) {
                    newState.endGame = 'pending';
                } else {
                    setShowProgressionModal({ from: `${stageConfig.name} - ${stageConfig.subStages[subStageIndex]}`, to: `${BODHISATTVA_PATH_CONFIG[newStageIndex].name} - ${BODHISATTVA_PATH_CONFIG[newStageIndex].subStages[newSubStageIndex]}`, type: 'promotion' });
                }
            }
            
            return newState;
        });
    }, []);

    const applyEffects = useCallback((effects) => {
        if (!effects) return;
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const { bodhisattvaPath } = newState;
            const stageConfig = BODHISATTVA_PATH_CONFIG[bodhisattvaPath.stageIndex];
            let progressPoints = 0;

            if (effects.karma) {
                const greedChange = effects.karma.greed || 0;
                const hatredChange = effects.karma.hatred || 0;
                const delusionChange = effects.karma.delusion || 0;

                switch(bodhisattvaPath.stageIndex) {
                    case 0: if (delusionChange < 0) progressPoints += Math.abs(delusionChange); break;
                    case 2: if (hatredChange < 0) progressPoints += Math.abs(hatredChange) * 1.5; break;
                    case 3: if (greedChange < 0) progressPoints += Math.abs(greedChange) * 1.5; break;
                    default:
                        if (greedChange < 0) progressPoints += Math.abs(greedChange) * 0.5;
                        if (hatredChange < 0) progressPoints += Math.abs(hatredChange) * 0.5;
                        if (delusionChange < 0) progressPoints += Math.abs(delusionChange) * 0.5;
                        break;
                }
                
                for (const [key, value] of Object.entries(effects.karma)) {
                    if (newState.karma[key] !== undefined) newState.karma[key] = Math.max(0, Math.min(100, newState.karma[key] + value));
                }
            }
            
            newState.bodhisattvaPath.progress = Math.min(100, bodhisattvaPath.progress + progressPoints * (stageConfig.progressPerAction / 10));

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
        checkBodhisattvaProgression();
    }, [checkBodhisattvaProgression]);
    
    const reincarnate = useCallback((newGamePlus = false) => {
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
        
        let newThoughts = { equipped: [], available: [], synthesized: [] };
        if (newGamePlus) {
            newThoughts.equipped.push({ id: 999, name: '菩薩歸來', internalizing: false, progress: 100, effect: '所有善行的業力淨化效果微幅提升。', description: '您已圓滿覺悟，但選擇重返世間，行菩薩道。' });
        }

        const newInitialState = {
            ...getInitialPlayerState(),
            playerName: null,
            skandhas: { rupa: Math.round(newSkandhas.rupa), vedana: Math.round(newSkandhas.vedana), samjna: Math.round(newSkandhas.samjna), samskara: Math.round(newSkandhas.samskara), vijnana: Math.round(newSkandhas.vijnana) },
            karma: { greed: Math.round(newKarma.greed), hatred: Math.round(newKarma.hatred), delusion: Math.round(newKarma.delusion) },
            thoughts: newThoughts,
        };
        return newInitialState;
    }, [playerState]);

    const value = useMemo(() => ({ playerState, setPlayerState, apiKey, setApiKey, applyEffects, equipThought, addNewThought, synthesizeThoughts, reincarnate, showWelcomeModal, setShowWelcomeModal, setPlayerName, checkBodhisattvaProgression, showProgressionModal, setShowProgressionModal }), [playerState, setPlayerState, apiKey, setApiKey, applyEffects, equipThought, addNewThought, synthesizeThoughts, reincarnate, showWelcomeModal, setShowWelcomeModal, setPlayerName, checkBodhisattvaProgression, showProgressionModal, setShowProgressionModal]);

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
    const { stageIndex, subStageIndex, progress } = playerState.bodhisattvaPath;
    const stage = BODHISATTVA_PATH_CONFIG[stageIndex];
    const subStage = stage.subStages[subStageIndex];
    
    // 計算總體進度
    const totalSubStages = BODHISATTVA_PATH_CONFIG.reduce((acc, s) => acc + s.subStages.length, 0);
    let completedSubStages = 0;
    for(let i = 0; i < stageIndex; i++) {
        completedSubStages += BODHISATTVA_PATH_CONFIG[i].subStages.length;
    }
    completedSubStages += subStageIndex;
    const overallProgress = ((completedSubStages + (progress / 100)) / totalSubStages) * 100;

    return (
        <div className="bg-gray-800/50 p-6 rounded-2xl shadow-lg backdrop-blur-sm border border-gray-700">
            <h2 className="text-2xl font-light text-teal-200 mb-4">菩薩道階位</h2>
            <div className="relative">
                <div className="flex justify-between items-center text-xs text-gray-400 mb-1">
                    <span>凡夫位</span>
                    <span>聖位</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5 mb-2">
                    <div className="bg-gradient-to-r from-teal-400 to-cyan-400 h-2.5 rounded-full" style={{ width: `${overallProgress}%`, transition: 'width 0.5s' }}></div>
                </div>
                
                <div className="text-center mt-4">
                    <p className="text-lg text-white">
                        當前境界：<span className="font-bold text-teal-300">{stage.name} - {subStage}</span>
                    </p>
                    <p className="text-xs text-gray-400 mt-1">{stage.focus}</p>
                </div>
                 <div className="w-full bg-gray-600 rounded-full h-2.5 mt-2">
                    <div className="bg-cyan-500 h-2.5 rounded-full" style={{ width: `${progress}%`, transition: 'width 0.5s' }}></div>
                </div>
            </div>
        </div>
    );
});

// --- 思想櫥櫃 (v4) ---
const ThoughtCabinet = React.memo(() => {
    const { playerState, setPlayerState, equipThought, synthesizeThoughts, checkBodhisattvaProgression } = usePlayerState();
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

    const handleInternalize = (thoughtId) => {
        setPlayerState(prev => {
            const newState = JSON.parse(JSON.stringify(prev));
            const thought = newState.thoughts.equipped.find(t => t.id === thoughtId);
            if (thought) {
                thought.internalizing = false;
                thought.progress = 100;
            }
            return newState;
        });
        checkBodhisattvaProgression();
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
                                {thought.internalizing ? (
                                    <button onClick={() => handleInternalize(thought.id)} className="text-xs px-2 py-1 rounded-full bg-yellow-500 hover:bg-yellow-400 text-black">完成內化</button>
                                ) : (
                                    <span className="text-xs px-2 py-1 rounded-full bg-green-500 text-black">已完成</span>
                                )}
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


// 5. 因果劇場 (KarmicTheater) - v17 廣闊因緣
const KarmicTheater = () => {
    const { apiKey, applyEffects, playerState, addNewThought, checkBodhisattvaProgression } = usePlayerState();
    const [scenario, setScenario] = useState(null);
    const [feedback, setFeedback] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [newThoughtFeedback, setNewThoughtFeedback] = useState(null);
    const [recentThemes, setRecentThemes] = useState([]);

    const karmaThemes = {
        "個人層面": ["身體健康", "心理健康", "生活條件"],
        "情感與人際關係": ["家庭關係", "愛情關係", "朋友與社交"],
        "教育與成長": ["學業壓力", "未來方向", "學校霸凌"],
        "工作與經濟": ["失業裁員", "職場壓力", "收入與債務"],
        "法律與安全": ["犯罪受害", "法律糾紛", "網路詐騙"],
        "社會與文化": ["社會階級", "歧視與偏見", "假新聞"],
        "國家層面": ["經濟衰退", "政治腐敗", "社會動盪"],
        "全球層面": ["戰爭衝突", "氣候變遷", "大流行疾病", "AI倫理"],
    };

    const fetchNewScenario = useCallback(async () => {
        if(!playerState || !apiKey) {
            setError("請先設定您的 API 金鑰。");
            return;
        }

        setLoading(true);
        setError(null);
        setScenario(null);
        setFeedback(null);
        setNewThoughtFeedback(null);

        const mainThemes = Object.keys(karmaThemes);
        let availableMainThemes = mainThemes.filter(t => !recentThemes.includes(t));
        if (availableMainThemes.length === 0) {
            availableMainThemes = mainThemes;
            setRecentThemes([]);
        }
        const selectedMainTheme = availableMainThemes[Math.floor(Math.random() * availableMainThemes.length)];
        const subThemes = karmaThemes[selectedMainTheme];
        const selectedSubTheme = subThemes[Math.floor(Math.random() * subThemes.length)];
        
        setRecentThemes(prev => {
            const updated = [...prev, selectedMainTheme];
            if (updated.length > 4) return updated.slice(1);
            return updated;
        });

        const prompt = `你是一位充滿佛學智慧的遊戲設計師。請為一款名為《未書之經》的深度哲學遊戲，創造一個道德兩難情境。

        核心主題：**${selectedMainTheme} - ${selectedSubTheme}**

        請基於此精準主題，設計一個中性且具現實感的情境，可結合當代時事，避免過於戲劇化或善惡分明。提供3到4個反映不同心態的玩家選項。為每個選項，分析其動機，並評估其對佛教「三毒」（貪、瞋、癡）及「五蘊」的影響（數值在-15到+15之間）。

        **重要**：如果情境適合，請在提問中自然地融入玩家的名字「${playerState.playerName || '旅人'}」。

        請務必嚴格遵循以下的JSON格式輸出，不得包含任何額外文字。

        玩家當前狀態（供參考）：貪：${playerState.karma.greed}, 瞋：${playerState.karma.hatred}, 癡：${playerState.karma.delusion}, 階位：${BODHISATTVA_PATH_CONFIG[playerState.bodhisattvaPath.stageIndex].name}。`;
        
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
        checkBodhisattvaProgression();
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
                    parsedState.loginCount = (parsedState.loginCount || 1); 
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

// **新增：玩家命名元件**
const NameManager = () => {
    const { playerState, setPlayerName, setShowWelcomeModal } = usePlayerState();
    const [name, setName] = useState("");
    const [isEditing, setIsEditing] = useState(false);

    const handleSave = () => {
        if (name.trim()) {
            setPlayerName(name.trim());
            setIsEditing(false);
            if (playerState.loginCount <= 1) { // 如果是新玩家，設定名字後顯示歡迎
                setShowWelcomeModal(true);
            }
        }
    };

    if (playerState && !playerState.playerName && !isEditing) {
        return (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-teal-500/20 mx-4">
                    <h3 className="text-2xl font-light text-teal-200 mb-4">請為您的旅程命名</h3>
                    <p className="text-gray-400 mb-6 text-sm">
                        這個名字將伴隨您行走於此世，AI 或許會以此稱呼您。
                    </p>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="在此輸入您的名字"
                        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                    <button onClick={handleSave} className="w-full px-6 py-3 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors">開始旅程</button>
                </div>
            </div>
        );
    }

    if (isEditing) {
         return (
            <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
                <div className="bg-gray-800 p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center border border-teal-500/20 mx-4">
                    <h3 className="text-2xl font-light text-teal-200 mb-4">更改您的名字</h3>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={playerState.playerName}
                        className="w-full p-3 rounded-lg bg-gray-900 border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 mb-4"
                        onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                    />
                    <div className="flex justify-center gap-4">
                        <button onClick={() => setIsEditing(false)} className="px-6 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 transition-colors">取消</button>
                        <button onClick={handleSave} className="px-6 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 transition-colors">儲存</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <button onClick={() => { setName(playerState.playerName); setIsEditing(true); }} className="ml-2 text-cyan-300/50 hover:text-cyan-300/90 transition-colors">
            <Edit2Icon className="w-4 h-4" />
        </button>
    );
};

// **新增：階位提升祝賀元件**
const ProgressionModal = () => {
    const { showProgressionModal, setShowProgressionModal, apiKey } = usePlayerState();
    const [insight, setInsight] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (showProgressionModal) {
            const fetchInsight = async () => {
                setLoading(true);
                const { from, to, type } = showProgressionModal;
                const prompt = type === 'promotion'
                    ? `你是一位充滿佛學智慧的禪師。一位修行者剛剛在心靈旅程中取得了突破，從「${from}」晉升到了「${to}」。請為他撰寫一段簡短（約2-3句話）而富有啟發性的「智慧開示」，以鼓勵他繼續前行。請直接輸出開示的文字，不要有任何額外的標籤或解釋。`
                    : `你是一位充滿佛學智慧的禪師。一位修行者因為近期的行為，心生煩惱，道心有所退轉，從「${from}」降級到了「${to}」。請為他撰寫一段簡短（約2-3句話）而溫和的「警醒之語」，提醒他觀照內心，但不要過於苛責。請直接輸出開示的文字，不要有任何額外的標籤或解釋。`;
                
                try {
                    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-05-20:generateContent?key=${apiKey}`;
                    const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };
                    const response = await fetch(apiUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                    const result = await response.json();
                    if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts[0].text) {
                        setInsight(result.candidates[0].content.parts[0].text);
                    } else {
                        setInsight(type === 'promotion' ? "每一次的放下，都是一次拾起。你的道路，正變得愈發清晰。" : "一時的迷霧，是為了讓你看清前路。重新安住，再次前行。");
                    }
                } catch (error) {
                    console.error("生成智慧開示失敗:", error);
                    setInsight(type === 'promotion' ? "如實觀照，步履不停，前方的風景將因你的心而顯現。" : "退步原來是向前。觀照此時的煩惱，它亦是修行的資糧。");
                } finally {
                    setLoading(false);
                }
            };
            fetchInsight();
        }
    }, [showProgressionModal, apiKey]);

    if (!showProgressionModal) return null;

    const isPromotion = showProgressionModal.type === 'promotion';

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className={`bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md text-center border ${isPromotion ? 'border-teal-500/30' : 'border-yellow-500/30'} mx-4`}>
                <h3 className={`text-2xl font-light ${isPromotion ? 'text-teal-200' : 'text-yellow-200'} mb-2`}>
                    {isPromotion ? '境界提升' : '道心退轉'}
                </h3>
                <p className="text-gray-400 mb-4">
                    您已從 {showProgressionModal.from} {isPromotion ? '晉升' : '回歸'}至 <span className={`font-bold ${isPromotion ? 'text-teal-300' : 'text-yellow-300'}`}>{showProgressionModal.to}</span>
                </p>
                <div className="bg-black/30 p-4 rounded-lg min-h-[80px] flex items-center justify-center">
                    {loading ? (
                        <div className="text-gray-400 animate-pulse">正在接收智慧開示...</div>
                    ) : (
                        <p className="text-gray-300 italic whitespace-pre-wrap">"{insight}"</p>
                    )}
                </div>
                <button onClick={() => setShowProgressionModal(null)} className={`mt-6 w-full px-6 py-3 rounded-lg ${isPromotion ? 'bg-teal-600 hover:bg-teal-500' : 'bg-yellow-600 hover:bg-yellow-500'} transition-colors`}>
                    {isPromotion ? '繼續前行' : '重新安住'}
                </button>
            </div>
        </div>
    );
};

// **新增：終局抉擇元件**
const EndgameModal = () => {
    const { playerState, setPlayerState, reincarnate } = usePlayerState();

    const handleChoice = (isReturning) => {
        if (isReturning) {
            const newState = reincarnate(true); // 帶有菩薩願力重啟
            setPlayerState(newState);
        } else {
            // 究竟涅槃，徹底重置
            localStorage.removeItem(`sutra_save_${localStorage.getItem('gemini_api_key')}`);
            setPlayerState({ ...getInitialPlayerState(), endGame: 'nirvana' });
        }
    };

    if (!playerState || playerState.endGame !== 'pending') return null;

    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60] backdrop-blur-lg">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-2xl w-full text-center border border-teal-500/30 mx-4">
                <h3 className="text-3xl font-light text-teal-200 mb-4 text-teal-glow">妙覺圓滿</h3>
                <p className="text-gray-300 mb-8">
                    您已行過五十二階位，照見五蘊皆空，度一切苦厄。三毒已息，業力之流澄澈無礙。
                    <br/>
                    此刻，您立於終點，亦是新的起點。請做出您最終的抉擇：
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-xl text-cyan-300 mb-3">究竟涅槃</h4>
                        <p className="text-sm text-gray-400 mb-4">
                            斷盡一切煩惱，不再受生死輪迴之苦，進入不生不滅的永恆寂靜。此世的修行將化為深厚的福德，澤潤未來的因緣。
                        </p>
                        <button onClick={() => handleChoice(false)} className="w-full px-6 py-3 rounded-lg bg-indigo-600 hover:bg-indigo-500 transition-colors">
                            進入寂靜
                        </button>
                    </div>
                    <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-700">
                        <h4 className="text-xl text-yellow-300 mb-3">菩薩歸來</h4>
                        <p className="text-sm text-gray-400 mb-4">
                            雖已圓滿，然觀見眾生仍在苦海，遂發大悲心，乘願再來。您將帶著此世的智慧，重入輪迴，以新的身份，繼續行菩薩道。
                        </p>
                        <button onClick={() => handleChoice(true)} className="w-full px-6 py-3 rounded-lg bg-yellow-600 hover:bg-yellow-500 transition-colors">
                            重返世間
                        </button>
                    </div>
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
    
    if (playerState.endGame === 'nirvana') {
        return (
            <div className="bg-black text-white min-h-screen flex items-center justify-center">
                <div className="text-center p-8">
                    <h1 className="text-4xl font-light text-gray-300 animate-pulse">...</h1>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gray-900 text-white min-h-screen font-sans bg-cover bg-fixed" style={{backgroundImage: 'url(https://placehold.co/1920x1080/0a101f/1e293b.png?text=.)'}}>
            <EndgameModal />
            {!playerState.playerName && <NameManager />}
            <WelcomeModal />
            <ProgressionModal />
            <div className={`p-4 sm:p-8 backdrop-blur-md bg-black/30 min-h-screen ${!playerState.playerName || playerState.endGame ? 'filter blur-md' : ''}`}>
                <header className="text-center mb-8">
                    <div className="flex items-center justify-center">
                        <h1 className="text-4xl sm:text-5xl font-extralight text-teal-200 tracking-wider">
                           {playerState.playerName ? `${playerState.playerName}的《未書之經》` : '未書之經'}
                        </h1>
                        {playerState.playerName && <NameManager />}
                    </div>
                    <p className="text-cyan-300/80 mt-2">互動式遊戲設計原型 v19 (完整菩薩道)</p>
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
