import React from 'react';
import PostForm from './postForm.jsx';

function ResultList(props) {
  const stations = props.list.map((stations, i) => {
    if (stations.reg_price !== 'N/A' && i < 9)
      return (
        <li>
          <a href="#">
            <PostForm
              data={props.list}
              lastQuery={props.lastQuery}
              showModal={props.showModal}
              handleOpenModal={props.handleOpenModal}
              handleCloseModal={props.handleCloseModal}
              string={`$${stations.reg_price} at the ${stations.station} on ${
                stations.address
              } located ${stations.distance} away`}
            />
          </a>
        </li>
      );
  });
  return (
    <div className="list" className="list-type2">
      <ol>{stations}</ol>
    </div>
  );
}

export default ResultList;
