import { useState } from 'react';
import './EngineSelect.scss';

import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { IconContext } from 'react-icons';

export const EngineSelect = ({ handle }) => {
  const [currentEngine, setEngine] = useState('claude');

  // Mapping codenames to display names
  const engineMap = {
    'claude': 'Claude',
    'chatgpt': 'ChatGPT',
    'deepseek': 'DeepSeek',
  }

  const engines = ['chatgpt', 'claude', 'deepseek'];

  const handleClick = (engine) => {
    setEngine(engine);
    handle(engine);
  }

  const handleLeft = () => {
    let index = engines.indexOf(currentEngine);
    index -= 1;

    if (index < 0) {
      index = engines.length - 1;
    }

    setEngine(engines[index]);
    handle(engines[index]);
  }

  const handleRight = () => {
    let index = engines.indexOf(currentEngine);
    index += 1;

    if (index > engines.length - 1) {
      index = 0;
    }

    setEngine(engines[index]);
    handle(engines[index]);
  }

  return (
    <div className='engine-select'>
      <div className='col text-start'>
        <IconContext.Provider value={{ className: 'engine-switch ms-auto' }}>
          <div onClick={() => handleLeft()}><FaChevronLeft /></div>
        </IconContext.Provider>
      </div>

      <div className='engine-name col'>
        {engineMap[currentEngine]}
      </div>

      <div className='col text-end'>
        <IconContext.Provider value={{ className: 'engine-switch ms-auto' }}>
          <div onClick={() => handleRight()}><FaChevronRight /></div>
        </IconContext.Provider>
      </div>
    </div>
  )
}