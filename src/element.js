import React from 'react'

import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    border : 1px solid grey;
    border-radius:2px;
    padding : 8px;
    margin-bottom: 8px;
    background-color : white;
`;



export default class Element extends React.Component{
    render(){
        return(
            <Draggable draggableId = {this.props.element.id} index = {this.props.index}>
          {(provided) =>(
              
         <Container
         {...provided.draggableProps}
         {...provided.dragHandleProps}
         ref = {provided.innerRef}
         >
        {this.props.element.content}
        </Container>
    )}
        </Draggable>

        )
    }
}