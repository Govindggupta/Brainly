import './App.css'
import Button from './components/Button'
import Card from './components/Card'
import PlusIcon from './icons/PlusIcon'
import ShareIcon from './icons/ShareIcon'

function App() {

  return (
    <>

      <Button 
      size='md'
      varient='primary'
      text='hello world'
      startIcon={<ShareIcon size='md' /> }
      />


      <Button 
      size='md'
      varient='secondary'
      text='hello world'
      startIcon={<PlusIcon size='md' /> }
      />
      <Card/> 
    </>
  )
}

export default App
