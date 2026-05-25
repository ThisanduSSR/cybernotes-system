package backend.repository;

import backend.model.Note;
import backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface NoteRepository extends JpaRepository<Note, Long> {

    List<Note> findByUser(User user);

    Optional<Note> findByIdAndUser(Long id, User user);
}

// Javadoc: Repository interface for CRUD operations on Note entities.

// Javadoc: Custom finder query to isolate notes by user ownership.
