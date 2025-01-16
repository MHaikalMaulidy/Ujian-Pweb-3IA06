import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [nama, setNama] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

  const [selectUser, setSelectUser] = useState(null);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost/api-myapp/users.php')
      setUsers(response.data);
    } catch (error) {
      console.log(error)
      alert('Terjadi kesalahan dalam mengakses URL lokal. Mohon pastikan XAMPP telah dijalankan.');
    }
  }

  const addData = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost/api-myapp/users.php', {
        nama: nama,
        username: username,
        email: email
      })
      const newData = response.data;
      setUsers(prevUser => [...prevUser, newData]);
      setNama('')
      setUsername('')
      setEmail('')

      alert("Data berhasil ditambahkan!")
    } catch (error) {
      console.log(error)
    }
  }

  const updateData = async (id) => {
    try {
      await axios.put(`http://localhost/api-myapp/users.php?id=${id}`, {
        nama: nama,
        username: username,
        email: email
      })

      fetchData()
      setSelectUser(null)
      setNama('')
      setUsername('')
      setEmail('')

      alert("Data berhasil diupdate!")
    } catch (error) {
      console.log(error)
    }
  }

  const handleSelectUser = (user) => {
    setSelectUser(user)
    setNama(user ? user.nama : '')
    setUsername(user ? user.username : '')
    setEmail(user ? user.email : '')
  }
  const handleDelete = (id) => {
    const confirm = window.confirm('yakin ingin hapus data ini?');

    if (confirm) {
      confirmDelete(id)
    }
  }

  const confirmDelete = async (id) => {
    try {
      await axios.delete(`http://localhost/api-myapp/users.php?id=${id}`)
      fetchData();
      alert("Data berhasil didelete!")
    } catch (error) {
      console.log(error)
    }
  }

  return (
<div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
  <div style={{ maxWidth: '800px', width: '100%' }}>
    {selectUser ? (
      <div style={{ display: 'flex', flexDirection: 'column', margin: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ textAlign: 'center', color: '#333' }}>Update Data</h3>
        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Nama</label>
        <input type='text' value={nama} onChange={(e) => setNama(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Email</label>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button onClick={() => updateData(selectUser.id)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Simpan Perubahan</button>
          <button onClick={() => handleSelectUser(null)} style={{ backgroundColor: '#f44336', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}>Cancel</button>
        </div>
      </div>
    ) : (
      <form onSubmit={addData} style={{ display: 'flex', flexDirection: 'column', margin: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h3 style={{ textAlign: 'center', color: '#333' }}>Tambah Data</h3>
        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Nama</label>
        <input type='text' value={nama} onChange={(e) => setNama(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Username</label>
        <input type='text' value={username} onChange={(e) => setUsername(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />

        <label style={{ marginBottom: '8px', fontWeight: '600' }}>Email</label>
        <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} style={{ padding: '10px', marginBottom: '15px', borderRadius: '4px', border: '1px solid #ccc' }} />
        
        <button type='submit' style={{ backgroundColor: '#008CBA', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontWeight: 'bold', marginTop: '15px' }}>Simpan</button>
      </form>
    )}

    <table style={{ width: '100%', marginTop: '30px', borderCollapse: 'collapse' }} border={1}>
      <thead>
        <tr style={{ backgroundColor: '#f2f2f2' }}>
          <th style={{ padding: '10px', textAlign: 'center' }}>No</th>
          <th style={{ padding: '10px', textAlign: 'center' }}>Nama</th>
          <th style={{ padding: '10px', textAlign: 'center' }}>Username</th>
          <th style={{ padding: '10px', textAlign: 'center' }}>Email</th>
          <th style={{ padding: '10px', textAlign: 'center' }}>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, nomr) => (
          <tr key={user.id}>
            <td style={{ textAlign: 'center', padding: '10px' }}>{nomr + 1}</td>
            <td style={{ textAlign: 'center', padding: '10px' }}>{user.nama}</td>
            <td style={{ textAlign: 'center', padding: '10px' }}>{user.username}</td>
            <td style={{ textAlign: 'center', padding: '10px' }}>{user.email}</td>
            <td style={{ textAlign: 'center', padding: '10px' }}>
              <button onClick={() => handleSelectUser(user)} style={{ backgroundColor: '#4CAF50', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '12px', margin: '0 5px' }}>Update</button>
              <button onClick={() => handleDelete(user.id)} style={{ backgroundColor: '#f44336', color: 'white', padding: '5px 10px', borderRadius: '5px', border: 'none', cursor: 'pointer', fontSize: '12px', margin: '0 5px' }}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  );
}

export default App;