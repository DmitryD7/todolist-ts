import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type AddItemFormPropsType = {
    addItem: (title: string) => void,
}

function AddItemForm(props: AddItemFormPropsType) {

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
        setError(null);
    };

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
    };

    return (
        <div>
            <input type="text"
                   value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? "error" : ""}
            />
            <button onClick={addItem}>+</button>
            {error && <div className={"error-message"}>{error}</div>}
        </div>
    )
}

export default AddItemForm;