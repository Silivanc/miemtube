import React from 'react';
import {useDropzone} from 'react-dropzone';
import './Dropzone.scss'

export default function Dropzone(props) {
    const { onFileSelect } = props;

    const onDrop = (acceptedFiles) => {
        if (acceptedFiles.length > 0) {
            onFileSelect(acceptedFiles[0]); // передаем первый файл в callback
        }
    };

    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({ onDrop });

    const files = acceptedFiles.map(file => (
        <li key={file.path}>
            {file.path} - {file.size} bytes
        </li>
    ));

    return (
        <section className="dropzone">
            <div {...getRootProps({ className: 'dropzone-input' })}>
                <input
                    {...getInputProps({accept: 'video/mp4',})}
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
