import {
  startSessionValidationSchema,
  addParticipantValidationSchema,
  logEventValidationSchema,
} from '../utils/validationSchemas.js';

const validateRequest = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    return res.status(400).json({
      message: 'Invalid data',
      errors: error.details.map((err) => err.message),
    });
  }
  next();
};

export const validateStartSessionData = validateRequest(
  startSessionValidationSchema
);
export const validateAddParticipantData = validateRequest(
  addParticipantValidationSchema
);
export const validateLogEventData = validateRequest(logEventValidationSchema);