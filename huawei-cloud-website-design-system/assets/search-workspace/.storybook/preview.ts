import type { Preview } from '@storybook/react-vite';
import '../src/styles/tokens.css';
if(typeof document!=='undefined')document.documentElement.lang='zh-CN';
const preview: Preview={parameters:{layout:'padded'},tags:['autodocs']};
export default preview;
