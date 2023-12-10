export const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = date.getDate();
    const month = date.getMonth() + 1; 
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Chuyển đổi giờ thành định dạng 12 giờ
  
    // Định dạng lại ngày tháng và giờ
    const formattedDate = `${day}/${month}/${year} ${formattedHours}:${String(minutes).padStart(2, '0')} ${period}`;
  
    return formattedDate;
  };
  
  export const getFileExtension = (fileName) => {
    const lastDotIndex = fileName.lastIndexOf('.');
    if (lastDotIndex !== -1) {
      return fileName.substring(lastDotIndex + 1);
    }
    return 'txt';
  };
  