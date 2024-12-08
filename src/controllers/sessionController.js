import Session from "../models/Session.js";
import logger from '../utils/logger.js';

// Start a new session
export const startSession = async (req, res, next) => {
  try {
    logger.info('Starting a new session');

    // Generate a random meetingId
    const meetingId = [...Array(3)]
      .map(() => Math.random().toString(36).substr(2, 4))
      .join('-');

    // Create a new session
    const newSession = new Session({
      meetingId,
      start: req.body.start,
      uniqueParticipantsCount: 0,
    });

    // Save the session to the database
    const savedSession = await newSession.save();
    res.status(201).json({
      message: 'Session started successfully',
      session: savedSession,
    });
  } catch (error) {
    logger.error('Error starting session', { error: error.message });
    next(error);
  }
};

export const addParticipant = async (req, res, next) => {
  try {
    // Check if the session exists
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }

    // Check if the participant is already added
    session.participants.push(req.body);
    session.uniqueParticipantsCount = session.participants.length;

    // Save the updated session
    const updatedSession = await session.save();

    res.status(200).json({
      message: 'Participant added successfully',
      session: updatedSession,
    });
  } catch (error) {
    logger.error('Error adding participant', { error: error.message });
    next(error);
  }
};

export const logEvent = async (req, res, next) => {
  try {
    // Check if the session exists
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Check if the participant exists
    const participant = session.participants.find(
      (p) => p.participantId === req.params.participantId
    );
    if (!participant) {
      return res.status(404).json({ message: 'Participant not found' });
    }
    
    // Check if the event type exists
    participant.events[req.body.eventType].push(req.body.event);

    // Save the updated session
    await session.save();
    
    res.status(200).json({
      message: 'Event logged successfully',
    });
  } catch (error) {
    logger.error('Error logging event', { error: error.message });
    next(error);
  }
};

export const endSession = async (req, res, next) => {
  try {
    // Check if the session exists
    const session = await Session.findById(req.params.sessionId);
    if (!session) {
      return res.status(404).json({ message: 'Session not found' });
    }
    
    // Check if the session has already ended
    if (session.end) {
      return res.status(400).json({ message: 'Session has already ended' });
    }

    // End the session
    session.end = new Date();
    
    // Save the updated session
    const updatedSession = await session.save();

    res.status(200).json({
      message: 'Session ended successfully',
      session: updatedSession,
    });
  } catch (error) {
    logger.error('Error ending session', { error: error.message });
    next(error);
  }
};

export const getAllSessionsWithPagination = async (req, res, next) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) > 0 ? parseInt(req.query.page) : 1;
    const limit = parseInt(req.query.limit) > 0 ? parseInt(req.query.limit) : 10;
    const skip = (page - 1) * limit;

    // Fetch sessions
    const totalSessions = await Session.countDocuments();
    const sessions = await Session.find()
      .sort({ start: -1 })
      .skip(skip)
      .limit(limit)
      .select('-participants'); // Exclude participants if not needed

    res.json({
      totalSessions,
      totalPages: Math.ceil(totalSessions / limit),
      currentPage: page,
      sessions,
    });
  } catch (error) {
    logger.error('Error fetching sessions', { error: error.message });
    next(error);
  }
};
