/* eslint-disable consistent-return */
const { BAD_REQUEST } = require ('http-status');

const validateRequest = (_schema) => {
  const joiValidationOptions = {
    abortEarly: true, // abort after the last validation error
    allowUnknown: true, // allow unknown keys that will be ignored
    stripUnknown: true, // remove unknown keys from the validated data
  };

  return (req, res, next) => {
    if (_schema) {
      const validations = ['headers', 'params', 'query', 'body', 'files'].map((key) => {
        const schema = _schema[key];
        const value = req[key];

        const validate = () => (schema ? schema.validateAsync(value, joiValidationOptions) : Promise.resolve({}));
        return validate().then((result) => ({ [key]: result }));
      });

      return Promise.all(validations)
        .then((result) => {
          req.validated = Object.assign({}, ...result);
          next();
        })
        .catch((validationError) => {
          const JoiError = {
            status: 'failed',
            error: {
              original: validationError._object,

              // fetch only message and type from each error
              details: _.map(validationError.details, ({ message, type }) => ({
                message: message.replace(/['"]/g, ''),
                type,
              })),
            },
          };

          // Send back the JSON error response
          return res.status(BAD_REQUEST).json({
            success: false,
            message: JoiError.error.details[0].message,
            data: null,
          });
        });
    }
  };
};

export default validateRequest;
