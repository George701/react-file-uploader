import React from 'react'
import PropTypes from 'prop-types'

const UploadedFile = ({file}) => {
    console.log(typeof file);
    return(
        <div className="row mt-5 upload-block">
            <div className="col-md-6 m-auto upload-credentials">
                <h3 className="text-center">
                    {file.fileName}
                </h3>
            </div>
            <img src={file.filePath} alt="" className="upload-file"/>
        </div>
    )
};

UploadedFile.propTypes = {
    file: PropTypes.object.isRequired
};

export default UploadedFile;