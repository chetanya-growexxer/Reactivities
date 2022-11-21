import React from 'react'
import {Grid} from 'semantic-ui-react'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import ActivityList from './ActivityList'


function ActivityDashboard(props) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList activities={props.activities} 
        selectActivity={props.selectActivity}
        deleteActivity={props.deleteActivity}
        submitting={props.submitting}
         />
      </Grid.Column>
      <Grid.Column width='6'>
        {props.selectedActivity && props.selectedActivity.title && !props.editMode &&
        <ActivityDetails
         activity={props.selectedActivity}
         cancleActivity={props.cancleActivity}
         openForm={props.openForm} />}

         {props.editMode && 
        <ActivityForm 
          closeForm={props.closeForm} 
          selectedActivity={props.selectedActivity}
          createOrEditActivity={props.createOrEditActivity}
          submitting={props.submitting} /> }
      </Grid.Column>
    </Grid>
  )
}

export default ActivityDashboard
