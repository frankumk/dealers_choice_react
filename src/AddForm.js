import React from 'react';

const AddForm = () => {
    return (
        <div id='add'>
            <form id='add-form'>
                <label>Add Birthday:
                    <input id='add-friend' type ='text' name='add-friend' placeholder = "name"></input>
                    <input id='new-birthday' type='text' name='new-birthday' placeholder = "mm/dd/yyyy"></input>
                    <input id='submit' type='submit' value='+' />
                </label>
            </form>
        </div>

    )
}

export default AddForm