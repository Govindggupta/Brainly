import './App.css'
import Button from './components/Button'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

function App() {

  return (
    <>
    <div className='h-screen w-screen flex items-center justify-center'>

      <Button 
      size='md'
      varient='primary'
      text='hello world'
      startIcon={<ShareIcon size='sm' /> }
      />


      <Button 
      size='lg'
      varient='secondary'
      text='hello world'
      startIcon={<PlusIcon size='md' /> }
      />
    </div>
    </>
  )
}

export default App
