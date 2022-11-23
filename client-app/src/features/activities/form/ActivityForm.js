import React, { useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';
import { observer } from 'mobx-react-lite';

function ActivityForm() {
  const {activityStore} = useStore();
  const {selectedActivity,closeForm,createActivity,updateActivity,loading} = activityStore;

  const initialState = selectedActivity ?? {
    id : '',
    title: '',
    category : '',
    description: '',
    date: '',
    city: '',
    venue: ''
  }
  const[activity,setActivity] = useState(initialState);

  function HandleSubmit() {
    activity.id ? updateActivity(activity) : createActivity(activity);
  }

  function HandleInputChange(event){
    const{name,value} = event.target;
    setActivity({...activity,[name]:value});
  }

  return (
    <Segment clearing>
        <Form onSubmit={HandleSubmit} autoComplete='off'>
            <Form.Input placeholder='Title' value={activity.title} name='title' onChange={HandleInputChange}/>
            <Form.TextArea placeholder='Description' value={activity.description} name='description' onChange={HandleInputChange}/>
            <Form.Input placeholder='Category' value={activity.category} name='category' onChange={HandleInputChange}/>
            <Form.Input type='date' placeholder='Date' value={activity.date} name='date' onChange={HandleInputChange}/>
            <Form.Input placeholder='City' value={activity.city} name='city' onChange={HandleInputChange}/>
            <Form.Input placeholder='Venue' value={activity.venue} name='venue' onChange={HandleInputChange}/>
            <Button loading={loading} floated='right' positive type='submit' content='Submit'/>
            <Button onClick={closeForm} floated='right' type='button' content='Cancel'/>
        </Form>
    </Segment>
  )
}

export default observer(ActivityForm)
