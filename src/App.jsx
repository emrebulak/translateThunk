import Select from 'react-select'
import { FaExchangeAlt } from "react-icons/fa";
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getLanguages } from './store/actions/languagesAction';
import { translateText } from './store/actions/translateAction';
import { setAnswer } from './store/slices/translateSlice';
import Loader from './components/Loader';

const App = () => {

  const dispatch = useDispatch()
  const { isLoading, error, languages } = useSelector(state => state.languagesSlice)
  const translateState = useSelector(state => state.translateSlice)

  const [sourceLanguage, setSourceLanguage] = useState({
    name: 'Turkish',
    code: 'tr',
  })
  const [targetLanguage, setTargetLanguage] = useState({
    name: 'English',
    code: 'en',
  })

  const [text, setText] = useState()

  useEffect(() => {
    dispatch(getLanguages())
  }, [])

  const handleClick = () => {
    dispatch(translateText({ sourceLanguage, targetLanguage, text }));
  }

  const handleChange = () => {
    const tempText = translateState.answer
    setSourceLanguage(targetLanguage)
    setTargetLanguage(sourceLanguage)
    setText(tempText)
    dispatch(setAnswer(text))
  }

  return (
    <div className="bg-zinc-700 text-white w-full h-screen flex flex-col justify-center items-center">
      <div className='w-[80vw] max-w-[1100px] flex flex-col justify-center items-center gap-5'>
        <h1 className="text-4xl font-semibold">Çeviri +</h1>
        <div className='flex gap-4 w-full items-center'>
          <Select onChange={(e) => setSourceLanguage(e)} isDisabled={error} value={sourceLanguage} className='flex-1 text-black' isLoading={isLoading} options={languages} getOptionLabel={(options) => options.name} getOptionValue={(options) => options.code} />
          <button onClick={handleChange} disabled={error} className='bg-zinc-500 h-full px-8 rounded hover:ring-2 hover:bg-zinc-400 transition'><FaExchangeAlt /></button>
          <Select onChange={(e) => setTargetLanguage(e)} isDisabled={error} value={targetLanguage} className='flex-1 text-black' isLoading={isLoading} options={languages} getOptionLabel={(options) => options.name} getOptionValue={(options) => options.code} />
        </div>

        <div className='flex mt-5 gap-3 md:gap-[125px] max-md:flex-col w-full relative'>
          <textarea disabled={error} onChange={(e) => setText(e.target.value)} value={text} className='flex-1 min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-black'></textarea>
          <div className='flex-1 relative'>
            <textarea value={translateState?.answer} disabled className='w-full h-full min-h-[300px] max-h-[500px] p-[10px] text-[20px] rounded text-gray-800'></textarea>
            {translateState.isLoading && <Loader />}          
          </div>



        </div>

        <button disabled={error || !text} onClick={handleClick} className="rounded-md py-3 px-5 text-[17px] font-semibold cursor-pointer bg-zinc-500 mt-3 hover:ring-2 hover:bg-zinc-400 transition w-full">
          Çevir
        </button>

      </div>
    </div>
  )
}

export default App