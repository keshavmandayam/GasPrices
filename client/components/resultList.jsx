import React from 'react';

function ResultList(props) {
  const stations = props.list.map(stations => (
    <li>{`$${stations.reg_price} at the ${stations.station} on ${
      stations.address
    } located ${stations.distance} away`}</li>
  ));
  return (
    <div>
      <ul>{stations}</ul>
    </div>
  );
}

export default ResultList;
