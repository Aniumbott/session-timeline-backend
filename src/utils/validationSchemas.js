import Joi from 'joi';

// Definitions for validation schemas

export const startSessionValidationSchema = Joi.object({
  start: Joi.date().iso().required(),
});

export const addParticipantValidationSchema = Joi.object({
  participantId: Joi.string().required(),
  name: Joi.string().required(),
  events: Joi.object().optional(),
});

export const logEventValidationSchema = Joi.object({
  eventType: Joi.string()
    .valid('mic', 'webcam', 'screenShare', 'screenShareAudio', 'errors')
    .required(),
  event: Joi.object({
    start: Joi.date().iso().required(),
    end: Joi.date().iso().optional().allow(null),
    message: Joi.string().optional(),
  }).required(),
});