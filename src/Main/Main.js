
import React from 'react';

import data from './data'

import Row from './Rows'

import {DragDropContext} from 'react-beautiful-dnd'



export default class App extends React.Component{

 //postavljanje stanja 
  state = data;
 


  // funkcija kojom se uploada slika u placeholder pritiskom tipke 'upload image'
  handleImage =(e, elementId, dropID)=>{
      e.preventDefault()
      const dictElement = {
        id: elementId,
        content: (
          <>
            <div>
              <button
                onClick={(e) => {
                  this.removeElement(
                    e,
                    elementId,
                    dropID
                  );
                }}
                style={{
                  position: "relative",
                  width: "8%",
                  left: "90%",
                  fontSize: "8px",
                  borderRadius : '25px'
                }}
              >
                X
              </button>
            </div>
            
            <img alt={elementId} src={this.state.imageHttp[elementId].http}
          width="100%" height="100"/>
      
          </>
        ),
      };
      data['elements'][elementId] = dictElement
      this.setState({
          ...this.state,
          elements : {
              ...this.state.elements,
              [elementId] : data['elements'][elementId]
          },
      })

  }
  
  // funkcija kojom se pritiskom na tipku 'x' briše element iz placeholdera
  removeElement = (e, elementId,dropId) =>{
      e.preventDefault()
      delete data["elements"][elementId]
      data["columns"][dropId]["elementIds"] = []
      this.setState({
          ...this.state,
          elements : data["elements"],
          columns : data["columns"]
      })
  }
 // funkcija kojom se sprema trenutno stanje inputa(http) za upload slike 
  handle_image_http = (e, elementId, dropID)=>{
    const value = e.target.value;
    
    data['imageHttp'][elementId]['http'] = value
  
    this.setState({
        ...this.state,
        imageHttp  :  data['imageHttp']
    })
    const dictElement = {
        id: elementId,

        content: (
          <>
            <div>
              <button
                onClick={(e) => {
                  this.removeElement(
                    e,
                    elementId,
                    dropID
                  );
                }}
                style={{
                  position: "relative",
                  width: "8%",
                  left: "90%",
                  fontSize: "8px",
                  borderRadius : '25px'
                }}
              >
                X
              </button>
            </div>
            
            <form  
            onSubmit ={(e) =>{this.handleImage(e,elementId, dropID)}}
            
            style={{
                position: "relative",
                width: "70%",
                left: "15%",
              }}>
                   <input
                  type="http"
                  placeholder = 'Paste Image http here'
                  defaultValue = {this.state.imageHttp[elementId].http}
                  onChange={(e) =>{this.handle_image_http(e,elementId, dropID)}}
                  required={true}
                  className="form-control input-create"
          ></input>
          <button
             type="submit"
              style={{
                position: "relative",
                width: "70%",
                left: "15%",
                marginTop: "20px",
                borderRadius : '25px'
                
              }}
              
            >
              Upload Image
            </button>
      </form>
          </>
        ),
      };
      data['elements'][elementId] = dictElement
      
      this.setState({
          ...this.state,
         
          elements : {
              ...this.state.elements,
              [elementId] : data['elements'][elementId]
          },
      })
  }
  //funkcija kojom se sprema(prati) trenutno stanje teksta unutar textarea 
  handleChangeTextarea = (e,elementId, dropID) =>{
    
    const value = e.target.value;
   
    data['textarea'][elementId]['text'] = value
  
    this.setState({
        ...this.state,
        textarea  :  data['textarea']
    })
    let dictElement = {
        id: elementId,
        content: (
          <>
            <div>
              <button
                onClick={(e) => {
                    this.removeElement(
                      e,
                      elementId,
                      dropID
                    );
                  }}
           
                style={{
                  position: "relative",
                  width: "8%",
                  left: "90%",
                  fontSize: "8px",
                  borderRadius : '25px'
                }}
              >
                X
              </button>
            </div>
            <textarea
              type="text"
              name= ""
              placeholder = 'Insert text here'
              defaultValue={this.state.textarea[elementId].text}
              onChange={(e) =>{
                this.handleChangeTextarea(e, elementId, dropID)}
              }
              style={{
                height: "80%",
                width: "100%",
                resize: "none",
                border: "none",
              }}
            ></textarea>
          </>
        ),
      };
      data['elements'][elementId] = dictElement
      

      this.setState({
          ...this.state,
         
          elements : {
              ...this.state.elements,
              [elementId] : data['elements'][elementId]
          },
      })
    

  }

  // Kada završi drag aktivira se funkcija 
  onDragEnd = result=>{
     //dobivaju se rezultati koji nam govore gdje je drag završio te gdje je počeo
    const {destination, source,draggableId, type} =result;

    //ako nema nove pozicije ne dogodi se ništa 
    if(!destination){
        return;}
    //ako je nova pozicija ista kao na početku ne dogodi se ništa 
      if(
        destination.droppableId === source.droppableId &&
        destination.index === source.index
      ){return ; }

      //ako dragamo placeholder s navbara u smeće ne dogodi se ništa 
      if(destination.droppableId === '1'){
        if(source.droppableId === '0'){
            return;
        }
    }
    
    // ako je završna pozicija placeholdera '1' (što predstavlja red u kojem se nalazi trash) dogodi se brisanje placeholdera 
    if(destination.droppableId === '1'){
    
        if(Object.keys(data['columns'][draggableId]['elementIds']).length ===1){
            // Kada bi bilo backenda u ovom dijelu bi se brisao element unutar placeholdera 
        }
        delete data['columns'][draggableId]
        let columnIds = Object.values(data['rows'][source.droppableId]["columnIds"])

        columnIds.splice(source.index,1)
       
        data['rows'][source.droppableId]["columnIds"] = columnIds
        this.setState({
            ...this.state,
            rows : data["rows"],
            columns : data["columns"]
        })

        const start = data['rows'][source.droppableId]
        const ColumnIds = Array.from(start.columnIds);

        const endRowCheck = this.state.rows[(Object.keys(this.state.rows).length-1).toString()]
        const endRowIdsCheck  = Array.from(endRowCheck.columnIds)
        const predzadnjiRowCheck = this.state.rows[(Object.keys(this.state.rows).length-2).toString()]
        const predzadnjiRowIdsCheck = Array.from(predzadnjiRowCheck.columnIds)

        function SizeString(state) {
            if (endRowIdsCheck.length === 0) {
              return (Object.keys(state).length - 2).toString();
            } else {
              return (Object.keys(state).length - 1).toString();
            }
          }

        if (
          (ColumnIds.length < 3 &&
            source.droppableId !==
              SizeString(this.state.rows)) ||
          (source.droppableId === "2" && ColumnIds.length === 0)
        ) {
     
          function Size(state) {
            if (endRowIdsCheck.length === 0) {
              return Object.keys(state).length - 2;
            } else {
              return Object.keys(state).length - 1;
            }
          }
          var sizeOfRows = Size(this.state.rows);

          for (let i = parseInt(source.droppableId); i < sizeOfRows; i++) {
     
            let row = data["rows"][i + 1];
            let rowCols = Array.from(row.columnIds);

            let lastColId = rowCols.slice(0)[0];
        
            let nextRow = data["rows"][i];
            let nextRowIds = Array.from(nextRow.columnIds);
        
            if (i !== parseInt(source.droppableId)) {
         
              nextRowIds.splice(0, 1);
              
            }
            nextRowIds.splice(2, 0, lastColId);
            rowCols.splice(0, 1);
            
            if(sizeOfRows  <4 && source.droppableId !== (Object.keys(this.state.rows).length-1).toString() ){
              
                data["rows"][i + 1]["columnIds"] = rowCols;
            }  
            data["rows"][i]["columnIds"] = nextRowIds;
           
          }
          this.setState({
            ...this.state,
            rows : data["rows"],
        })
        }
        
        else{
            let endRow = this.state.rows[(Object.keys(this.state.rows).length-1).toString()]
            let predzadnjiRow = this.state.rows[(Object.keys(this.state.rows).length-2).toString()]
            let predzadnjiRowIds = Array.from(predzadnjiRow.columnIds)
           
            let endRowIds  = Array.from(endRow.columnIds)
            let newRowSize = Object.keys(this.state.rows).length - 1
            if((predzadnjiRowIds.length<3 && endRowIds.length ===0)  || (source.droppableId ==='2' && newRowSize > 3 )){
                delete data['rowOrder'][(Object.keys(this.state.rows).length-1).toString()]
                delete data['rows'][(Object.keys(this.state.rows).length-1).toString()]   
            }
            var filteredOrderAgain= Object.values(data['rowOrder']).filter(function (el) {
                return el != null;
                });
            this.setState({
                ...this.state,
                rows : data["rows"],
                rowOrder: filteredOrderAgain
            
            })
            
           return;
        }

        if(source.droppableId === (Object.keys(this.state.rows).length-1).toString() && endRowIdsCheck.length ===0 ){
            console.log('here')
            return
        }
        if(source.droppableId ==='2' &&  endRowIdsCheck.length ===2 && (Object.keys(this.state.rows).length-1).toString() ==='3'){
            return
        }
        let newRowSizeCheck = Object.keys(this.state.rows).length - 2
        if(endRowIdsCheck.length !==0  ){
            let endRow = data["rows"][(Object.keys(this.state.rows).length-1).toString()];
            let endRowIds = Array.from(endRow.columnIds)
            endRowIds.splice(0,1)
            data["rows"][[(Object.keys(this.state.rows).length).toString()-1]]["columnIds"] = endRowIds;
            this.setState({
                ...this.state,
                rows : data["rows"],  
            })
        }

        else if(endRowIdsCheck.length ===0 && predzadnjiRowIdsCheck.length === 3 && newRowSizeCheck > 3  ){
            let endRow = data["rows"][(Object.keys(this.state.rows).length-2).toString()];
            let endRowIds = Array.from(endRow.columnIds)
            endRowIds.splice(0,1)
            data["rows"][[(Object.keys(this.state.rows).length).toString()-2]]["columnIds"] = endRowIds;
            this.setState({
                ...this.state,
                rows : data["rows"],  
            })

        }

          //brisanje viška redova zbog brisanja placeholdera
          let endRow = this.state.rows[(Object.keys(this.state.rows).length-1).toString()]
          let predzadnjiRow = this.state.rows[(Object.keys(this.state.rows).length-2).toString()]
          let predzadnjiRowIds = Array.from(predzadnjiRow.columnIds)
          let endRowIds  = Array.from(endRow.columnIds)
          let newRowSize = Object.keys(this.state.rows).length - 1
          if((predzadnjiRowIds.length<3 && endRowIds.length ===0)  && (newRowSize > 3 )){
             
              delete data['rowOrder'][(Object.keys(this.state.rows).length-1).toString()]
              delete data['rows'][(Object.keys(this.state.rows).length-1).toString()]
              
          }
  
          var filteredOrder = Object.values(data['rowOrder']).filter(function (el) {
              return el != null;
            });
           
        this.setState({
            ...this.state,
            rows : data["rows"],
            rowOrder: filteredOrder
         
        })
        return
    }


    //draging placeholders
    if(type === 'placeholder'){
        //creating new placeholder
        if(source.droppableId === '0'){

            let newId = (Object.keys(data['columns'])[Object.keys(data['columns']).length-1] )
            newId = (parseInt(newId.replace(/col-/, '')) +1).toString()
         
            let Id = 'col-'+newId
            let dictColumns = {
                id : Id,
                elementIds: [],
            }
            data['columns'][Id] = dictColumns


            data['rows'][destination.droppableId]['columnIds'].splice(destination.index,0,Id)
      
            const finish = data['rows'][destination.droppableId]
            const ColumnIds = Array.from(finish.columnIds);
     
            if(ColumnIds.length>3 || (destination.droppableId ==='2' && ColumnIds.length>1) ){

                function getRowSize(id, state) {
                    if (id === '3') {
                      return Object.keys(state).length -1;
                    } else {
                      return Object.keys(state).length -1;
                    }
                  }
              
              var RowSize = getRowSize(destination.droppableId, this.state.rows)

              for(let i =RowSize ; i >  parseInt(destination.droppableId) ; i--){
               
                let row =  data['rows'][i-1]
                let rowCols = Array.from(row.columnIds)
             
                let lastColId = rowCols.slice(-1)[0]
             
                rowCols.splice(-1,1)
                let nextRow  = data['rows'][i]
                let nextRowIds = Array.from(nextRow.columnIds)
                nextRowIds.splice(0,0,lastColId)
           
               
                if(i !== RowSize){
                    nextRowIds.splice(-1,1)
                }
                
                data['rows'][i]['columnIds'] = nextRowIds
               
                
              }
              ColumnIds.splice(-1,1)
              data['rows'][destination.droppableId]['columnIds'] = ColumnIds
                
            }
            //check if last row is more then 3 to create new row
              
            let rowLenght = Object.keys(this.state.rows).length-2
            const  lastRow = this.state.rows[rowLenght+1]
            
            const lastRowColumnIds = Array.from(lastRow.columnIds)
            const position = (rowLenght+2).toString()
            let NewRow = { id : position, columnIds : []}
            if(lastRowColumnIds.length === 3 ){
              data['rows'][position] = NewRow
              data['rowOrder'].splice(parseInt(position),0,position)
            }
            var filteredOrderCreate = Object.values(data['rowOrder']).filter(function (el) {
                return el != null;
              });
            this.setState({
                ...this.state, 
                rows : data['rows'],
                rowOrder : filteredOrderCreate,
                columns : data['columns'] 
            }) 
           
           
        
          return ; 
        }

    
    const start = this.state.rows[source.droppableId];
    const finish = this.state.rows[destination.droppableId];
    //Dragging in rows
    if(start === finish){
      const newColumnIds = Array.from(start.columnIds);
        newColumnIds.splice(source.index,1)
        newColumnIds.splice(destination.index,0, draggableId);
        const newRow = {
          ...start,
          columnIds : newColumnIds
        }
        const newState = {
          ...this.state,
          rows : {
            ...this.state.rows,
            [newRow.id] : newRow,
          }
        }
        this.setState(newState)
        return;
    }

    
    //DRAGING BETWEEN ROWS
    const startColumnIds = Array.from(start.columnIds);
    startColumnIds.splice(source.index,1);
    const newStart ={
      ...start,
      columnIds : startColumnIds
    }
    const finishColumnIds = Array.from(finish.columnIds)
    finishColumnIds.splice(destination.index,0,draggableId)
    const newFinish ={
      ...finish,
      columnIds : finishColumnIds,
    }
    const newState = {
      ...this.state,
      rows : {
        ...this.state.rows,
        [newStart.id] : newStart,
        [newFinish.id] : newFinish,
      }
    }

    var size = Object.keys(this.state.rows).length -1  ;
    // ako draggamo placeholder iz gornjih redova u doljnji
    if((newFinish.columnIds.length >3 || size.toString() === newFinish.id.toString() )&& newStart.id < newFinish.id ){
        if(destination.index ===0){
        return;
    }
     
      const NewRows = []
     
      for(let i = parseInt(newStart.id); i < parseInt(newFinish.id); i++){

      
          let rows = this.state.rows[i+1]
         
          let firstPlaceHolder = Array.from(rows.columnIds)
          let firstCol = firstPlaceHolder.slice(0)[0]
       
          
          let nextRow  = this.state.rows[i]
          let nextRowColumnIds = Array.from(nextRow.columnIds)
          if(i ===1){
            nextRowColumnIds.splice(0,1);
            nextRowColumnIds.splice(2,0, firstCol)
           }
         
           else{
            nextRowColumnIds.splice(source.index,1);
            nextRowColumnIds.splice(2,0, firstCol)
           }
         
           
          
     
          let Row = {
            ...this.state.rows[i],
            columnIds : nextRowColumnIds
          }
        
          NewRows[i] = Row
         
        }

     
        finishColumnIds.splice(0, 1)
        
        const newF = {
          ...finish,
          columnIds : finishColumnIds
        }
        
      NewRows.push(newF)  

      
      let Ar = {...this.state.rows}
      let rows = Object.values(Ar)
      for(let i = parseInt(newStart.id) ; i <= parseInt(newFinish.id); i++){
        rows.splice(i, 1)
        rows.splice(i,0, NewRows[i])
      }
        let newState = {
          ...this.state,
          rows 
        }
    
  
        this.setState(newState)
        data['rows'] = rows

     
    return;
      }
  

       // ako draggamo placeholder iz doljnjih redova u gornji
    else if ((newFinish.columnIds.length >3  || newFinish.id ===`2`)  && newStart.id > newFinish.id){
      const NewRows = []
      if(destination.index ===3 || (destination.droppableId ==='2' && destination.index ===1 )){
         
        return;
    }
      for(let i = parseInt(newStart.id); i > parseInt(newFinish.id); i--){
     
        let rows = this.state.rows[i-1]
       
        let lastColumn = Array.from(rows.columnIds)
        let lastColumnID = lastColumn.slice(-1)[0]
     
        
        let nextRow  = this.state.rows[i]
        let nextRowColumnIds = Array.from(nextRow.columnIds)
       if( i === parseInt(newStart.id)){
            nextRowColumnIds.splice(source.index,1);
            nextRowColumnIds.splice(0,0, lastColumnID)
       }
        else{
            nextRowColumnIds.splice(-1,1);
            nextRowColumnIds.splice(0,0, lastColumnID)
        }
       

        
   
        let Row = {
          ...this.state.rows[i],
          columnIds : nextRowColumnIds
        }
      
        NewRows[i] = Row
       
      }
      
      finishColumnIds.splice(-1, 1)
        
      const newF = {
        ...finish,
        columnIds : finishColumnIds
      }
      var filtered = NewRows.filter(function (el) {
        return el != null;
      });
      
      filtered.unshift(newF)  
  
      
      let Ar = {...this.state.rows}
      let rows = Object.values(Ar)
      for(let i = 0 ; i < filtered.length; i++){
       
        rows.splice(filtered[i].id, 1)
        rows.splice(filtered[i].id,0, filtered[i])
      }
     
      let newState = {
        ...this.state,
        rows 
      }
      data['rows'] = rows

      this.setState(newState) 
    return;
    }
    this.setState(newState)
   
    }

    // creating elements
    else if(type === 'elements'){
       
        //create textarea 
        if (draggableId === 'text'){
            let newid =  parseInt(Object.keys(data['elements'])[Object.keys(data['elements']).length - 3])
            const elementId =(newid+1).toString()
            const text = {
                    text: ''
                }
            data["textarea"][elementId]= text
            this.setState({
                ...this.state,
                textarea : data["textarea"][elementId]
            })
            const dropID = destination.droppableId 
           
            let dictElement = {
              id: elementId,
              content: (
                <>
                  <div>
                    <button
                      onClick={(e) => {
                        this.removeElement(
                          e,
                          elementId,
                          dropID
                        );
                      }}
                      style={{
                        position: "relative",
                        width: "8%",
                        left: "90%",
                        fontSize: "8px",
                        borderRadius : '25px'
                      }}
                    >
                      X
                    </button>
                  </div>
                  <textarea
                    type="text"
                    name= ""
                    placeholder = 'Insert text here'
                    onChange={(e) =>{
                      this.handleChangeTextarea(e, elementId,dropID)}
                    }
                    style={{
                      height: "80%",
                      width: "100%",
                      resize: "none",
                      border: "none",
                    }}
                  ></textarea>
                </>
              ),
            };
            data['elements'][elementId] = dictElement
            data['columns'][destination.droppableId]['elementIds'].splice(destination.index,0,elementId)
     
            this.setState({
                ...this.state,
                columns :{
                    ...this.state.columns,
                    [destination.droppableId]:  data['columns'][destination.droppableId]
                },
                elements : {
                    ...this.state.elements,
                    [elementId] : data['elements'][elementId]
                },
            })
          
        }
        //creating image
        else if (draggableId === 'image'){
            let newid =  parseInt(Object.keys(data['elements'])[Object.keys(data['elements']).length - 3])
            const elementId =(newid+1).toString()

            const http = {
                http: ''
            }
            data["imageHttp"][elementId]= http
            this.setState({
                ...this.state,
                imageHttp : data["imageHttp"][elementId]
            })
            const dictElement = {
              id: elementId,

              content: (
                <>
                  <div>
                    <button
                      onClick={(e) => {
                        this.removeElement(
                          e,
                          elementId,
                          destination.droppableId
                        );
                      }}
                      style={{
                        position: "relative",
                        width: "8%",
                        left: "90%",
                        fontSize: "8px",
                        borderRadius : '25px'
                      }}
                    >
                      X
                    </button>
                  </div>
                  
                  <form  style={{
                      position: "relative",
                      width: "70%",
                      
                      left: "15%",
                    }}>
                  
                         <input
                        type="http"
                        placeholder='Paste Image http here'
                 
                        onChange={(e) =>{this.handle_image_http(e,elementId, destination.droppableId)}}
                        required={true}
                        className="form-control input-create"
                ></input>
                <button
                   type="submit"
                    style={{
                      position: "relative",
                      width: "70%",
                      left: "15%",
                      marginTop: "20px",
                      borderRadius : '25px'

                    }}
                    
                  >
                    Upload Image
                  </button>
            </form>
                </>
              ),
            };
            data['elements'][elementId] = dictElement
            data['columns'][destination.droppableId]['elementIds'].splice(destination.index,0,elementId)
        
            this.setState({
                ...this.state,
                columns :{
                    ...this.state.columns,
                    [destination.droppableId]:  data['columns'][destination.droppableId]
                },
                elements : {
                    ...this.state.elements,
                    [elementId]: data['elements'][elementId]
                },
                
            })
        }
     }
 

  }

  render(){
   
    
    return (<DragDropContext
        onDragEnd = {this.onDragEnd}
    >
        {this.state.rowOrder.map((rowId)=>{
        const row = this.state.rows[rowId];
        const columns = row.columnIds.map(colId => this.state.columns[colId])
    

        return <Row key = {row.id} row = {row} columns = {columns} elements = {this.state.elements} columnOrder = {this.state.columnOrder}/>
    })}
    </DragDropContext>)
  };
}


