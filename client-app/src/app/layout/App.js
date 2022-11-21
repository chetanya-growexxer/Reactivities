import axios from 'axios';
import React, { useEffect, useState} from 'react'
import {Container} from 'semantic-ui-react'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard';
import NavBar from './NavBar';
import {v4 as uuid} from 'uuid'

function App() {
  
  const[activities,setActivities] =  useState([])
  const[selectActivity,setSelectActivity] = useState({})
  const[editMode,setEditMode] = useState(false)

  useEffect(() => {
      axios.get('http://localhost:5000/api/activities')
      .then(response => {
        setActivities(response.data);
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
    activity.id 
    ? setActivities([...activities.filter(a=>a.id !== activity.id),activity])
    : setActivities([...activities,{...activity, id:uuid()}]);
    setEditMode(false)
    setSelectActivity(activity)
  }

  function HandleDeleteActivity(id){
    setActivities([...activities.filter(a=>a.id !== id)])
  }

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
        deleteActivity={HandleDeleteActivity}/>
      </Container>     
    </>
  );
}

export default App;
