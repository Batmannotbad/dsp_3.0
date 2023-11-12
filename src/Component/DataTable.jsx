import React, { useEffect, useState } from 'react';
import { getBoxsCurrentUser } from '../APIController';
import { useSelector } from 'react-redux';

const DataTable = () => {
  const token = useSelector((state) => state.user.token);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 5;

  useEffect(() => {
    const fetchBoxsCurrentUser = async () => {
      try {
        const data = await getBoxsCurrentUser(token);
        setUserPosts(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchBoxsCurrentUser();
  }, [token]);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = userPosts.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <table className="table">
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id}>
              <td className='data-img align-middle'>
                <img
                  src={`http://localhost:5296/${post.img}`}
                  alt='post banner'
                  className='banner-img'
                />
              </td>
              <td className='data-title align-middle'>{post.title}</td>
              <td className='data-date align-middle'>{post.dateCreated.split('T')[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="pagination">
        {Array.from({ length: Math.ceil(userPosts.length / postsPerPage) }).map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button onClick={() => paginate(index + 1)} className="page-link">
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataTable;
