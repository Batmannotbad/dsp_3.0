import React from 'react'
import { useSelector } from 'react-redux';
import { downloadAllFiles, downloadFile } from './APIController';

const Test2 = () => {
    const token = useSelector(state => state.user.token);
    const boxId = 41;

    const handleDownload = async () => {
        try {
            const downloadData = await downloadFile(token, boxId);
            console.log('Download Data:', downloadData);
        }catch{

        }}
        handleDownload();
  return (
    <div>
      
    </div>
  )
}

export default Test2;
