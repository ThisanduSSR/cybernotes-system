import React, { useState } from 'react';
import { Card, Button, Modal, Form } from 'react-bootstrap';

function NoteCard({ note, onDelete, onUpdate }) {
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState({
    noteTitle: note.noteTitle,
    noteContent: note.noteContent,
  });

  const handleUpdate = () => {
    onUpdate(note.id, editData);
    setShowModal(false);
  };

  return (
    <>
      <Card className="h-100 bg-light" style={{ boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <Card.Body>
          <Card.Title>{note.noteTitle}</Card.Title>
          <Card.Text className="text-muted" style={{ minHeight: '80px' }}>
            {note.noteContent.substring(0, 100)}...
          </Card.Text>
          <small className="text-secondary">
            {new Date(note.createdDate).toLocaleDateString()}
          </small>
        </Card.Body>
        <Card.Footer className="bg-transparent border-top">
          <Button
            variant="warning"
            size="sm"
            onClick={() => setShowModal(true)}
            className="me-2"
          >
            Edit
          </Button>
          <Button
            variant="danger"
            size="sm"
            onClick={() => onDelete(note.id)}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                value={editData.noteTitle}
                onChange={(e) => setEditData({ ...editData, noteTitle: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={editData.noteContent}
                onChange={(e) => setEditData({ ...editData, noteContent: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteCard;
