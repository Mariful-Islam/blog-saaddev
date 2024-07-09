import React, { useRef, useEffect } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './QuillEditor.css'; // Import custom CSS for further customization

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
    placeholder?: string;
}

const QuillEditor: React.FC<QuillEditorProps> = ({ value, onChange, placeholder }) => {
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

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            // Access the Quill instance if needed
        }
    }, []);

    return (
        <div className="my-4">
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                className="bg-white border border-gray-300 rounded-md shadow-sm"
                modules={modules}
            />
        </div>
    );
};

export default QuillEditor;
