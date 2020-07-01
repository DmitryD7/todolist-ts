import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string,
    setNewTitle: (newTitle: string) => void,
};

function EditableSpan(props: EditableSpanType) {

    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.title)

    const activateEditMode = () => {
        setEditMode(true);
    };
    const deactivateEditMode = () => {
        setEditMode(false);
        props.setNewTitle(title);
    };

    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return (
        editMode
            ? <input
                value={title}
                onBlur={deactivateEditMode}
                autoFocus
                onChange={changeTitle}
            />
            : <span onDoubleClick={activateEditMode}>{props.title}</span>
    );
};

export default EditableSpan;