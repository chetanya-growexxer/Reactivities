import React from 'react'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

function ActivityList(props) {
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
                                <Button onClick={() => props.deleteActivity(activity.id)} floated='right' content='Delete' color='red'></Button>
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
