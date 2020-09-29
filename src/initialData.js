import React from 'react'



export const initialData = {
    elements : {
    'element-1' : {id : 'element-1', content : <div>'Some Text1'</div> },
    'element-2' : {id : 'element-2', content : 'Some Text2' },
    'element-3' : {id : 'element-3', content : 'Some Text3' },
    'element-4' : {id : 'element-4', content : 'Some Text4' },
    'element-5' : {id : 'element-5', content : 'Some Text5' },
    'element-6' : {id : 'element-6', content : 'Some Text6' },
    'element-7' : {id : 'element-7', content : 'Some Text7' },
    'element-8' : {id : 'element-8', content : 'Some Text8' },
  
},
    columns : {
        /*
        'column-1' :{
            id : 'column-1',
            title : 'NETGEN',
            elementIds : ['element-1'],
        },
        'column-2' :{
            id : 'column-2',
            title : 'NETGEN',
            elementIds : [ 'element-2', 'element-3', 'element-4'],
        },
        */
        'column-3' :{
            id : 'column-3',
            title : 'NETGEN',
            elementIds : ['element-5', 'element-6', 'element-7', 'element-8'],
        }
    },
    columnOrder : [ 'column-3'],

}

export default initialData