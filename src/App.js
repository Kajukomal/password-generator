import './App.css'
import checkboxes from './checkboxes';
import { useState } from 'react';
import usePasswordGen from './hooks/usePasswordGen';
import PasswordStrengthIndicator from './components/PasswordStrengthMeasure.js'
import Checkbox from './components/Checkbox';

function App() {

  const { password,errorMsg, generatePassword } = usePasswordGen();

  const [checkboxData, setCheckboxData] = useState(checkboxes)
  const [length, setLength] = useState(4);
  const [copied, setCopied] = useState(false);

//Select Options
  const handleCheckboxChange = (i) => {
     const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  }

//Copy Password
  const handleCopy = () => {
    navigator.clipboard.writeText(password)
    setCopied(true)

    setTimeout(() => {
      setCopied(false)
    },1000)
}


  return (

    <div className="container">
    
      <h1>PASSWORD GENERATOR</h1>
      
      { password &&
        <div className="header">
               <div className="title">
                     {password}
               </div>
          <button className='copybtn' onClick={() => handleCopy()}>{copied ? 'copied' : 'COPY'}</button>
       </div>
       }
      
      <div className='charLen'>
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>
        <input type='range' min='4' max='20' value={ length}  onChange={(e)=>setLength(e.target.value)} />
      </div>

      {/* Checkboxes*/}
      <div className='checkboxes'>
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox title={checkbox.title} key={index} onChange={()=>handleCheckboxChange(index)} checked={checkbox.state} />
          )
        }
       )}
      </div>
    
      {/*Strength Measure */}
      <PasswordStrengthIndicator password={password} />

      {/* Error Handling*/}
      {errorMsg && <div className='errorMsg' >{errorMsg} </div>}
      
     {/*Generate Password */}
        <button className='generatebtn'
          onClick={() => generatePassword(checkboxData,length) }>
        GENERATE PASSWORD</button>
      
      </div>
  );
}

export default App;
