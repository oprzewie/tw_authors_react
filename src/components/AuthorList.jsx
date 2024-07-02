export const AuthorsList = ({ authors = [], onDelete, onEdit }) => (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Surname</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {authors.map((author) => (
          <tr key={author.id}>
            <td>{author.id}</td>
            <td>{author.name}</td>
            <td>{author.surname}</td>
            <td>
              <button onClick={() => onDelete(author.id)}>Delete</button>
              <button onClick={() => onEdit(author.id)}>Edit</button>

            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
  
  