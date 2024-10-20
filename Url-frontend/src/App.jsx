import { useState } from 'react';
import axios from 'axios';
import ErrorBoundary from './component/errorBoundary';


function App() {
  const [longUrl, setLongUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  
  const shortenerUrl = async () => {
      if(!longUrl){
        setError('please enter a Url')
        return
      } 
      try{
         const response = await axios.post('http://localhost:4000/shorten', {
          originalUrl: longUrl,
         })
         setShortUrl(response.data.shortUrl)
         setError('')
      }
      catch(err){
         if(err.response && err.response.data){
          setError(err.response.data.message || 'Failed to shorten URL.')
         }else{
          setError('Error: Could not connect to server.')
         }
      }
  }

  return (
    <ErrorBoundary>
      <div className='w-full h-screen flex justify-center items-center flex-col'>
        <h1 className='text-4xl font-bold text-sky-600 pb-12'>Short URL</h1>
        <div className='w-full md:w-1/2 shadow-xl text-center p-8 md:p-16'>
          <h2 className='text-2xl md:text-3xl font-bold text-sky-900 pb-6'>
            Paste the URL to be shortened
          </h2>
          <div className='flex flex-col md:flex-row justify-center items-center pb-6'>
            <input 
              placeholder='Enter the link text here' 
              className='p-4 w-full md:w-2/3 border border-gray-800 mb-4 md:mb-0 md:mr-2' 
              aria-label='URL input'
              value = {longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
            />
            <button className='p-4 w-full md:w-1/3 bg-sky-600 text-white border-2 border-sky-600'
            onClick={shortenerUrl}
            >
              Shorten URL
            </button>
          </div>

          {error && <p className='text-red-500'>{error}</p>}
          {shortUrl && (
            <div className='mt-6'>
              <p className='text-lg font-bold'>Shortened URL:</p>
              <a href={shortUrl} className='text-sky-600 underline' target='_blank' rel='noopener noreferrer'>
                {shortUrl}
              </a>
            </div>
          )}

          <p className='text-gray-600'>
            ShortURL is a free tool to shorten URLs and generate short links. 
            URL shortener allows you to create a shortened link, making it easy to share.
          </p>
        </div>
      </div> 
      </ErrorBoundary>
  )
}

export default App
