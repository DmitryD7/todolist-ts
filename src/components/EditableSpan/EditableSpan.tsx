import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanType = {
    title: string,
    setNewTitle: (newTitle: string) => void,
    disabled?: boolean
};

export const EditableSpan = React.memo(({disabled = false, ...props}: EditableSpanType) => {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        !disabled && setEditMode(true);
    };
    const deactivateEditMode = () => {
        if (title.trim()) {
            props.setNewTitle(title);
        } else {
            setTitle(props.title)
        }
        setEditMode(false);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <TextField
                variant={"standard"}
                value={title}
                onBlur={deactivateEditMode}
                autoFocus
                onChange={changeTitle}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
});