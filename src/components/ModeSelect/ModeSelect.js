import { useState } from 'react';
import './ModeSelect.scss';

export const ModeSelect = ({ handle }) => {
  const [currentMode, setMode] = useState('default');

  const handleClick = (mode) => {
    setMode(mode);
    handle(mode);
  }

  return (
    <div className='mode-select'>
      <div className={`mode ${currentMode === 'default' ? 'current' : ''}`} onClick={() => handleClick('default')}>
        Default
      </div>

      <div className={`mode ${currentMode === 'code' ? 'current' : ''}`} onClick={() => handleClick('code')}>
        Code
      </div>
    </div>
  )
}