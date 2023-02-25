import React from 'react';

const DataItem = ({data, onEdit, onDelete}) => (
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      {(
        data.map(user => (
          <tr key={user.name}>
            <td>{user.name}</td>
            <td>{user.age}</td>
            <td>
              <button onClick={() => onEdit(user)}>Edit</button>
              <button onClick={() => onDelete(user)}>Delete</button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>        
);


export default DataItem;