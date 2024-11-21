import React from 'react';
import {useDropzone} from 'react-dropzone';
import './Dropzone.scss'

export default function Dropzone(props) {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone();
    const { onFileSelect } = props;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        onFileSelect(file);  // вызываем переданный callback
    };

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="dropzone">
            <div {...getRootProps({ className: 'dropzone-input' })}>
                <input
                    {...getInputProps()}
                    onChange={handleFileSelect}  // используем нашу функцию
                />
                <p>Загрузить файл</p>
                <aside className="dropzone-file">
                    <h4>File</h4>
                    <ul>{files}</ul>
                </aside>
            </div>
        </section>
    );
}
