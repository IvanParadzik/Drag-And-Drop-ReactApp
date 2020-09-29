import React from 'react'

import { useDrag } from 'react-dnd'
//import {SideNavbar} from './SideNavbar'

import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'


import './elements.css'

const ItemTypes = {
    KNIGHT: 'knight'
  }



export function Knight() {
  const [{isDragging}, drag] = useDrag({
    item: { type: ItemTypes.KNIGHT },
    collect: monitor => ({
      isDragging: !!monitor.isDragging(),
    }),
  })

  return (
     <div
      ref={drag}
      style={{
        opacity: isDragging ? 0.5 : 1,
        fontSize: 25,
        fontWeight: 'bold',
        cursor: 'move',
      }}
    >
      ♘
    </div>
  )
}


export function Board(){
    return <>
        <div className = 'first-element'>
        </div>
        <input className = 'other-element'/>
        <input className = 'other-element'/>
        <input className = 'other-element'/>
        <input className = 'other-element'/>
        <input className = 'other-element'/>
        <input className = 'other-element'/>
        <input className = 'other-element'/>

        </>
    
    
}





export function Main(){
    return (
        <>
        <DndProvider backend={HTML5Backend}>  
        <div>
        <div style={{width: "10%", float:"left"}}>
        <div><Knight/></div>
        <div>image</div>
        <div>text</div>
        </div>

        <div style={{width: "90%", float:"right"}}>
        <Board/>
        </div>
        </div>
          
    </DndProvider>
        </>
    )
}