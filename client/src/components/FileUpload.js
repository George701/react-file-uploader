import React, {Fragment, useState} from 'react';
import Message from './Message';
import Progress from './Progress';
import UploadedFile from './UploadedFile';
import axios from 'axios';

const FileUpload = () => {
    const [file, setFile] = useState('');
    const [filename, setFilename] = useState('Choose File');
    const [uploadedFile, setUploadedFile] = useState({});
    const [message, setMessage] = useState('');
    const [uploadPercentage, setUploadPercentage] = useState(0);

    const onChange = e => {
        setFile(e.target.files[0]);
        setFilename(e.target.files[0].name)
    };

    const onSubmit = async e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try{
            const res = await axios.post('/uploads', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                onUploadProgress: progressEvent => {
                    setUploadPercentage(
                        parseInt(
                            Math.round((progressEvent.loaded * 100) / progressEvent.total)
                        )
                    );

                    // Clear percentage
                    setTimeout(() => setUploadPercentage(0), 10000);
                }
            });

            const { fileName, filePath } = res.data;

            setUploadedFile({ fileName, filePath});
            setMessage('File Uploaded');
        }catch(err){
            if(err.response.status === 500){
                setMessage('There was a problem with the server')
            }else{
                setMessage(err.response.data.msg)
            }
        }
    };

    return (
        <Fragment>
            {message ? <Message msg={message}/> : null}
            <form onSubmit={onSubmit} className="form-bot">
                <div className="custom-file mb-4">
                    <input type="file" className="custom-file-input" id="customFile" onChange={onChange}/>
                    <label className="custom-file-label" htmlFor="customFile">{filename}</label>
                </div>

                <Progress percentage={uploadPercentage}/>

                <button type="submit" className="btn-upload mt-4">
                    <i className="fas fa-upload fa-4x"/>
                </button>
            </form>

            {uploadedFile ? <UploadedFile file={uploadedFile}/> : null }

        </Fragment>
    )
};

export default FileUpload;