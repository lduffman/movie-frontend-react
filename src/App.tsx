import { useState } from 'react'
import { Button } from './components/ui/button'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section className='flex flex-col h-screen items-center justify-center gap-4'>
        <h1 className='text-3xl font-bold'>Vite + React + TypeScript</h1>
        <div className='flex flex-col items-center gap-4'>
          <p className='text-lg'>Count is: {count}</p>
          <div className='flex gap-4'>
          <Button
            variant='default'
            onClick={() => setCount((count) => count + 1)}
          >
            Increment
          </Button>
          <Button variant='outline' onClick={() => setCount(0)}>
            Reset
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

export default App
