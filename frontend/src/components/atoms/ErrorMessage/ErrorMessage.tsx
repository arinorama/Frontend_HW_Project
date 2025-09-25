interface ErrorMessageProps {
  message?: string | null
  className?: string
  testId?: string
}

const ErrorMessage = ({ 
  message, 
  className = "text-atm-error text-sm mb-2",
  testId = "error-message"
}: ErrorMessageProps) => {
  if (!message) {
    return null
  }

  return (
    <div className={className} data-testid={testId}>
      {message}
    </div>
  )
}

export default ErrorMessage