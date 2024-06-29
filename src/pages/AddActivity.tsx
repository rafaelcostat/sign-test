import ActivityForm from '../components/ActivityForm'
import { addActivity } from '../services/api'

export function AddActivity() {
  const handleAddActivity = async (data: any) => {
    await addActivity(data)
  }

  return (
    <div>
      <h1>Adicionar Atividade</h1>
      <ActivityForm onSubmit={handleAddActivity} initialValues={{}} />
    </div>
  )
}
