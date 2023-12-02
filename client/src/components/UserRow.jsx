import React, { useState } from 'react';

const UserRow = ({ user, onEdit, onDelete, onSelect }) => {
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
    <tr key={id} style={{ backgroundColor: selected ? '#f0f0f0' : 'transparent' }}>
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
      <td>
        {isEditing ? (
          <button onClick={handleSaveClick}>Save</button>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </td>
      <td>
        <button onClick={() => onDelete(id)}>Delete</button>
      </td>
    </tr>
  );
};

export default UserRow;
