import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  Alert,
  Spinner,
} from "react-bootstrap";
import { notesAPI } from "../api/api";
import NoteCard from "../components/NoteCard";

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [newNote, setNewNote] = useState({ noteTitle: "", noteContent: "" });

  const userName = localStorage.getItem("user")?.split("@")[0] || "Note Keeper";
  const latestNoteDate =
    notes.length > 0
      ? new Date(notes[notes.length - 1].createdDate).toLocaleDateString()
      : "N/A";

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await notesAPI.getAll();
      setNotes(response.data);
    } catch (err) {
      setError("Failed to fetch notes");
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNote = async (e) => {
    e.preventDefault();
    if (!newNote.noteTitle || !newNote.noteContent) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      const response = await notesAPI.create(newNote);
      setNotes([...notes, response.data]);
      setNewNote({ noteTitle: "", noteContent: "" });
      setSuccess("Note created successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    try {
      await notesAPI.delete(id);
      setNotes(notes.filter((note) => note.id !== id));
      setSuccess("Note deleted successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to delete note");
    }
  };

  const handleUpdateNote = async (id, updatedData) => {
    try {
      const response = await notesAPI.update(id, updatedData);
      setNotes(notes.map((note) => (note.id === id ? response.data : note)));
      setSuccess("Note updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update note");
    }
  };

  return (
    <Container className="py-5">
      <Row className="mb-4 align-items-center">
        <Col lg={8} className="mb-3 mb-lg-0">
          <Card className="glass-card welcome-card">
            <Card.Body>
              <h4 className="mb-2">Welcome back, {userName}!</h4>
              <p className="text-muted mb-0">
                Your secure notes dashboard is ready. Create a new note, refresh
                your list, or manage existing items in one place.
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Row>
            <Col xs={6} className="mb-3">
              <Card className="glass-card stat-card">
                <Card.Body>
                  <small>Total Notes</small>
                  <div className="stat-value">{notes.length}</div>
                </Card.Body>
              </Card>
            </Col>
            <Col xs={6} className="mb-3">
              <Card className="glass-card stat-card">
                <Card.Body>
                  <small>Latest</small>
                  <div className="stat-value">{latestNoteDate}</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={8}>
          <h2 className="text-white">My Notes</h2>
        </Col>
        <Col md={4} className="text-end">
          <Button variant="light" onClick={fetchNotes} disabled={loading}>
            {loading ? "Refreshing..." : "Refresh"}
          </Button>
        </Col>
      </Row>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Row className="mb-4">
        <Col md={12}>
          <Card className="glass-card">
            <Card.Body>
              <h5>Create New Note</h5>
              <Form onSubmit={handleCreateNote}>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Note title"
                    value={newNote.noteTitle}
                    onChange={(e) =>
                      setNewNote({ ...newNote, noteTitle: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Content</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Note content"
                    value={newNote.noteContent}
                    onChange={(e) =>
                      setNewNote({ ...newNote, noteContent: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Button variant="primary" type="submit" disabled={loading}>
                  {loading ? "Creating..." : "Create Note"}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {loading && notes.length === 0 ? (
        <div className="text-center text-white">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : (
        <Row>
          {notes.length === 0 ? (
            <Col md={12}>
              <Alert variant="info">
                No notes yet. Create your first note!
              </Alert>
            </Col>
          ) : (
            notes.map((note) => (
              <Col md={4} key={note.id} className="mb-4">
                <NoteCard
                  note={note}
                  onDelete={handleDeleteNote}
                  onUpdate={handleUpdateNote}
                />
              </Col>
            ))
          )}
        </Row>
      )}
    </Container>
  );
}

export default Dashboard;
