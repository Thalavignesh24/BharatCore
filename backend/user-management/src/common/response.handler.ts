

export class ResponseHandler {
    successResponse(statusCode = 201, message: string, data: {}) {
        return {
            statusCode,
            message,
            data
        }
    }

    failureResponse(statusCode = 422, message: string, data: {}) {
        return {
            statusCode,
            message,
            data
        }
    }
}