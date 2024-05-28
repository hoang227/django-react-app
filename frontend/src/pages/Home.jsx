import { useState, useEffect } from 'react'
import api from '../api'
import Note from '../components/Note'
import '../styles/Home.css'

const Home = () => {
	const [notes, setNotes] = useState([])
	const [content, setContent] = useState('')
	const [title, setTitle] = useState('')

	useEffect(() => {
		getNotes()
	}, [])

	const getNotes = () => {
		api
			.get('/api/notes/')
			.then((res) => res.data)
			.then((data) => {
				setNotes(data)
				console.log(data)
			})
			.catch((err) => alert(err))
	}

	const deleteNote = (id) => {
		api
			.delete(`/api/notes/delete/${id}/`)
			.then((res) => {
				if (res.status === 204) alert('note deleted')
				else alert('failed to delete note')
				getNotes()
			})
			.catch((err) => alert(err))
	}

	const createNote = (e) => {
		e.preventDefault()
		api
			.post('/api/notes/', { content, title })
			.then((res) => {
				if (res.status === 201) alert('note created')
				else alert('failed to create note')
				getNotes()
			})
			.catch((err) => alert(err))
	}

	return (
		<div>
			<div>
				<h2>Notes</h2>
				{notes.map((note) => (
					<Note note={note} onDelete={deleteNote} key={note.id} />
				))}
			</div>
			<h2>Create a Note</h2>
			<form onSubmit={createNote}>
				<label htmlFor='title'>Title:</label>
				<br />
				<input
					type='text'
					id='title'
					name='title'
					required
					onChange={(e) => setTitle(e.target.value)}
					value={title}
				/>
				<label htmlFor='title'>Content:</label>
				<br />
				<textarea
					id='content'
					name='content'
					required
					onChange={(e) => setContent(e.target.value)}
					value={content}></textarea>
				<br />
				<input type='submit' value='Submit' />
			</form>
		</div>
	)
}

export default Home
