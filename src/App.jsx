import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Adicionando fontes do Google Fonts
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=Anton:wght@400&family=Inter:wght@300;400;500;600;700&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

// Adicionando animações CSS para elementos flutuantes + responsividade
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px) rotate(0deg);
      opacity: 0.1;
    }
    25% {
      transform: translateY(-15px) rotate(90deg);
      opacity: 0.15;
    }
    50% {
      transform: translateY(-30px) rotate(180deg);
      opacity: 0.2;
    }
    75% {
      transform: translateY(-15px) rotate(270deg);
      opacity: 0.15;
    }
  }

  /* Responsividade Global */
  @media (max-width: 768px) {
    /* Ocultar elementos flutuantes em mobile para melhor performance */
    div[style*="animation: float"] {
      display: none !important;
    }
    
    /* Ajustes gerais para mobile */
    * {
      -webkit-tap-highlight-color: transparent;
    }
    
    /* Scrollbar customizada para mobile */
    ::-webkit-scrollbar {
      width: 4px;
    }
    
    ::-webkit-scrollbar-track {
      background: #f1f1f1;
    }
    
    ::-webkit-scrollbar-thumb {
      background: #8B0000;
      border-radius: 2px;
    }
  }
`;
document.head.appendChild(styleSheet);

// Componente da Logo
function Logo({ size = 60, mobileSize = 40, className = "" }) {
  return (
    <div className={className} style={{ display: 'inline-block', verticalAlign: 'middle' }}>
      <img 
        src="/logo-torc.png" 
        alt="Torcedores Anônimos Logo" 
        width={size} 
        height={size}
        style={{ 
          objectFit: 'contain',
          filter: 'drop-shadow(2px 2px 4px rgba(0,0,0,0.5))',
          '@media (max-width: 768px)': {
            width: mobileSize,
            height: mobileSize
          }
        }}
        className="responsive-logo"
      />
      <style jsx>{`
        @media (max-width: 768px) {
          .responsive-logo {
            width: ${mobileSize}px !important;
            height: ${mobileSize}px !important;
          }
        }
      `}</style>
    </div>
  );
}

function BolaMurchando({ visible }) {
  if (!visible) return null;
  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 0.2, opacity: 0.5, rotate: 360 }}
      transition={{ duration: 3, ease: "easeOut" }}
      style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}
    >
      <div style={{ fontSize: '60px', filter: 'grayscale(100%)' }}>⚽</div>
    </motion.div>
  );
}

// Hook para detectar se é mobile
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}

// Função helper para estilos responsivos
function getResponsiveStyle(baseStyle, mobileStyle = {}) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return isMobile ? { ...baseStyle, ...mobileStyle } : baseStyle;
}

function LoginPage({ onLogin }) {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (credentials.username === 'especialista' && credentials.password === '123456') {
      onLogin();
    } else {
      setError('Credenciais inválidas. Use: especialista / 123456');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #8B0000 50%, #000000 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px',
      position: 'relative',
      overflow: 'hidden',
      '@media (max-width: 768px)': {
        padding: '10px'
      }
    },
    floatingElements: {
      position: 'absolute',
      fontSize: '20px',
      opacity: 0.1,
      animation: 'float 8s ease-in-out infinite',
      color: '#8B0000'
    },
    loginBox: {
      background: '#FFFFFF',
      padding: '40px',
      borderRadius: '20px',
      boxShadow: '0 20px 40px rgba(139,0,0,0.3)',
      width: '100%',
      maxWidth: '400px',
      border: '2px solid #8B0000',
      zIndex: 10,
      '@media (max-width: 768px)': {
        padding: '25px 20px',
        borderRadius: '15px',
        maxWidth: '350px',
        margin: '0 10px'
      }
    },
    loginTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '15px',
      marginBottom: '30px',
      flexWrap: 'wrap',
      '@media (max-width: 768px)': {
        flexDirection: 'column',
        gap: '10px',
        marginBottom: '20px'
      }
    },
    loginTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#8B0000',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: '0.5px',
      textAlign: 'center',
      '@media (max-width: 768px)': {
        fontSize: '1.6rem',
        letterSpacing: '0.3px'
      }
    },
    input: {
      width: '100%',
      padding: '15px',
      border: '2px solid #F5F5F5',
      borderRadius: '10px',
      fontSize: '1rem',
      marginBottom: '20px',
      outline: 'none',
      fontFamily: 'Inter, sans-serif',
      transition: 'border-color 0.3s ease',
      '@media (max-width: 768px)': {
        padding: '12px',
        fontSize: '0.9rem',
        marginBottom: '15px',
        borderRadius: '8px'
      }
    },
    button: {
      width: '100%',
      background: 'linear-gradient(45deg, #8B0000, #000000)',
      color: '#FFFFFF',
      border: 'none',
      padding: '15px',
      borderRadius: '10px',
      fontSize: '1.1rem',
      fontWeight: 'bold',
      cursor: 'pointer',
      fontFamily: 'Inter, sans-serif',
      transition: 'transform 0.2s ease',
      '@media (max-width: 768px)': {
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '8px'
      }
    },
    error: {
      color: '#8B0000',
      textAlign: 'center',
      marginTop: '10px',
      fontSize: '0.9rem',
      fontFamily: 'Inter, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
        marginTop: '8px'
      }
    },
    info: {
      background: '#F5F5F5',
      padding: '15px',
      borderRadius: '10px',
      marginBottom: '20px',
      fontSize: '0.9rem',
      color: '#000000',
      fontFamily: 'Inter, sans-serif',
      '@media (max-width: 768px)': {
        padding: '12px',
        fontSize: '0.85rem',
        marginBottom: '15px',
        borderRadius: '8px'
      }
    }
  };

  return (
    <div style={styles.container}>
      {/* Apenas bolinhas flutuando - mais quantidade */}
      <div style={{...styles.floatingElements, top: '5%', left: '3%', animationDelay: '0s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '15%', right: '8%', animationDelay: '1s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '25%', left: '15%', animationDelay: '2s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '35%', right: '20%', animationDelay: '3s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '45%', left: '5%', animationDelay: '4s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '55%', right: '12%', animationDelay: '5s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '65%', left: '25%', animationDelay: '6s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '75%', right: '5%', animationDelay: '7s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '85%', left: '10%', animationDelay: '8s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '20%', right: '25%', animationDelay: '1.5s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '30%', left: '30%', animationDelay: '2.5s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '40%', right: '15%', animationDelay: '3.5s'}}>⚽</div>
      
      <motion.div 
        style={styles.loginBox}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div style={styles.info}>
          <strong>Área restrita para especialistas</strong><br/>
          Faça login para responder aos clientes que precisam de apoio.
        </div>

        <div style={styles.loginTitleContainer}>
          <Logo size={100} mobileSize={60} />
          <h1 style={styles.loginTitle}>
            TORCEDORES ANÔNIMOS
          </h1>
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={credentials.username}
          onChange={(e) => setCredentials({...credentials, username: e.target.value})}
          style={{
            ...styles.input,
            borderColor: credentials.username ? '#8B0000' : '#F5F5F5'
          }}
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={credentials.password}
          onChange={(e) => setCredentials({...credentials, password: e.target.value})}
          onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
          style={{
            ...styles.input,
            borderColor: credentials.password ? '#8B0000' : '#F5F5F5'
          }}
        />
        
        <motion.button 
          onClick={handleLogin} 
          style={styles.button}
          whileHover={{ transform: 'scale(1.02)' }}
          whileTap={{ transform: 'scale(0.98)' }}
        >
          Entrar como Especialista
        </motion.button>
        
        {error && <div style={styles.error}>{error}</div>}
      </motion.div>
    </div>
  );
}

function LandingPage({ onStart }) {
  const isMobile = useIsMobile();
  
  const frasesMarketing = [
    "Calma… ano que vem vocês sobem.",
    "Já tentou mudar de time?",
    "O juiz roubou, né?",
    "Pelo menos não foi de goleada.",
    "Ser rebaixado faz parte do futebol.",
    "Torcer é sofrer, né?",
    "Pelo menos não foi eliminado nos pênaltis...",
    "A diretoria não entende nada mesmo.",
    "Técnico burro, né?",
    "Vocês ainda têm chance no Brasileirão.",
    "Pelo menos o rival também está mal.",
    "É só uma má fase, vai passar."
  ];

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #000000 0%, #8B0000 30%, #000000 70%, #8B0000 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '10px' : '20px',
      color: '#FFFFFF',
      textAlign: 'center',
      position: 'relative',
      overflow: 'hidden'
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23FFFFFF' fill-opacity='0.03'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      opacity: 0.5
    },
    content: {
      zIndex: 1,
      maxWidth: isMobile ? '100%' : '900px',
      width: '100%',
      padding: isMobile ? '0 10px' : '0'
    },
    titleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '15px' : '30px',
      marginBottom: isMobile ? '15px' : '20px',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap'
    },
    titleText: {
      fontSize: isMobile ? '2.8rem' : '4.5rem',
      fontWeight: 'bold',
      textShadow: '3px 3px 6px rgba(0,0,0,0.8)',
      fontFamily: 'Anton, sans-serif',
      color: '#FFFFFF',
      letterSpacing: isMobile ? '1px' : '2px',
      textAlign: 'center',
      lineHeight: isMobile ? '1.1' : 'normal'
    },
    bigText: {
      fontSize: isMobile ? '1.8rem' : '2.5rem',
      fontWeight: 'bold',
      marginBottom: isMobile ? '20px' : '30px',
      textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
      lineHeight: isMobile ? '1.3' : '1.2',
      fontFamily: 'Anton, sans-serif',
      color: '#F5F5F5',
      letterSpacing: isMobile ? '0.5px' : '1px',
      padding: isMobile ? '0 10px' : '0'
    },
    subtitle: {
      fontSize: isMobile ? '1.1rem' : '1.3rem',
      marginBottom: isMobile ? '25px' : '40px',
      opacity: 0.9,
      fontWeight: '300',
      fontFamily: 'Inter, sans-serif',
      padding: isMobile ? '0 15px' : '0',
      lineHeight: isMobile ? '1.4' : 'normal'
    },
    frasesContainer: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '15px',
      marginBottom: '50px',
      width: '100%',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '12px',
        marginBottom: '30px',
        padding: '0 10px'
      }
    },
    fraseCard: {
      background: 'rgba(139,0,0,0.2)',
      padding: '20px',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(139,0,0,0.3)',
      fontSize: '1.1rem',
      fontStyle: 'italic',
      transition: 'transform 0.3s ease',
      fontFamily: 'Inter, sans-serif',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '80px',
      '@media (max-width: 768px)': {
        padding: '15px',
        fontSize: '1rem',
        minHeight: '60px',
        borderRadius: '12px'
      }
    },
    comoFunciona: {
      background: 'rgba(245,245,245,0.1)',
      padding: '40px',
      borderRadius: '20px',
      backdropFilter: 'blur(10px)',
      border: '2px solid rgba(139,0,0,0.3)',
      marginBottom: '50px',
      width: '100%',
      '@media (max-width: 768px)': {
        padding: '25px 20px',
        borderRadius: '15px',
        marginBottom: '30px',
        margin: '0 10px 30px 10px',
        width: 'calc(100% - 20px)'
      }
    },
    comoFuncionaTitle: {
      fontSize: '2rem',
      fontWeight: 'bold',
      marginBottom: '30px',
      color: '#F5F5F5',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: '1px',
      '@media (max-width: 768px)': {
        fontSize: '1.6rem',
        marginBottom: '20px',
        letterSpacing: '0.5px'
      }
    },
    stepsList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      textAlign: 'left',
      maxWidth: '600px',
      margin: '0 auto',
      '@media (max-width: 768px)': {
        gap: '15px',
        maxWidth: '100%'
      }
    },
    step: {
      display: 'flex',
      alignItems: 'center',
      gap: isMobile ? '12px' : '15px',
      fontSize: isMobile ? '1rem' : '1.2rem',
      padding: isMobile ? '12px 0' : '15px 0',
      fontFamily: 'Inter, sans-serif'
    },
    features: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      marginBottom: '50px',
      width: '100%',
      '@media (max-width: 768px)': {
        gridTemplateColumns: '1fr',
        gap: '15px',
        marginBottom: '30px',
        padding: '0 10px'
      }
    },
    feature: {
      background: 'rgba(139,0,0,0.2)',
      padding: '25px',
      borderRadius: '15px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(139,0,0,0.3)',
      transition: 'transform 0.3s ease',
      '@media (max-width: 768px)': {
        padding: '20px',
        borderRadius: '12px'
      }
    },
    featureIcon: {
      fontSize: '2.5rem',
      marginBottom: '15px',
      '@media (max-width: 768px)': {
        fontSize: '2rem',
        marginBottom: '12px'
      }
    },
    featureTitle: {
      fontSize: '1.2rem',
      fontWeight: 'bold',
      marginBottom: '10px',
      fontFamily: 'Inter, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '1.1rem',
        marginBottom: '8px'
      }
    },
    featureDesc: {
      fontSize: '0.9rem',
      opacity: 0.8,
      fontFamily: 'Inter, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '0.85rem',
        lineHeight: '1.4'
      }
    },
    startButton: {
      background: 'linear-gradient(45deg, #8B0000, #000000)',
      color: 'rgba(255,255,255,0.9)',
      border: 'none',
      padding: isMobile ? '18px 35px' : '25px 60px',
      fontSize: isMobile ? '1.1rem' : '1.4rem',
      fontWeight: '600',
      borderRadius: '50px',
      cursor: 'pointer',
      boxShadow: '0 15px 40px rgba(139, 0, 0, 0.5)',
      transition: 'all 0.3s ease',
      textTransform: 'uppercase',
      letterSpacing: isMobile ? '0.5px' : '1px',
      marginBottom: isMobile ? '20px' : '30px',
      fontFamily: 'Anton, sans-serif',
      width: isMobile ? '90%' : 'auto',
      maxWidth: isMobile ? '300px' : 'none',
      textShadow: 'none',
      opacity: 0.95
    },
    drConsola: {
      background: 'rgba(245,245,245,0.1)',
      padding: '30px',
      borderRadius: '20px',
      border: '2px solid rgba(139,0,0,0.3)',
      marginBottom: '40px',
      '@media (max-width: 768px)': {
        padding: '20px',
        borderRadius: '15px',
        marginBottom: '25px',
        margin: '0 10px 25px 10px'
      }
    },
    drConsolaTitle: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      marginBottom: '15px',
      color: '#F5F5F5',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: '0.5px',
      '@media (max-width: 768px)': {
        fontSize: '1.4rem',
        marginBottom: '12px',
        letterSpacing: '0.3px'
      }
    },
    drConsolaDesc: {
      fontSize: '1.1rem',
      lineHeight: '1.5',
      fontFamily: 'Inter, sans-serif',
      '@media (max-width: 768px)': {
        fontSize: '1rem',
        lineHeight: '1.4'
      }
    },
    floatingBall: {
      position: 'absolute',
      fontSize: '25px',
      opacity: 0.15,
      animation: 'float 6s ease-in-out infinite',
      color: '#8B0000'
    }
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <div style={styles.backgroundPattern}></div>
      
      {/* Apenas bolinhas flutuando - quantidade maior */}
      <div style={{...styles.floatingBall, top: '5%', left: '5%', animationDelay: '0s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '10%', right: '10%', animationDelay: '1s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '15%', left: '20%', animationDelay: '2s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '20%', right: '25%', animationDelay: '3s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '25%', left: '8%', animationDelay: '4s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '30%', right: '15%', animationDelay: '5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '35%', left: '30%', animationDelay: '6s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '40%', right: '5%', animationDelay: '7s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '45%', left: '12%', animationDelay: '8s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '50%', right: '30%', animationDelay: '1.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '55%', left: '25%', animationDelay: '2.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '60%', right: '8%', animationDelay: '3.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '65%', left: '15%', animationDelay: '4.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '70%', right: '20%', animationDelay: '5.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '75%', left: '3%', animationDelay: '6.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '80%', right: '12%', animationDelay: '7.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '85%', left: '28%', animationDelay: '8.5s'}}>⚽</div>
      <div style={{...styles.floatingBall, top: '90%', right: '18%', animationDelay: '9s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '5%', left: '10%', animationDelay: '1.2s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '10%', right: '22%', animationDelay: '2.2s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '15%', left: '18%', animationDelay: '3.2s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '20%', right: '6%', animationDelay: '4.2s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '25%', left: '32%', animationDelay: '5.2s'}}>⚽</div>
      <div style={{...styles.floatingBall, bottom: '30%', right: '28%', animationDelay: '6.2s'}}>⚽</div>

      <div style={styles.content}>
        <motion.div 
          style={styles.titleContainer}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <Logo size={100} mobileSize={60} />
          <h1 style={styles.titleText}>
            TORCEDORES ANÔNIMOS
          </h1>
        </motion.div>
        
        <motion.div 
          style={styles.bigText}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          SEU TIME ESTÁ NUMA MÁ FASE? NÓS TE CONSOLAMOS!
        </motion.div>
        
        <motion.p 
          style={styles.subtitle}
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          O primeiro chat com especialistas reais de apoio para torcedores sofrendo com rebaixamento, 
          eliminações, derrotas seguidas e crises no clube.
        </motion.p>

        <motion.div 
          style={styles.frasesContainer}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          {frasesMarketing.map((frase, index) => (
            <motion.div
              key={index}
              style={styles.fraseCard}
              whileHover={{ scale: 1.05, background: 'rgba(139,0,0,0.3)' }}
              transition={{ duration: 0.2 }}
            >
              "{frase}"
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          style={styles.drConsola}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <div style={styles.drConsolaTitle}>👩‍⚕️ CONHEÇA A DRA. CONSOLA TUDO</div>
          <div style={styles.drConsolaDesc}>
            Especialista em consolação futebolística com anos de experiência ajudando torcedores a superar rebaixamentos, eliminações, derrotas dolorosas e crises no clube. 
            Ela vai te ouvir, te entender e te ajudar a encontrar forças para continuar torcendo!
          </div>
        </motion.div>

        <motion.div 
          style={styles.comoFunciona}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div style={styles.comoFuncionaTitle}>⚙️ COMO FUNCIONA</div>
          <div style={styles.stepsList}>
            <div style={styles.step}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <span><strong>20 minutos grátis</strong> de desabafo com a Dra. Consola Tudo</span>
            </div>
            <div style={styles.step}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <span>Depois, só <strong>R$5/semana</strong> para continuar o tratamento</span>
            </div>
            <div style={styles.step}>
              <span style={{ fontSize: '1.5rem' }}>✅</span>
              <span><strong>Atendimento humanizado</strong> e bem-humorado</span>
            </div>
          </div>
        </motion.div>

        <motion.div 
          style={styles.features}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div style={styles.feature}>
            <div style={styles.featureIcon}>😭</div>
            <div style={styles.featureTitle}>ESPAÇO SEGURO PARA DESABAFAR</div>
            <div style={styles.featureDesc}>Aqui você pode chorar sobre rebaixamentos, eliminações e derrotas sem julgamentos</div>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>🤗</div>
            <div style={styles.featureTitle}>CONSOLAÇÃO ESPECIALIZADA</div>
            <div style={styles.featureDesc}>Dra. Consola Tudo entende todas as dores do futebol: rebaixamento, eliminação, crise...</div>
          </div>
          
          <div style={styles.feature}>
            <div style={styles.featureIcon}>💪</div>
            <div style={styles.featureTitle}>RECUPERAÇÃO GARANTIDA</div>
            <div style={styles.featureDesc}>Você vai sair mais forte, seja qual for a crise que seu time está passando</div>
          </div>
        </motion.div>

        <motion.button
          style={styles.startButton}
          onClick={onStart}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.6, duration: 0.5, type: "spring" }}
          whileHover={{ 
            scale: 1.05, 
            boxShadow: '0 20px 50px rgba(139, 0, 0, 0.7)' 
          }}
          whileTap={{ scale: 0.95 }}
        >
           DESABAFAR DE GRAÇA POR 20 MINUTOS
        </motion.button>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{ fontSize: '0.9rem', opacity: 0.7, fontFamily: 'Inter, sans-serif' }}
        >
          * Sem compromisso. Cancele quando quiser. Sua dor futebolística é nossa prioridade.
        </motion.div>
      </div>
    </motion.div>
  );
}

function ChatPage({ onBack, clientId, isEspecialista, onLoginRequest }) {
  const isMobile = useIsMobile();
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutos
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { from: "especialista", text: "Olá! Sou Dra. Consola Tudo, especialista em apoio a torcedores em crise. Sei que você está passando por um momento difícil com seu time - seja rebaixamento, eliminação, derrotas seguidas ou qualquer má fase. Estou aqui para te consolar. Como você está se sentindo? 😊", timestamp: new Date() }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [showBolaMurchando, setShowBolaMurchando] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !isSubscribed && !isEspecialista) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
    if (timeLeft === 0 && !isSubscribed && !isEspecialista) {
      setShowBolaMurchando(true);
    }
  }, [timeLeft, isSubscribed, isEspecialista]);

  function handleSendMessage() {
    if (!newMessage.trim()) return;
    
    const message = {
      from: isEspecialista ? "especialista" : "user",
      text: newMessage,
      timestamp: new Date()
    };
    
    setChatMessages((prev) => [...prev, message]);
    setNewMessage("");
    
    if (!isEspecialista) {
      setShowBolaMurchando(true);
    }
  }

  function handleSubscribe() {
    setIsSubscribed(true);
    setShowBolaMurchando(false);
  }

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #F8F9FA 0%, #E9ECEF 50%, #F8F9FA 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: isMobile ? '10px' : '20px',
      position: 'relative',
      overflow: 'hidden'
    },
    floatingElements: {
      position: 'absolute',
      fontSize: '15px',
      opacity: 0.03,
      animation: 'float 10s ease-in-out infinite',
      color: '#6C757D'
    },
    header: {
      background: isEspecialista ? 'linear-gradient(135deg, #000000 0%, #2C2C2C 100%)' : 'linear-gradient(135deg, #2C2C2C 0%, #000000 100%)',
      color: '#FFFFFF',
      padding: isMobile ? '15px 10px' : '20px',
      borderRadius: isMobile ? '12px 12px 0 0' : '15px 15px 0 0',
      textAlign: 'center',
      position: 'relative',
      zIndex: 10,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    },
    backButton: {
      position: 'absolute',
      left: isMobile ? '10px' : '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'linear-gradient(135deg, #8B0000, #B22222)',
      border: '2px solid rgba(255,255,255,0.2)',
      color: '#FFFFFF',
      padding: isMobile ? '10px 16px' : '12px 20px',
      borderRadius: isMobile ? '25px' : '30px',
      cursor: 'pointer',
      fontSize: isMobile ? '13px' : '15px',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '600',
      boxShadow: '0 4px 12px rgba(139, 0, 0, 0.3)',
      letterSpacing: '0.5px',
      display: 'flex',
      alignItems: 'center',
      gap: '6px'
    },
    loginButton: {
      position: 'absolute',
      right: isMobile ? '10px' : '20px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'transparent',
      border: 'none',
      color: 'rgba(255,255,255,0.4)',
      padding: isMobile ? '6px' : '8px',
      borderRadius: '50%',
      cursor: 'pointer',
      fontSize: isMobile ? '14px' : '16px',
      fontFamily: 'Inter, sans-serif',
      transition: 'none',
      fontWeight: '400',
      width: isMobile ? '28px' : '32px',
      height: isMobile ? '28px' : '32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    title: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      margin: '0',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: '2px'
    },
    headerTitleContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '10px' : '15px',
      flexDirection: isMobile ? 'column' : 'row',
      flexWrap: 'wrap'
    },
    headerTitle: {
      fontSize: isMobile ? '1.4rem' : '1.8rem',
      fontWeight: '600',
      margin: '0',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: isMobile ? '0.5px' : '1px',
      textAlign: 'center',
      color: 'rgba(255,255,255,0.95)'
    },
    subtitle: {
      fontSize: isMobile ? '0.9rem' : '1rem',
      opacity: 0.85,
      margin: isMobile ? '3px 0 0 0' : '5px 0 0 0',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400'
    },
    especialistaInfo: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: isMobile ? '5px' : '10px',
      marginTop: isMobile ? '8px' : '10px',
      fontSize: isMobile ? '0.8rem' : '0.9rem',
      opacity: 0.75,
      fontFamily: 'Inter, sans-serif',
      flexWrap: isMobile ? 'wrap' : 'nowrap',
      textAlign: isMobile ? 'center' : 'left'
    },
    chatContainer: {
      flex: 1,
      maxWidth: isMobile ? '100%' : '800px',
      margin: '0 auto',
      width: '100%',
      background: '#FFFFFF',
      borderRadius: isMobile ? '0 0 12px 12px' : '0 0 15px 15px',
      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      border: isMobile ? '1px solid #DEE2E6' : '2px solid #DEE2E6',
      borderTop: 'none',
      zIndex: 10
    },
    timer: {
      padding: isMobile ? '12px' : '15px',
      textAlign: 'center',
      background: isEspecialista ? 'linear-gradient(135deg, #000000 0%, #2C2C2C 100%)' : isSubscribed ? 'linear-gradient(135deg, #28A745 0%, #20C997 100%)' : 'linear-gradient(135deg, #2C2C2C 0%, #000000 100%)',
      color: 'rgba(255,255,255,0.95)',
      fontFamily: 'Anton, sans-serif',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '500',
      letterSpacing: isMobile ? '0.3px' : '0.5px'
    },
    chatArea: {
      flex: 1,
      padding: isMobile ? '15px' : '20px',
      overflowY: 'auto',
      maxHeight: isMobile ? '300px' : '400px',
      background: 'linear-gradient(to bottom, #F8F9FA, #FFFFFF)',
      borderRadius: '0 0 8px 8px'
    },
    messageContainer: {
      marginBottom: '15px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    userMessage: {
      alignItems: 'flex-end'
    },
    especialistaMessage: {
      alignItems: 'flex-start'
    },
    messageBubble: {
      maxWidth: isMobile ? '85%' : '70%',
      padding: isMobile ? '10px 15px' : '12px 18px',
      borderRadius: isMobile ? '15px' : '20px',
      fontSize: isMobile ? '0.9rem' : '0.95rem',
      lineHeight: '1.4',
      position: 'relative',
      fontFamily: 'Inter, sans-serif',
      fontWeight: '400'
    },
    userBubble: {
      background: 'linear-gradient(135deg, #2C2C2C 0%, #000000 100%)',
      color: 'rgba(255,255,255,0.95)',
      borderBottomRightRadius: '5px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    especialistaBubble: {
      background: 'linear-gradient(135deg, #E9ECEF 0%, #F8F9FA 100%)',
      color: '#495057',
      borderBottomLeftRadius: '5px',
      border: '1px solid #DEE2E6',
      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
    },
    especialistaLabel: {
      fontSize: isMobile ? '0.65rem' : '0.7rem',
      color: '#6C757D',
      marginBottom: '5px',
      fontWeight: '600',
      fontFamily: 'Inter, sans-serif',
      textAlign: 'left'
    },
    timestamp: {
      fontSize: isMobile ? '0.55rem' : '0.6rem',
      opacity: 0.6,
      marginTop: '5px',
      fontFamily: 'Inter, sans-serif',
      color: '#6C757D',
      textAlign: 'left'
    },
    inputContainer: {
      padding: isMobile ? '15px' : '20px',
      background: '#F8F9FA',
      borderTop: '1px solid #DEE2E6'
    },
    inputWrapper: {
      display: 'flex',
      gap: isMobile ? '8px' : '10px',
      maxWidth: isMobile ? '100%' : '600px',
      margin: '0 auto',
      flexDirection: isMobile ? 'column' : 'row'
    },
    input: {
      flex: 1,
      padding: isMobile ? '10px 15px' : '12px 18px',
      border: '2px solid #DEE2E6',
      borderRadius: isMobile ? '20px' : '25px',
      outline: 'none',
      fontSize: isMobile ? '0.9rem' : '1rem',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, sans-serif',
      backgroundColor: '#FFFFFF',
      color: '#495057'
    },
    sendButton: {
      background: isEspecialista ? 'linear-gradient(135deg, #000000 0%, #2C2C2C 100%)' : 'linear-gradient(135deg, #2C2C2C 0%, #000000 100%)',
      color: 'rgba(255,255,255,0.95)',
      border: 'none',
      padding: isMobile ? '10px 20px' : '12px 25px',
      borderRadius: isMobile ? '20px' : '25px',
      cursor: 'pointer',
      fontSize: isMobile ? '0.9rem' : '1rem',
      fontWeight: '500',
      transition: 'all 0.3s ease',
      fontFamily: 'Inter, sans-serif',
      width: isMobile ? '100%' : 'auto',
      boxShadow: '0 2px 8px rgba(0,0,0,0.15)'
    },
    subscribeContainer: {
      textAlign: 'center',
      padding: isMobile ? '20px' : '30px',
      background: 'linear-gradient(135deg, #F8F9FA, #FFFFFF)',
      margin: isMobile ? '15px' : '20px',
      borderRadius: isMobile ? '12px' : '15px',
      border: '2px solid #DEE2E6',
      boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
    },
    subscribeButton: {
      background: 'linear-gradient(135deg, #28A745 0%, #20C997 100%)',
      color: 'rgba(255,255,255,0.95)',
      border: 'none',
      padding: isMobile ? '12px 25px' : '15px 30px',
      borderRadius: isMobile ? '20px' : '25px',
      cursor: 'pointer',
      fontSize: isMobile ? '1rem' : '1.1rem',
      fontWeight: '500',
      marginTop: isMobile ? '12px' : '15px',
      boxShadow: '0 4px 12px rgba(40, 167, 69, 0.3)',
      fontFamily: 'Anton, sans-serif',
      letterSpacing: '0.5px',
      width: isMobile ? '90%' : 'auto',
      maxWidth: isMobile ? '250px' : 'none'
    }
  };

  return (
    <motion.div 
      style={styles.container}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Apenas bolinhas flutuando sutis no chat */}
      <div style={{...styles.floatingElements, top: '3%', left: '1%', animationDelay: '0s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '8%', right: '2%', animationDelay: '1s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '15%', left: '3%', animationDelay: '2s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '25%', right: '1%', animationDelay: '3s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '35%', left: '2%', animationDelay: '4s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '45%', right: '3%', animationDelay: '5s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '55%', left: '1%', animationDelay: '6s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '65%', right: '2%', animationDelay: '7s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '75%', left: '3%', animationDelay: '8s'}}>⚽</div>
      <div style={{...styles.floatingElements, top: '85%', right: '1%', animationDelay: '9s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '15%', left: '2%', animationDelay: '1.5s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '25%', right: '3%', animationDelay: '2.5s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '35%', left: '1%', animationDelay: '3.5s'}}>⚽</div>
      <div style={{...styles.floatingElements, bottom: '45%', right: '2%', animationDelay: '4.5s'}}>⚽</div>

      <div style={styles.header}>
        <button 
          style={styles.backButton} 
          onClick={onBack}
        >
          Voltar
        </button>
        {!isEspecialista && !isMobile && (
          <button 
            style={styles.loginButton} 
            onClick={onLoginRequest}
          >
            ⚙️
          </button>
        )}
        <div style={styles.headerTitleContainer}>
          <Logo size={100} mobileSize={60} />
          <h1 style={styles.headerTitle}>
            TORCEDORES ANÔNIMOS
          </h1>
        </div>
        <p style={styles.subtitle}>
          {isEspecialista ? 'Respondendo ao Cliente' : 'Especialista em Consolação de Torcedores em Crise'}
        </p>
        {!isEspecialista && (
          <div style={styles.especialistaInfo}>
            <span>👩‍⚕️</span>
            <span>Especialista em Crises Futebolísticas • 20 anos consolando torcedores • 🟢 Online</span>
          </div>
        )}
      </div>

      <div style={styles.chatContainer}>
        <div style={styles.timer}>
          {isEspecialista ? (
            "👩‍⚕️ MODO ESPECIALISTA - SEM LIMITE DE TEMPO"
          ) : isSubscribed ? (
            "✅ CONSULTA PREMIUM ATIVA - TEMPO ILIMITADO!"
          ) : (
            `CONSULTA GRATUITA: ${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, "0")}`
          )}
        </div>

        <div style={styles.chatArea}>
          <AnimatePresence>
            {chatMessages.map((msg, idx) => (
              <motion.div
                key={idx}
                style={{
                  ...styles.messageContainer,
                  ...(msg.from === "user" ? styles.userMessage : styles.especialistaMessage)
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {msg.from === "especialista" && (
                  <div style={styles.especialistaLabel}>Dra. Consola Tudo - Especialista</div>
                )}
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(msg.from === "user" ? styles.userBubble : styles.especialistaBubble)
                  }}
                >
                  {msg.text}
                </div>
                <div style={{
                  ...styles.timestamp,
                  textAlign: msg.from === "user" ? 'right' : 'left'
                }}>
                  {msg.timestamp.toLocaleTimeString()}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          <BolaMurchando visible={showBolaMurchando} />

          {!isEspecialista && !isSubscribed && timeLeft <= 0 ? (
            <motion.div 
              style={styles.subscribeContainer}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <h3 style={{ color: '#495057', margin: '0 0 10px 0', fontFamily: 'Anton, sans-serif', letterSpacing: '1px' }}>⏰ CONSULTA GRATUITA FINALIZADA!</h3>
              <p style={{ color: '#495057', margin: '0', fontFamily: 'Inter, sans-serif' }}>Para continuar o atendimento com Dra. Consola Tudo, contrate uma consulta premium!</p>
              <motion.button
                onClick={handleSubscribe}
                style={styles.subscribeButton}
                whileHover={{ transform: 'scale(1.03)', boxShadow: '0 6px 16px rgba(40, 167, 69, 0.4)' }}
                whileTap={{ transform: 'scale(0.97)' }}
              >
                💳 CONTRATAR CONSULTA PREMIUM
              </motion.button>
            </motion.div>
          ) : (
            <div style={styles.inputContainer}>
              <div style={styles.inputWrapper}>
                <input
                  type="text"
                  placeholder={isEspecialista ? "Digite sua resposta como especialista..." : "Conte sobre a crise do seu time..."}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  disabled={!isEspecialista && !isSubscribed && timeLeft <= 0}
                  style={{
                    ...styles.input,
                    borderColor: newMessage ? '#8B0000' : '#F5F5F5'
                  }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={!isEspecialista && !isSubscribed && timeLeft <= 0}
                  style={styles.sendButton}
                  whileHover={{ transform: 'scale(1.02)', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
                  whileTap={{ transform: 'scale(0.98)' }}
                >
                  {isEspecialista ? 'RESPONDER 👩‍⚕️' : 'ENVIAR 💬'}
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export default function RebaixadosAnonimos() {
  const [currentPage, setCurrentPage] = useState('landing'); // 'landing', 'chat', 'login'
  const [isEspecialista, setIsEspecialista] = useState(false);
  const [clientId] = useState('cliente_' + Math.random().toString(36).substr(2, 9));

  const handleLogin = () => {
    setIsEspecialista(true);
    setCurrentPage('chat');
  };

  const handleLoginRequest = () => {
    setCurrentPage('login');
  };

  const handleBackToLanding = () => {
    setCurrentPage('landing');
    setIsEspecialista(false);
  };

  return (
    <div>
      <AnimatePresence mode="wait">
        {currentPage === 'landing' ? (
          <LandingPage 
            key="landing"
            onStart={() => setCurrentPage('chat')} 
          />
        ) : currentPage === 'login' ? (
          <LoginPage
            key="login"
            onLogin={handleLogin}
          />
        ) : (
          <ChatPage 
            key="chat"
            onBack={handleBackToLanding}
            clientId={clientId}
            isEspecialista={isEspecialista}
            onLoginRequest={handleLoginRequest}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
