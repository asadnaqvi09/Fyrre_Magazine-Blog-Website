import ApiError from "../utilis/ApiError";

export const validate = schema => async (req, res, next) => {
  try {
    const data = await schema.parseAsync({
      body: req.body,
      query: req.query,
      params: req.params
    });
    req.body = data.body ?? req.body;
    req.query = data.query ?? req.query;
    req.params = data.params ?? req.params;
    next();
  } catch (error) {
    next(
      new ApiError(
        400,
        error.errors?.map(e => e.message).join(', ') || 'Invalid request data'
      )
    );
  }
};