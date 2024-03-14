import React, { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';
import "/src/assets/styles/filemanager.css";
import { useNavigate } from 'react-router-dom';

interface FileListProps { }

interface FileResponse {
    data: File[];
}
interface File {
    type: string;
    name: string;
    path: string;
    lastModified: string;
    size: number;
    isFile: boolean;
    isDirectory: boolean;
}

function logout(navigate: any) {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login', { replace: true });
}

const FileManager: React.FC<FileListProps> = () => {
    const navigate = useNavigate();
    const [files, setFiles] = useState<File[]>([]);

    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response: FileResponse = await api.files.allFiles();
                setFiles(response.data);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);
    //TODO: fix downloading
    const handleDownload = async (fileName: string) => {
        try {
            const response = await api.files.downloadFile(fileName);

            const blob = new Blob([response.data], { type: response.headers['content-type'] });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', fileName);

            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    return (
        <div className="container">
            <div className="upper_div">
                <span className="upper_info">
                    {localStorage.getItem('username')} <br />
                    <a className='upper_control_button'
                        onClick={() => navigate('/account', { replace: false })}>Settings
                    </a>
                    <br />
                    <a className='upper_control_button'
                        onClick={() => logout(navigate)}>Log out
                    </a>
                </span>
            </div>
            <div className="search_div">
                <input type="text" className="search_bar" placeholder='Search' />
                <button className="search_button">Search</button>
            </div>

            <div className="files_div">
                <table className='files_table'>
                    <thead className='columns_head'>
                        <tr>
                            <th>Type</th>
                            <th>Name</th>
                            <th>Last Modified</th>
                            <th>Path</th>
                            <th>Size</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className='columns_body'>
                        {
                        files.map((file, index) => (
                            <tr key={index} className='files_table_inner'>
                                <td>
                                    {file.isDirectory === true ?
                                        <img src="src/img/folder.svg" alt="Folder" className="row_icon" />
                                        : <img src="src/img/file.svg" alt="File" className="row_icon" />}

                                </td>
                                <td>{file.name}</td>
                                <td>{file.lastModified}</td>
                                <td>{file.path}</td>
                                <td>{file.size}</td>
                                <td>
                                    {file.isDirectory !== true ?
                                        <a onClick={() => handleDownload(file.name)} className='download_button'>Download</a>
                                        : null}
                                </td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );

};


export default FileManager;
