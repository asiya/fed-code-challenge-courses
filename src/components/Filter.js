import React,{innerRef} from 'react';
import {
    InputGroup,
    Input,
    Button,
   } from 'reactstrap';

function Filter ({filterCallback}){
    var inputEl ='';

    const searchList = () =>{
        filterCallback(inputEl.value)
    }

    return (
        <div>
            <InputGroup>
        <Input  type= "text" innerRef={element => inputEl = element}/>
        <Button onClick = {searchList}>Search</Button>

      </InputGroup>
        </div>
    )
}

export default Filter;
