import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './QuillEditor.css'; // Import custom CSS for further customization

interface QuillEditorProps {
    value: string;
    onChange: (description: string) => void;
    placeholder?: string;
    className?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, placeholder, className }) => {
    const quillRef = useRef<ReactQuill | null>(null);

    const modules = {
        toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image'],
            ['clean']
        ],
    };

    return (
        <div className="w-full">
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                className={`rounded-md shadow-sm ${className}`}
                modules={modules}
            />
        </div>
    );
};

export default QuillEditor;
