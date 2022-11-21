import React, { useState } from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

function ActivityList(props) {
    const[target,setTarget] = useState('')
    function HandleActivityDelete(e,id){
        setTarget(e.currentTarget.name)
        props.deleteActivity(id)
    }
  return (
    <Segment>
        <Item.Group divided>
            {
                props.activities.map(activity => (
                    <Item key={activity.id}>
                        <Item.Content>
                            <Item.Header as='a'>{activity.title}</Item.Header>
                            <Item.Meta>{activity.date}</Item.Meta>
                            <Item.Description>
                                <div>{activity.description}</div>
                                <div>{activity.city},{activity.venue}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button onClick={() => props.selectActivity(activity.id)} floated='right' content='View' color='blue'></Button>
                                <Button name={activity.id} 
                                loading={props.submitting && target===activity.id}
                                 onClick={(e) => HandleActivityDelete(e,activity.id)} 
                                 floated='right' content='Delete' color='red'></Button>
                                <Label basic content={activity.category}></Label>
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))
            }
        </Item.Group>
    </Segment>
  )
}

export default ActivityList
