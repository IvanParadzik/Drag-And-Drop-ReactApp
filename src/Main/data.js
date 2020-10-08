//import React from 'react'



export const data = {
    elements : {

    'text': {id : 'text' , content : 'Text'},
    'image': {id : 'image' , content : 'Image'},
   
    '1' : {id : '1', content : 'Insert Here'},
    '2' : {id : '2', content : 'Some Text2' },
    '3' : {id : '3', content : 'Some Text3' },
    '4' : {id : '4', content : 'Some Text4' },
    '5' : {id : '5', content : 'Some Text5' },
    '6' : {id : '6', content : 'Some Text6' },
    '7' : {id : '7', content : 'Some Text7' },
    '8' : {id : '8', content : 'Some Text8' },
    '9' : {id : '9', content : 'Some Text9' },
    '10' : {id : '10', content : 'Some Text10' },
    '11' : {id : '11', content : 'Some Text11' },
    
  
},

    textarea : {
        
    },
    imageHttp : {

    },
    columns : {
     
        'col-1': {
            id : 'col-1',
            name: 'Placeholder',
            elementIds: []
        },
        'col-2' : {
            id : 'col-2',
            name: '',
            elementIds: ['text','image']

        },
    
    
        
    },


    rows : {
      
        '0' : {
            id: '0',
            columnIds : ['col-1', 'col-2']
        },
        '1' : {
            id : '1',
            columnIds : []
        },

        '2' : {
            id: '2',
            columnIds : []
        },
     
    },


    rowOrder : ['0','1','2'],

}

export default data