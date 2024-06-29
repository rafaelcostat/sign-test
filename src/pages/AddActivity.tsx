import { useNavigate } from 'react-router-dom'

import ActivityForm from '../components/ActivityForm/ActivityForm'
import { Container } from '../styles/layout'
import { Activity } from '../types/activity'
import { useContext } from 'react'
import { ActivityContext } from '../contexts/ActivityContext'
import { validateActivity } from '../utils/validation/activitySchema'

const AddActivity: React.FC = () => {
  const navigate = useNavigate()
  const context = useContext(ActivityContext)

  const handleAddActivity = async (data: Activity) => {
    try {
      const activityWithCreatedAt = {
        ...data,
        createdAt: new Date(),
      }
      const validation = validateActivity(data, context.activities)

      if (!validation.success) {
        alert(validation.message)
        return
      }

      await context.createActivity(activityWithCreatedAt)
      navigate('/')
    } catch (error) {
      console.error(error)
      alert('Ocorreu um erro ao adicionar a atividade.')
    }
  }

  return (
    <Container>
      <h1>Adicionar Atividade</h1>
      <ActivityForm onSubmit={handleAddActivity} initialValues={{}} />
    </Container>
  )
}

export default AddActivity
