export const errorHendle = async (ctx, next) => {
    try {
        await next();
    } catch (error) {
        ctx.status = error.status;
        ctx.error = {
            error: error.message || 'internal server error'
        }
        ctx.app.emit('error', ctx, error);
    }
}