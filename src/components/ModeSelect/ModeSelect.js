import './ModeSelect.scss';

export const ModeSelect = ({ handle }) => {
  return (
    <div className='mode-select'>
      <div className='mode' onClick={() => handle('default')}>
        Default
      </div>

      <div className='mode' onClick={() => handle('code')}>
        Code
      </div>
    </div>
  )
}