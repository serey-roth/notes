import Form from './components/Form'
import Notes from './components/notes/Notes';

function App() {
    return (
        <div
        style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
        }}>
            <Notes />
            <Form />
        </div>
    )
}

export default App
