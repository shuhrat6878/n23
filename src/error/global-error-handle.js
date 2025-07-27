export const globalErrorHandle = (err = {}, _req, res, _next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    console.error("Xatolik:", err); 

    return res.status(statusCode).json({
        statusCode,
        message
    });
};
