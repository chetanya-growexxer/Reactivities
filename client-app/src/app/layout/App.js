import React, { useEffect, useState} from 'react'
import {Container} from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid'
import agent from '../api/agent';
import LoadingComponent from './LoadingComponent';

function App() {
  
  const[activities,setActivities] =  useState([])
  const[selectActivity,setSelectActivity] = useState({})
  const[editMode,setEditMode] = useState(false)
  const[loading,setLoading] = useState(true)
  const[submitting,setSubmitting] = useState(false)

  useEffect(() => {
      agent.Activities.list()
      .then(response => {
        const activitiesTemp = [] 
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0]
          activitiesTemp.push(activity)
        })
        setActivities(activitiesTemp);
        setLoading(false)
      })
  },[])

  function HandleSelectActivity(id){
    setSelectActivity(activities.find(a=> a.id===id));
  }

  function HandleCancleActivity(){
    setSelectActivity({});
  }

  function HandleFormOpen(id){
    id ? HandleSelectActivity(id) : HandleCancleActivity();
    setEditMode(true)
  }

  function HandleFormClose(){
    setEditMode(false)
  }

  function HandleCreateOrEditActivity(activity){
    setSubmitting(true)
    if(activity.id > 0){
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(a=>a.id !== activity.id),activity])
        setSelectActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
    else{
      activity.id = uuid()
      agent.Activities.create(activity).then(() => {
        setActivities([...activities,{...activity, activity}]);
        setSelectActivity(activity)
        setEditMode(false)
        setSubmitting(false)
      })
    }
  }

  function HandleDeleteActivity(id){
    setSubmitting(true)
    agent.Activities.delete(id).then(() => {
      setActivities([...activities.filter(a=>a.id !== id)])
      setSubmitting(false)
    })   
  }

  if(loading) return <LoadingComponent content='Loading app'/>

  return (
    <>
      <NavBar openForm={HandleFormOpen}/>
      <Container style={{marginTop : '7em'}}>
        <ActivityDashboard activities={activities}
        selectedActivity={selectActivity}
        selectActivity={HandleSelectActivity}
        cancleActivity={HandleCancleActivity}
        editMode={editMode}
        openForm={HandleFormOpen}
        closeForm={HandleFormClose}
        createOrEditActivity={HandleCreateOrEditActivity}
        deleteActivity={HandleDeleteActivity}
        submitting={submitting}/>
      </Container>     
    </>
  );
}

export default App;
