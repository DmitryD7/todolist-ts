import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from '@material-ui/icons';


type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

export const AddItemForm = React.memo((props: AddItemFormPropsType) => {
    console.log('ADD ITEM FORM')
    let [title, setTitle] = useState<string>("");
    let [error, setError] = useState<string | null>(null);

    const addItem = () => {
        if (title.trim() !== "") {
            props.addItem(title);
        } else {
            setError("Field is required!")
        }
        setTitle("");
    };

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (error !== null) {
            setError(null)
        }
        if (e.charCode === 13) {
            addItem()
        }
    };

    return (
        <div onBlur={() => setError(null)}>
            <TextField
                variant={"outlined"}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                label={"Title"}
                helperText={error}
            />
            <IconButton
                onClick={addItem}
                color={"primary"}
            >
                <AddBox/>
            </IconButton>
        </div>
    )
})