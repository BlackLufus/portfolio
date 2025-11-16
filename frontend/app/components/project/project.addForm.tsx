import { createProject } from "@/services/createProject";
import { useRef, useState } from "react";

export interface ProjectFormData {
    pop: () => void
}

export default function AddProjectForm( { pop }: ProjectFormData) {

    const titleRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLTextAreaElement>(null);
    const categorieRef = useRef<HTMLInputElement>(null);
    const labelRef = useRef<HTMLInputElement>(null);
    const featureRef = useRef<HTMLInputElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    const [resultText, setResultText] = useState('')
    const [labels, setLabel] = useState(["Test"]);
    const [features, setFeature] = useState(["Test"]);
    const [file, setFile] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const form = e.currentTarget;
        const formData = new FormData(form);
        const imageFile = formData.get('image');
        console.log("Form submitted!");

        try {
            if (
                formData.get('title') === '' ||
                form.checkValidity() === false
            ) {
                setResultText('Bitte gib einen Titel ein.')
            } else if (
                formData.get('description') === '' ||
                form.checkValidity() === false
            ) {
                setResultText('Bitte gib eine Beschreibung ein.')
            } else if (
                formData.get('categorie') === '' ||
                form.checkValidity() === false
            ) {
                setResultText('Bitte gib eine Kategorie ein.')
            } else if (
                !imageFile || 
                (imageFile instanceof File &&
                    (imageFile.type !== "image/png" && 
                    imageFile.type !== "image/jpeg" ||
                    imageFile.size === 0))
            ) {
                setResultText('Bitte Lade ein Bild hoch.')
            }
            else {
                const result = await createProject<{
                    succeed: boolean
                }>(formData);
                if (result.succeed) {
                    setResultText('Projekt erfolgreich hinzugefügt.')
                    pop();
                }
                else {
                    setResultText('Material konnte nicht hinzugefügt werden.')
                }
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    const handleLabelRemoveClick = (index: number) => {
        console.log(index)
        setLabel(prevLabels => prevLabels.filter((_, i) => i !== index));
    }

    const handleFeatureRemoveClick = (index: number) => {
        setFeature(prevFeatures => prevFeatures.filter((_, i) => i !== index));
    }

    const handleLabelClick = () => {
        const value = labelRef.current!.value
        if (value == "") return;
        setLabel([...labels, value])
        labelRef.current!.value = ""
    }

    const handleFeatureClick = () => {
        const value = featureRef.current!.value
        if (value == "") return;
        setFeature([...features, value])
        featureRef.current!.value = ""
    }

    const handleFileClick = () => {
        const value = fileRef.current!.value
        if (value == "") return;
        console.log(value.substring(value.lastIndexOf('\\') + 1));
        setFile(`.../${value.substring(value.lastIndexOf('\\') + 1)}`)
    }

    return(
        <div className="form">
            <div className="form_wrapper">
                <div className="form_border_top"></div>
                <form 
                    action="POST"
                    onSubmit={handleSubmit}
                    className="form_handler"
                >
                    <div className="form_title_container">
                        <span className="form_title">
                            Add Project
                        </span>
                    </div>
                    <div className="form_result_text_container">
                        <span className="form_result_text">
                            {resultText}
                        </span>
                    </div>
                    <div className="form_content">
                        <div className="form_content_left">
                            <label className="form_label" htmlFor="title">Title</label>
                            <input ref={titleRef} className="form_input" type="text" id="title" name="title" />
                            <label className="form_label" htmlFor="description">Description</label>
                            <textarea ref={descriptionRef} className="form_textarea" id="description" name="description" />
                            <label className="form_label" htmlFor="categorie">Categorie</label>
                            <input ref={categorieRef} className="form_input" type="text" id="categorie" name="categorie" />
                            <label className="form_label" htmlFor="labels">Labels</label>
                            <ul className="form_ulist">
                                {
                                    labels.map((label, index) => (
                                        <li
                                            key={index}
                                            className="form_item"
                                            onClick={() => {
                                                handleLabelRemoveClick(index)
                                            }}>
                                            <span>
                                                {label}
                                            </span>
                                        </li>
                                    ))
                                }
                                <li className="form_item">
                                    <input
                                        ref={labelRef}
                                        className="form_item_input"
                                        type="text" />
                                    <button 
                                        className="form_item_input_accept"
                                        onClick={handleLabelClick} />
                                </li>
                            </ul>
                            <label className="form_label" htmlFor="features">Features</label>
                            <ul className="form_ulist">
                                {
                                    features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="form_item"
                                            onClick={() => {
                                                handleFeatureRemoveClick(index)
                                            }}>
                                            <span>
                                                {feature}
                                            </span>
                                        </li>
                                    ))
                                }
                                <li className="form_item">
                                    <input 
                                        ref={featureRef}
                                        className="form_item_input" 
                                        type="text" />
                                    <button 
                                        className="form_item_input_accept"
                                        onClick={handleFeatureClick} />
                                </li>
                            </ul>
                        </div>
                        <div className="form_content_right">
                            <label className="form_label">Image</label>
                            <div className="form_upload_image">
                                <label className="form_upload_input_label" htmlFor="image">
                                    Search...
                                    <input ref={fileRef} className="form_upload_input" id="image" name="image" type="file" onInput={handleFileClick} />
                                </label>
                                <label className="form_upload_selected_file" htmlFor="">
                                    {file}
                                </label>
                            </div>
                            <div className="form_checkbox_container">
                                <label className="form_checkbox" htmlFor="">
                                    Private
                                </label>
                                <input type="checkbox" />
                            </div>
                            <div className="form_buttons">
                                <button 
                                    type="button"
                                    className="form_button"
                                    onClick={() => {
                                        pop();
                                    }}>
                                    Cancel
                                </button>
                                <button className="form_button">
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}