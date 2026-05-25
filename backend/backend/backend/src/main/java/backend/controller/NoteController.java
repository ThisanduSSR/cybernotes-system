package backend.controller;

import backend.model.Note;
import backend.model.User;
import backend.repository.NoteRepository;
import backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteRepository noteRepository;

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/create")
    public ResponseEntity<?> createNote(@RequestBody Note note, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Authenticated user not found");
        }

        note.setCreatedDate(LocalDateTime.now());
        note.setUser(user);
        Note savedNote = noteRepository.save(note);
        return ResponseEntity.ok(savedNote);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Note>> getAllNotes(Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(noteRepository.findByUser(user));
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateNote(@PathVariable Long id, @RequestBody Note noteRequest, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Authenticated user not found");
        }

        return noteRepository.findByIdAndUser(id, user)
                .map(note -> {
                    note.setNoteTitle(noteRequest.getNoteTitle());
                    note.setNoteContent(noteRequest.getNoteContent());
                    note.setCreatedDate(LocalDateTime.now());
                    return ResponseEntity.ok(noteRepository.save(note));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteNote(@PathVariable Long id, Principal principal) {
        User user = userRepository.findByEmail(principal.getName()).orElse(null);
        if (user == null) {
            return ResponseEntity.badRequest().body("Authenticated user not found");
        }

        return noteRepository.findByIdAndUser(id, user)
                .map(note -> {
                    noteRepository.delete(note);
                    return ResponseEntity.ok("Note deleted");
                })
                .orElse(ResponseEntity.notFound().build());
    }
}

// Javadoc: REST controller managing notes CRUD endpoints requiring active authentication.

// Javadoc: Endpoint to register note under active security principal ownership.
