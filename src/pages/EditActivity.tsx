// src/pages/EditActivity.tsx
import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import ActivityForm from '../components/ActivityForm'
import { getActivities, updateActivity, getActivityById } from '../services/api'
import { validateActivity } from '../utils/validation/activitySchema'
import { Activity } from '../types/activity'

const EditActivity: React.FC = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [initialValues, setInitialValues] = useState<Activity | undefined>(
    undefined,
  )

  useEffect(() => {
    const fetchActivity = async () => {
      const activity = await getActivityById(id)
      console.log(activity)
      setInitialValues(activity)
    }

    fetchActivity()
  }, [id])

  const handleEditActivity = async (data: any) => {
    const existingActivities = await getActivities()
    const validation = validateActivity(data, existingActivities)

    if (!validation.success) {
      alert(validation.message)
      return
    }

    await updateActivity(Number(id), data)
    navigate('/')
  }

  if (!initialValues) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Editar Atividade</h1>
      <ActivityForm
        onSubmit={handleEditActivity}
        initialValues={initialValues}
      />
    </div>
  )
}

export default EditActivity
