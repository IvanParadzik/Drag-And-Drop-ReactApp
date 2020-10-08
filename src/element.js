import React from 'react'

import {Draggable} from 'react-beautiful-dnd'
import styled from 'styled-components'

const Container = styled.div`
    border : 1px solid grey;
    width: 33%;
    height: 100%;
    border-radius:2px;
    padding : 8px;
    margin: 8px;
    background-color : white;
`;

const ContainerNavbar =  styled.div`
    border : 1px solid grey;
    width: 100%;
    height: 100%;
    border-radius:2px;
    padding : 8px;
    margin: 8px;
    background-color : white;
    margin: '8px';
`;




export default class Element extends React.Component{
    render(){
        if(this.props.column === '0'){
            
          
              return(
                <Draggable draggableId = {this.props.element.id} index = {this.props.index}>
              {(provided) =>(
                  
             <ContainerNavbar
         
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref = {provided.innerRef}
             >
            {this.props.element.content}
       
            </ContainerNavbar>
        )}
            </Draggable>
    
            )

        }
        else if(this.props.column === '1'){
            console.log('here')
        
          
            return(
                
                <Draggable draggableId = {this.props.element.id} index = {this.props.index}>
              {(provided) =>(
                  
             <ContainerNavbar
           
             {...provided.draggableProps}
             {...provided.dragHandleProps}
             ref = {provided.innerRef}
             >
            {this.props.element.content}
            </ContainerNavbar>
        )}
            </Draggable>
    
            )

        }

        
        else{
          
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
}