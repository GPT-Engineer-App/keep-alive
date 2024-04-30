import { useState } from 'react';
import { Box, Button, Flex, Input, Textarea, useToast, SimpleGrid } from '@chakra-ui/react';
import { FaPlus, FaTrash, FaEdit } from 'react-icons/fa';

const Note = ({ note, onDelete, onEdit }) => (
  <Box p={4} boxShadow="md" borderRadius="lg">
    <Input value={note.title} onChange={(e) => onEdit(note.id, { ...note, title: e.target.value })} mb={2} />
    <Textarea value={note.content} onChange={(e) => onEdit(note.id, { ...note, content: e.target.value })} />
    <Button leftIcon={<FaTrash />} colorScheme="red" onClick={() => onDelete(note.id)} mt={2}>
      Delete
    </Button>
  </Box>
);

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ title: '', content: '' });
  const toast = useToast();

  const addNote = () => {
    if (!newNote.title || !newNote.content) {
      toast({
        title: 'Error',
        description: 'Both title and content are required to add a note.',
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setNotes([...notes, { ...newNote, id: Date.now() }]);
    setNewNote({ title: '', content: '' });
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const editNote = (id, updatedNote) => {
    setNotes(notes.map(note => note.id === id ? updatedNote : note));
  };

  return (
    <Flex direction="column" p={5}>
      <Box mb={4}>
        <Input placeholder="Title" value={newNote.title} onChange={(e) => setNewNote({ ...newNote, title: e.target.value })} />
        <Textarea placeholder="Content" value={newNote.content} onChange={(e) => setNewNote({ ...newNote, content: e.target.value })} mt={2} />
        <Button leftIcon={<FaPlus />} colorScheme="teal" onClick={addNote} mt={2}>
          Add Note
        </Button>
      </Box>
      <SimpleGrid columns={3} spacing={4}>
        {notes.map(note => (
          <Note key={note.id} note={note} onDelete={deleteNote} onEdit={editNote} />
        ))}
      </SimpleGrid>
    </Flex>
  );
};

export default Index;