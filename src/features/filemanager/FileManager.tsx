// FileManager.tsx

import React, { useEffect, useState } from 'react';
import { api } from '../../app/api/ApiConfig';
import "/src/assets/styles/filemanager.css";
import folderIcon from "/src/img/folder.svg";
import fileIcon from "/src/img/file.svg";
import uploadIcon from "/src/img/upload-icon.svg";
import { useNavigate } from 'react-router-dom';

interface FileListProps { }

interface File {
    type: string;
    name: string;
    path: string;
    lastModified: string;
    size: string | null;
    file: boolean;
    directory: boolean;
}

const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('refreshToken');
    window.location.reload();
};

const FileManager: React.FC<FileListProps> = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
    const [isError, setIsError] = useState<boolean>(false);
    const [currentPath, setCurrentPath] = useState<string>('/');
    const navigate = useNavigate();

    useEffect(() => {
        fetchFiles(currentPath);
    }, [currentPath]);

    const fetchFiles = async (path: string) => {
        try {
            if (path === '/') {
                const response = await api.files.allFiles();
                setFiles(response.data);
                return;
            }
            const response = await api.files.infoByPath(path);
            setFiles(response.data);
        } catch (error) {
            console.error('Error fetching files:', error);
        }
    };

    const handleDownload = async (fileName: string) => {
        try {
            const response = await api.files.downloadFile(fileName);
            const blob = new Blob([response.data], { type: response.data.type });
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

    const handleUpload = async () => {
        const fileInput = document.getElementById('file_upload') as HTMLInputElement;
        if (fileInput?.files?.length) {
            try {
                const response = await api.files.uploadFiles(fileInput.files);
                if (response.status === 200) {
                    fetchFiles(currentPath);
                } else {
                    console.error('File upload failed');
                }
            } catch (error) {
                console.error('Error uploading file:', error);
            }
        } else {
            console.error('No file selected');
        }
    };

    const handleSearch = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            if (searchQuery.trim() === '') {
                fetchFiles(currentPath);
                setIsError(false);
                return;
            }
            const response = await api.files.filesSearch(searchQuery);
            setFiles(response.data);
            setIsError(response.data.length === 0);
        } catch (error) {
            console.error('Error searching files:', error);
            setIsError(true);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            // @ts-ignore
            setSelectedFiles(Array.from(e.target.files));
        }
    };

    const handleFolderClick = (path: string) => {
        if (currentPath !== '/') {
            setCurrentPath(currentPath + '/' + path);
            return;
        }
        setCurrentPath(path);
    };

    const handleBackClick = () => {
        const pathParts = currentPath.split('/').filter(part => part);
        pathParts.pop();
        const newPath = '/' + pathParts.join('/');
        setCurrentPath(newPath || '/');
    };

    return (
        <div className="container">
            <div className="upper_div">
                <span className="upper_info">
                    {localStorage.getItem('username')} <br />
                    <a className='upper_control_button' onClick={() => navigate('/account')}>Settings</a><br />
                    <a className='upper_control_button' onClick={logout}>Log out</a>
                </span>
            </div>
            <div className="search_div">
                <form onSubmit={handleSearch} className='search_form'>
                    <input
                        type="text"
                        className="search_bar"
                        placeholder='Search'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <button className="search_button" type='submit'>Search</button>
                </form>
            </div>
            {isError && <div className='search_error'>
                <span className='search_error_text'>No files were found</span>
            </div>}
            <div className='upload_div'>
                <label htmlFor="file_upload" className="file_upload_label">Upload files</label>
                <input
                    type="file"
                    id="file_upload"
                    className="upload_input"
                    onChange={handleFileChange}
                    multiple
                />
                <img className="upload_icon" src={uploadIcon} alt='upload' onClick={handleUpload} />
                <div className="selected_files">
                    {selectedFiles.map((file, index) => (
                        <div key={index} className="selected_file">{file.name}</div>
                    ))}
                </div>
            </div>
            {currentPath !== '/' && (
                <div className='back_button_div'>
                    <button className='back_button' onClick={handleBackClick}>Back</button>
                </div>
            )}
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
                        {files.map((file, index) => (
                            <tr
                                key={index}
                                className={`files_table_inner ${file.directory ? 'folder_row' : ''}`}
                                onClick={() => file.directory && handleFolderClick(file.name)}
                            >
                                <td>
                                    {file.directory ?
                                        <img src={folderIcon} alt="Folder" className="row_icon" />
                                        : <img src={fileIcon} alt="File" className="row_icon" />
                                    }
                                </td>
                                <td>{file.name}</td>
                                <td>{file.lastModified}</td>
                                <td>{file.path}</td>
                                <td>{file.size ?? ''}</td>
                                <td>
                                    {!file.directory && (
                                        <a onClick={() => handleDownload(file.path)} className='download_button'>Download</a>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default FileManager;
