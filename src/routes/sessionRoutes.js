import express from "express";
import {
  startSession,
  addParticipant,
  logEvent,
  endSession,
  getAllSessionsWithPagination,
} from "../controllers/sessionController.js";
import {
  validateStartSessionData,
  validateAddParticipantData,
  validateLogEventData,
} from "../middleware/validationMiddleware.js";

const router = express.Router();

// Routes
// Start a new session
router.post("/sessions/start", validateStartSessionData, startSession);

// Add a participant to a session
router.post(
  "/sessions/:sessionId/participants",
  validateAddParticipantData,
  addParticipant
);

// Log an event for a participant in a session
router.post(
  "/sessions/:sessionId/participants/:participantId/events",
  validateLogEventData,
  logEvent
);

// End a session
router.post("/sessions/:sessionId/end", endSession);

// Get all sessions with pagination
router.get("/sessions", getAllSessionsWithPagination);

export default router;
