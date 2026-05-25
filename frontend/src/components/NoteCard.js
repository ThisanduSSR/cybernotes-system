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
      <Card className="h-100 glass-card">
        <Card.Body>
          <Card.Title className="text-white">{note.noteTitle}</Card.Title>
          <Card.Text className="text-muted-custom" style={{ minHeight: '80px', color: 'rgba(226, 232, 240, 0.7)' }}>
            {note.noteContent.substring(0, 100)}...
          </Card.Text>
          <small className="text-secondary" style={{ color: 'rgba(226, 232, 240, 0.5)' }}>
            {new Date(note.createdDate).toLocaleDateString()}
          </small>
        </Card.Body>
        <Card.Footer className="bg-transparent border-top" style={{ borderColor: 'rgba(255, 255, 255, 0.08)' }}>
          <Button
            variant="outline-primary"
            size="sm"
            onClick={() => setShowModal(true)}
            className="me-2"
            style={{ borderRadius: '8px' }}
          >
            Edit
          </Button>
          <Button
            variant="outline-danger"
            size="sm"
            onClick={() => onDelete(note.id)}
            style={{ borderRadius: '8px' }}
          >
            Delete
          </Button>
        </Card.Footer>
      </Card>

      <Modal show={showModal} onHide={() => setShowModal(false)} contentClassName="glass-card">
        <Modal.Header closeButton style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
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
        <Modal.Footer style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <Button variant="outline-secondary" onClick={() => setShowModal(false)} style={{ borderRadius: '8px' }}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleUpdate} style={{ borderRadius: '8px' }}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default NoteCard;
