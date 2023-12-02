import React, { useState } from 'react';
import { Button } from 'reactstrap';
import "./style.css"

const UserRow = ({ user, onEdit, onDelete, onSelect, style }) => {
  const { id, name, email, role, selected } = user;
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({ name, email, role });

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setIsEditing(false);
    onEdit(id, editedData); 
  };

  const handleInputChange = (e, field) => {
    setEditedData({ ...editedData, [field]: e.target.value });
  };

  return (
    <tr key={id} style={style}>
      <td>
        <input type="checkbox" checked={selected} onChange={() => onSelect(id)} />
      </td>
      <td>
        {isEditing ? (
          <input type="text" value={editedData.name} onChange={(e) => handleInputChange(e, 'name')} />
        ) : (
          <span>{name}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="text" value={editedData.email} onChange={(e) => handleInputChange(e, 'email')} />
        ) : (
          <span>{email}</span>
        )}
      </td>
      <td>
        {isEditing ? (
          <input type="text" value={editedData.role} onChange={(e) => handleInputChange(e, 'role')} />
        ) : (
          <span>{role}</span>
        )}
      </td>
      <td className='action-buttons'>
        {isEditing ? (
          <Button onClick={handleSaveClick} className='save' color="success" size="sm" outline>Save</Button>
        ) : (
          <Button onClick={handleEditClick} className='edit' size="sm" outline>Edit</Button>
        )}
        <Button onClick={() => onDelete(id)} className='delete' color="danger" size="sm" outline>Delete</Button>
      </td>
    </tr>
  );
};

export default UserRow;
