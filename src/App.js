import Average from './components/Average/Average';
import Matrix from './components/Matrix/Matrix';
import Form from './components/Form/Form';

import './App.css';

function App() {
  return (
    <div className="matrix">
      <div className='matrix__inputs'>
        <Form />
      </div>
      <div className='martrix__wrap'>
        <div className='matrix__top'>
          <Matrix />
        </div>
        <div className='matrix__bot'>
          <Average />
        </div>
      </div>
    </div>
  );
}

export default App;
