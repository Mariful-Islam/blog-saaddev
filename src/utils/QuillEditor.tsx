import React, { useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
// import './QuillEditor.css'; // Import custom CSS for further customization

interface QuillEditorProps {
    value: string;
    onChange: (content: string) => void;
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

    // useEffect(() => {
    //     if (quillRef.current) {
    //         const quill = quillRef.current.getEditor();
    //         console.log(quill)
    //         // Access the Quill instance if needed
    //     }
    // }, []);

    return (
        <div className="my-4">
            <ReactQuill
                ref={quillRef}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                theme="snow"
                className={`h-64 rounded-md shadow-sm ${className}`}
                modules={modules}
            />
        </div>
    );
};

export default QuillEditor;
