from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status
import logging
from rest_framework.exceptions import Throttled

logger = logging.getLogger(__name__)

def custom_exception_handler(exc, context):
    """
    Custom exception handler that intercepts 500 errors
    and returns a generic error message, preventing tracebacks
    from being exposed in API responses.
    """
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    # Custom handling for rate limit (Throttled)
    if isinstance(exc, Throttled):
        return Response(
            {
                "error": "Too many requests",
                "message": "Please try again later"
            },
            status=status.HTTP_429_TOO_MANY_REQUESTS
        )

    # If the exception is handled by DRF (like ValidationError),
    # response will not be None.
    if response is not None:
        return response

    # If the response is None, it means it's an unhandled exception (like 500 Internal Server Error)
    logger.error(f"Unhandled Exception: {exc}", exc_info=True)
    
    return Response(
        {"error": "An unexpected error occurred. Please try again later."},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR
    )
