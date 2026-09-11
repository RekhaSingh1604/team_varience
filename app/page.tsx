import TaskForm from '@/components/TaskForm'
// import TaskItem from '@/components/TaskItem'
import TaskList from '@/components/TaskList'
import React from 'react'

const page = () => {
  return (
   <>
   <h1>MY TASK</h1>
   <TaskForm/>
   <TaskList/>
   {/* <TaskItem/> */}

   </>
  )
}

export default page