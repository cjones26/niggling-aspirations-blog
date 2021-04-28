import Prism from 'prism-react-renderer/prism';
import '@fontsource/lato';
import './src/styles/main.css';
import './src/styles/prism-vslight-theme.css';
import './src/styles/prism-palenight-theme.css';

(typeof global !== 'undefined' ? global : window).Prism = Prism;

require('prismjs/components/prism-csharp');
require('prismjs/components/prism-visual-basic');
