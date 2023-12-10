import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Checkbox } from '@mui/material';
import { FileIcon, defaultStyles } from 'react-file-icon';
import { getFileExtension } from '../functions';
import { useSelector } from 'react-redux';
import { downloadAllFiles, downloadFile } from '../APIController';

const FileTable = ({ postFiles,boxId,token }) => {
  // const [selectedRows, setSelectedRows] = useState([]);

  

  const downloadAll = async () => {
    try {
      const downloadUrl = await downloadAllFiles(token, boxId);
      window.location.href = downloadUrl;
    } catch (error) {
      console.error('Error downloading files:', error);
    }
  };
 
  const handleDownloadClick = async (fileName) => {
    try {
      const { downloadUrl, sanitizedFileName } = await downloadFile(token, boxId, fileName);
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${fileName}`;
  
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      console.log('Suggested File Name2:', sanitizedFileName);
      console.log('Download URL:', downloadUrl);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };
  

  
  

  return (
    <div>
      {postFiles.length > 0 ? (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow >
                
                <TableCell>
                
                </TableCell>
                <TableCell>
                <button className='download-btn d-flex gap-2 align-items-center' onClick={downloadAll}>
                    <img src="/img/interface-download-circle--arrow-circle-down-download-internet-network-server-upload.png" alt="" />
                    Tải xuống
                  </button>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {postFiles.map((file) => (
                <TableRow key={file.id} style={{ marginBottom: '10px' }}>
                 
                  <TableCell className='view-icon'>
                    <div style={{ width: '30px', height: '30px' }}>
                      <FileIcon color='#f3e0e0' extension={getFileExtension(file.name)} {...defaultStyles} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <a href="/" title={file.name}>
                      {file.name}
                    </a>
                  </TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>
                    <button className='download-one-btn'>
                      <img src="/img/upload.png" alt="download" onClick={() => handleDownloadClick(file.name)} />
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <p>Bài viết chưa có tài liệu nào</p>
      )}
    </div>
  );
};

export default FileTable;
