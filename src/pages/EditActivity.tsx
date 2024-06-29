// src/pages/EditActivity.tsx
import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ActivityForm from '../components/ActivityForm/ActivityForm'
import { validateActivity } from '../utils/validation/activitySchema'
import { Activity } from '../types/activity'

import { Container } from '../styles/layout'
import { ActivityContext } from '../contexts/ActivityContext'

const EditActivity: React.FC = () => {
  const { id } = useParams() as { id: string }
  const navigate = useNavigate()
  const context = useContext(ActivityContext)

  const [initialValues, setInitialValues] = useState<Activity | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchActivity = async () => {
      const activity = await context.getActivityById(id)
      setInitialValues(activity)
    }

    fetchActivity()
  }, [id, context])

  const removeActivityById = (activities: Activity[], idToRemove: string) => {
    return activities.filter((activity) => activity.id !== idToRemove)
  }

  const handleEditActivity = async (data: Activity) => {
    const existingActivities = context.activities
    const updatedActivities = removeActivityById(existingActivities, id)

    const validation = validateActivity(data, updatedActivities)

    if (!validation.success) {
      alert(validation.message)
      return
    }
    try {
      await context.updateActivity(id, data)
      navigate('/')
    } catch (error) {
      console.error('Falha ao atualizar a atividade:', error)
      alert('Erro ao atualizar a atividade.')
    }
  }

  if (!initialValues) {
    return <div>Loading...</div>
  }

  return (
    <Container>
      <h1>Editar Atividade</h1>
      <ActivityForm
        onSubmit={handleEditActivity}
        initialValues={initialValues}
      />
    </Container>
  )
}

export default EditActivity
